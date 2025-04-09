// breakingthebot-web/main.js
document.querySelectorAll('.tool-button').forEach(button => {
  // Add an event listener to each button with the class 'tool-button'.
  button.addEventListener('click', () => {
      // When a button is clicked, this arrow function executes.
      const tool = button.dataset.tool;
      // Get the value of the 'data-tool' attribute of the clicked button.
      // This value corresponds to the ID of the tool section to show.
      document.querySelectorAll('.tool-section').forEach(section => {
          // Select all elements with the class 'tool-section'.
          section.classList.add('hidden');
          // For each tool section, add the 'hidden' class to hide it.
      });
      document.getElementById(tool).classList.remove('hidden');
      // Remove the 'hidden' class from the tool section whose ID matches
      // the 'data-tool' value of the clicked button, making it visible.
  });
});

document.getElementById('chat-input').addEventListener('keypress', function (e) {
  // Add an event listener to the input field with the ID 'chat-input'.
  // This listener triggers when a key is pressed while the input is focused.
  if (e.key === 'Enter') {
      // Check if the pressed key is the 'Enter' key.
      const msg = this.value;
      // Get the current value (text) from the input field.
      const log = document.getElementById('chat-log');
      // Get the element with the ID 'chat-log', which is the chat display area.
      log.innerHTML += `<div><b>You:</b> ${msg}</div>`;
      // Append a new div to the chat log containing the user's message,
      // formatted with bold 'You:'.
      this.value = '';
      // Clear the input field after the message is added to the log.
  }
});