const chatBody = document.getElementById('chat-body');
const chatInput = document.getElementById('chat-input');

chatInput.addEventListener('keypress', async function (e) {
  if (e.key === 'Enter') {
    const userMsg = chatInput.value;
    appendMessage('Tú', userMsg);
    chatInput.value = '';

    try {
      const res = await fetch('/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg }),
      });

      const data = await res.json();
      appendMessage('Asistente', data.reply);
    } catch (error) {
      appendMessage('Asistente', 'Hubo un problema al conectarse con el servidor.');
    }
  }
});

function appendMessage(sender, text) {
  const msg = document.createElement('div');
  msg.innerHTML = `<strong>${sender}:</strong> ${text}`;
  chatBody.appendChild(msg);
  chatBody.scrollTop = chatBody.scrollHeight;
}