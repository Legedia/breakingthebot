document.addEventListener('DOMContentLoaded', () => {
  const toolButtons = document.querySelectorAll('.tool-button');
  const toolSections = document.querySelectorAll('.tool-section');

  // Initially show the first tool section
  if (toolSections.length > 0) {
      toolSections[0].classList.add('active');
  }

  toolButtons.forEach(button => {
      button.addEventListener('click', () => {
          const tool = button.dataset.tool;

          toolSections.forEach(section => {
              section.classList.remove('active');
          });

          const selectedSection = document.getElementById(tool);
          if (selectedSection) {
              selectedSection.classList.add('active');
          }
      });
  });

  // Basic example for the prompt tool (you'll need to add actual functionality)
  const promptButton = document.querySelector('#prompt button');
  if (promptButton) {
      promptButton.addEventListener('click', () => {
          const promptTextarea = document.querySelector('#prompt textarea');
          const outputDiv = document.querySelector('#prompt .output');
          if (promptTextarea && outputDiv) {
              outputDiv.textContent = `You entered: ${promptTextarea.value}`;
              // Here you would add the logic to process the prompt
          }
      });
  }

  // Add similar functionality for other tools as needed
});