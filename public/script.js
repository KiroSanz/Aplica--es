const socket = io();

const loginDiv = document.getElementById('login');
const usernameInput = document.getElementById('username');
const loginBtn = document.getElementById('login-btn');
const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

let username = '';

loginBtn.addEventListener('click', () => {
  username = usernameInput.value.trim();
  if (username) {
    loginDiv.style.display = 'none';
    form.style.display = 'block';
  }
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input.value) {
    socket.emit('chat message', { username, message: input.value });
    input.value = '';
  }
});

function getColorFromName(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return `hsl(${hash % 360}, 70%, 50%)`;
}

socket.on('chat message', (data) => {
  console.log('Dados recebidos:', data); // Verifique se o timestamp está chegando aqui

  const item = document.createElement('li');
  
  const avatar = document.createElement('div');
  avatar.className = 'avatar';
  avatar.textContent = data.username.charAt(0).toUpperCase();
  avatar.style.backgroundColor = getColorFromName(data.username);
  
  const messageContent = document.createElement('div');
  messageContent.className = 'message-content';
  messageContent.innerHTML = `
    <strong>${data.username}:</strong> ${data.message}
    <span class="timestamp">${data.timestamp}</span> <!-- Exibe o timestamp -->
  `;
  
  item.appendChild(avatar);
  item.appendChild(messageContent);
  
  if (data.username === username) {
    item.classList.add('my-message');
  } else {
    item.classList.add('other-message');
  }
  
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});