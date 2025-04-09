document.querySelectorAll('.tool-button').forEach(button => {
  button.addEventListener('click', () => {
    const tool = button.dataset.tool;
    document.querySelectorAll('.tool-section').forEach(section => {
      section.classList.add('hidden');
    });
    document.getElementById(tool).classList.remove('hidden');
  });
});

document.getElementById('chat-input').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    const msg = this.value;
    const log = document.getElementById('chat-log');
    log.innerHTML += `<div><b>You:</b> ${msg}</div>`;
    this.value = '';
  }
});
