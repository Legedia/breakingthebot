// graph.js
// Function to parse and validate user input
function parseFunctionInput(input) {
    // 1. Basic Validation (Extend as needed)
    if (!input) {
        return { error: "No function entered." };
    }
    if (input.length > 100) {
        return { error: "Function too complex." };
    }
    // 2. Simple Sanitization (More robust methods exist)
    const allowedChars = /^[a-zA-Z0-9+\-*\/().\sMath^e]+$/;
    if (!allowedChars.test(input)) {
        return { error: "Invalid characters." };
    }
    // 3. Prepare for Eval (Replace ^ with **)
    const safeInput = input.replace(/\^/g, '**');
    return { expression: safeInput };
}
// Function to generate data points
function generateDataPoints(expression, xMin, xMax, step) {
    const points = [];
    const xValues = [];
    for (let x = xMin; x <= xMax; x += step) {
        xValues.push(x);
    }
    try {
        // Isolate eval within a function scope
        const evalFunction = new Function('x', `return ${expression};`);
        const yValues = xValues.map(x => evalFunction(x));
        // Check for NaN and Infinity
        for (let i = 0; i < xValues.length; i++) {
            if (typeof yValues[i] === 'number' && isFinite(yValues[i])) {
                points.push({ x: xValues[i], y: yValues[i] });
            }
        }
        return { points };
    } catch (evalError) {
        return { error: "Invalid function syntax." };
    }
}
// Function to render the graph
function renderGraph(canvasId, data, title) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
                label: title,
                data: data,
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
                    },
                    ticks: {
                        beginAtZero: true,
                        auto: true
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
}
// Main plotGraph function (triggered by button click)
function plotGraph() {
    const functionInput = document.getElementById('functionInput').value;
    const parseResult = parseFunctionInput(functionInput);
    if (parseResult.error) {
        displayError(parseResult.error);
        return;
    }
    const dataResult = generateDataPoints(parseResult.expression, -10, 10, 0.1);
    if (dataResult.error) {
        displayError(dataResult.error);
        return;
    }
    renderGraph('graphCanvas', dataResult.points, functionInput || 'f(x)');
    function displayError(message) {
        const canvas = document.getElementById('graphCanvas');
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#ffaaaa';
        ctx.font = '16px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(message, canvas.width / 2, canvas.height / 2);
    }
}
// Initial plot (optional - could be a default function)
plotGraph();