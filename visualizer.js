const svg = document.getElementById("treeSvg");

// Get responsive dimensions
function getResponsiveDimensions() {
  const width = window.innerWidth;
  let svgWidth, svgHeight, startX, startY, initialOffset, nodeRadius, fontSize;
  
  if (width < 640) { // Mobile
    svgWidth = Math.max(400, width - 40);
    svgHeight = 700;
    startX = svgWidth / 2;
    startY = 30;
    initialOffset = Math.min(70, (svgWidth - 100) / 6);
    nodeRadius = 18;
    fontSize = 12;
  } else if (width < 1024) { // Tablet
    svgWidth = 700;
    svgHeight = 700;
    startX = svgWidth / 2;
    startY = 40;
    initialOffset = 140;
    nodeRadius = 22;
    fontSize = 13;
  } else { // Desktop
    svgWidth = 1000;
    svgHeight = 700;
    startX = svgWidth / 2;
    startY = 50;
    initialOffset = 180;
    nodeRadius = 25;
    fontSize = 14;
  }
  
  return { svgWidth, svgHeight, startX, startY, initialOffset, nodeRadius, fontSize };
}

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
    const dims = getResponsiveDimensions();
    drawTree(root, dims.startX, dims.startY, dims.initialOffset, dims);
  }
}

// Load saved theme on page load and setup responsive behavior
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    document.querySelector('.sun-icon').classList.add('hidden');
    document.querySelector('.moon-icon').classList.remove('hidden');
  }
  
  // Set initial SVG dimensions
  updateSvgDimensions();
});

// Handle window resize
window.addEventListener('resize', () => {
  if (root) {
    svg.innerHTML = "";
    const dims = getResponsiveDimensions();
    drawTree(root, dims.startX, dims.startY, dims.initialOffset, dims);
  }
});

// Update SVG dimensions
function updateSvgDimensions() {
  const dims = getResponsiveDimensions();
  svg.setAttribute('viewBox', `0 0 ${dims.svgWidth} ${dims.svgHeight}`);
  svg.setAttribute('width', dims.svgWidth);
  svg.setAttribute('height', dims.svgHeight);
}

function drawTree(node, x, y, xOffset, dims = null) {
  if (!node) return;

  if (!dims) {
    dims = getResponsiveDimensions();
  }

  const isLightMode = document.body.classList.contains('light-mode');

  // Draw current node
  const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  circle.setAttribute("cx", x);
  circle.setAttribute("cy", y);
  circle.setAttribute("r", dims.nodeRadius);
  circle.setAttribute("fill", "#6366f1");
  circle.setAttribute("stroke", isLightMode ? "#4f46e5" : "#818cf8");
  circle.setAttribute("stroke-width", dims.nodeRadius > 20 ? "2" : "1.5");
  svg.appendChild(circle);

  const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
  text.setAttribute("x", x);
  text.setAttribute("y", y + 4);
  text.setAttribute("text-anchor", "middle");
  text.setAttribute("dominant-baseline", "middle");
  text.setAttribute("fill", "white");
  text.setAttribute("font-size", dims.fontSize);
  text.setAttribute("font-weight", "bold");
  text.textContent = node.val;
  svg.appendChild(text);

  const verticalGap = dims.nodeRadius < 20 ? 60 : 80;
  const offsetFactor = dims.nodeRadius < 20 ? 0.6 : 0.65;

  // Draw left subtree
  if (node.left) {
    const leftX = x - xOffset;
    const leftY = y + verticalGap;

    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", x);
    line.setAttribute("y1", y + dims.nodeRadius);
    line.setAttribute("x2", leftX);
    line.setAttribute("y2", leftY - dims.nodeRadius);
    line.setAttribute("stroke", isLightMode ? "#64748b" : "#475569");
    line.setAttribute("stroke-width", dims.nodeRadius > 20 ? "2" : "1.5");
    svg.appendChild(line);

    drawTree(node.left, leftX, leftY, xOffset * offsetFactor, dims);
  }

  // Draw right subtree
  if (node.right) {
    const rightX = x + xOffset;
    const rightY = y + verticalGap;

    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", x);
    line.setAttribute("y1", y + dims.nodeRadius);
    line.setAttribute("x2", rightX);
    line.setAttribute("y2", rightY - dims.nodeRadius);
    line.setAttribute("stroke", isLightMode ? "#64748b" : "#475569");
    line.setAttribute("stroke-width", dims.nodeRadius > 20 ? "2" : "1.5");
    svg.appendChild(line);

    drawTree(node.right, rightX, rightY, xOffset * offsetFactor, dims);
  }
}
