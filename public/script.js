const socket = io();

// Elementos da tela de login
const loginScreen = document.getElementById('login-screen');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('login-btn');

// Elementos da tela do chat
const chatScreen = document.getElementById('chat-screen');
const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

let username = '';

// Função para gerar uma cor com base no nome do usuário
function getColorFromName(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return `hsl(${hash % 360}, 70%, 50%)`;
}

// Função para entrar no chat
loginBtn.addEventListener('click', () => {
  username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  if (username && password) {
    // Simulação de validação de login
    console.log('Login realizado com sucesso:', username);

    // Oculta a tela de login e exibe a tela do chat
    loginScreen.style.display = 'none';
    chatScreen.style.display = 'block';
  } else {
    alert('Por favor, preencha o nome de usuário e a senha.');
  }
});

// Enviar mensagem
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input.value) {
    socket.emit('chat message', { username, message: input.value });
    input.value = '';
  }
});

// Receber mensagem
socket.on('chat message', (data) => {
  console.log('Dados recebidos:', data); // Verifique se o timestamp está chegando aqui

  const item = document.createElement('li');
  
  // Avatar do usuário
  const avatar = document.createElement('div');
  avatar.className = 'avatar';
  avatar.textContent = data.username.charAt(0).toUpperCase();
  avatar.style.backgroundColor = getColorFromName(data.username);
  
  // Conteúdo da mensagem
  const messageContent = document.createElement('div');
  messageContent.className = 'message-content';
  messageContent.innerHTML = `
    <div class="message-text">${data.message}</div>
    <div class="timestamp">${data.timestamp}</div>
  `;
  
  // Adiciona avatar e conteúdo da mensagem ao item
  item.appendChild(avatar);
  item.appendChild(messageContent);
  
  // Diferencia as mensagens do usuário atual
  if (data.username === username) {
    item.classList.add('my-message');
  } else {
    item.classList.add('other-message');
  }
  
  // Adiciona a mensagem à lista
  messages.appendChild(item);
  
  // Rola para a última mensagem
  window.scrollTo(0, document.body.scrollHeight);
});