const svg = document.getElementById("treeSvg");

// Theme Management
function toggleTheme() {
  const body = document.body;
  const sunIcon = document.querySelector('.sun-icon');
  const moonIcon = document.querySelector('.moon-icon');
  
  body.classList.toggle('light-mode');
  
  if (body.classList.contains('light-mode')) {
    sunIcon.classList.add('hidden');
    moonIcon.classList.remove('hidden');
    localStorage.setItem('theme', 'light');
  } else {
    sunIcon.classList.remove('hidden');
    moonIcon.classList.add('hidden');
    localStorage.setItem('theme', 'dark');
  }
  
  // Redraw tree if exists
  if (root) {
    svg.innerHTML = "";
    drawTree(root, 600, 50, 240);
  }
}

// Load saved theme on page load
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    document.querySelector('.sun-icon').classList.add('hidden');
    document.querySelector('.moon-icon').classList.remove('hidden');
  }
});

function drawTree(node, x, y, xOffset) {
  if (!node) return;

  const isLightMode = document.body.classList.contains('light-mode');

  // Draw current node
  const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  circle.setAttribute("cx", x);
  circle.setAttribute("cy", y);
  circle.setAttribute("r", 25);
  circle.setAttribute("fill", "#6366f1");
  circle.setAttribute("stroke", isLightMode ? "#4f46e5" : "#818cf8");
  circle.setAttribute("stroke-width", "2");
  svg.appendChild(circle);

  const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
  text.setAttribute("x", x);
  text.setAttribute("y", y + 5);
  text.setAttribute("text-anchor", "middle");
  text.setAttribute("fill", "white");
  text.setAttribute("font-size", "14");
  text.setAttribute("font-weight", "bold");
  text.textContent = node.val;
  svg.appendChild(text);

  // Draw left subtree
  if (node.left) {
    const leftX = x - xOffset;
    const leftY = y + 80;

    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", x);
    line.setAttribute("y1", y + 25);
    line.setAttribute("x2", leftX);
    line.setAttribute("y2", leftY - 25);
    line.setAttribute("stroke", isLightMode ? "#64748b" : "#475569");
    line.setAttribute("stroke-width", "2");
    svg.appendChild(line);

    drawTree(node.left, leftX, leftY, xOffset * 0.65);
  }

  // Draw right subtree
  if (node.right) {
    const rightX = x + xOffset;
    const rightY = y + 80;

    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", x);
    line.setAttribute("y1", y + 25);
    line.setAttribute("x2", rightX);
    line.setAttribute("y2", rightY - 25);
    line.setAttribute("stroke", isLightMode ? "#64748b" : "#475569");
    line.setAttribute("stroke-width", "2");
    svg.appendChild(line);

    drawTree(node.right, rightX, rightY, xOffset * 0.65);
  }
}
