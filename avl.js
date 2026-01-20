class Node {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
    this.height = 1;
  }
}

class AVLTree {
  height(n) { return n ? n.height : 0; }

  balance(n) {
    return n ? this.height(n.left) - this.height(n.right) : 0;
  }

  rightRotate(y) {
    const x = y.left;
    const t2 = x.right;

    x.right = y;
    y.left = t2;

    y.height = 1 + Math.max(this.height(y.left), this.height(y.right));
    x.height = 1 + Math.max(this.height(x.left), this.height(x.right));

    return x;
  }

  leftRotate(x) {
    const y = x.right;
    const t2 = y.left;

    y.left = x;
    x.right = t2;

    x.height = 1 + Math.max(this.height(x.left), this.height(x.right));
    y.height = 1 + Math.max(this.height(y.left), this.height(y.right));

    return y;
  }

  insert(node, val) {
    if (!node) return new Node(val);

    if (val < node.val)
      node.left = this.insert(node.left, val);
    else if (val > node.val)
      node.right = this.insert(node.right, val);
    else
      return node;

    node.height = 1 + Math.max(this.height(node.left), this.height(node.right));
    const b = this.balance(node);

    if (b > 1 && val < node.left.val)
      return this.rightRotate(node);

    if (b < -1 && val > node.right.val)
      return this.leftRotate(node);

    if (b > 1 && val > node.left.val) {
      node.left = this.leftRotate(node.left);
      return this.rightRotate(node);
    }

    if (b < -1 && val < node.right.val) {
      node.right = this.rightRotate(node.right);
      return this.leftRotate(node);
    }

    return node;
  }
}
