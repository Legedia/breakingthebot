// graph.js

function plotGraph() {
    const canvas = document.getElementById('graphCanvas');
    const ctx = canvas.getContext('2d');
    const functionInput = document.getElementById('functionInput').value;
  
    try {
     const points = [];
     for (let x = -10; x <= 10; x += 0.1) {
      let y = eval(functionInput.replace(/x/g, x));
      if (typeof y !== 'number' || isNaN(y) || !isFinite(y)) {
       y = null; // Skip invalid y values for better fluidity
      }
      points.push({ x: x, y: y });
     }
  
     new Chart(ctx, {
      type: 'line',
      data: {
       datasets: [{
        label: functionInput || 'f(x)',
        data: points,
        borderColor: '#00ffff',
        fill: false,
        pointRadius: 0,
        tension: 0.1,
       }]
      },
      options: {
       responsive: true,
       maintainAspectRatio: false,
       scales: {
        x: {
         type: 'linear',
         position: 'bottom',
         title: {
          display: true,
          text: 'x'
         },
         grid: {
          color: '#555'
         }
        },
        y: {
         type: 'linear',
         position: 'left',
         title: {
          display: true,
          text: 'y'
         },
         grid: {
          color: '#555'
         }
        }
       },
       plugins: {
        legend: {
         labels: {
          color: '#aaffaa'
         }
        }
       }
      }
     });
    } catch (error) {
     ctx.clearRect(0, 0, canvas.width, canvas.height);
     ctx.fillStyle = '#ffaaaa';
     ctx.font = '16px sans-serif';
     ctx.textAlign = 'center';
     ctx.fillText('Invalid Function', canvas.width / 2, canvas.height / 2);
     console.error("Graphing error:", error);
    }
   }
  
   // Initial plot
   plotGraph();