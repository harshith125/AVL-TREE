let tree = new AVLTree();
let root = null;

function buildTree() {
  const size = parseInt(document.getElementById("sizeInput").value);
  const values = document.getElementById("valuesInput").value
    .trim().split(/\s+/).map(Number);

  if (!size || values.length !== size) {
    alert("Number of values must match size");
    return;
  }

  root = null;
  svg.innerHTML = "";

  for (let v of values) {
    root = tree.insert(root, v);
  }

  drawTree(root, 600, 50, 240);
}

function resetTree() {
  root = null;
  svg.innerHTML = "";
  document.getElementById("sizeInput").value = "";
  document.getElementById("valuesInput").value = "";
}
