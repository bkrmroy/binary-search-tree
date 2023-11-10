function buildTree(sortedArr) {
	let mid = Math.round(sortedArr.length / 2) - 1;
	if (sortedArr.length === 0) {
		return null;
	}
	const node = new Node(sortedArr[mid]);
	node.left = buildTree(sortedArr.slice(0, mid));
	node.right = buildTree(sortedArr.slice(mid + 1));
	return node;
}
class Tree {
	constructor(arr) {
		this.root = buildTree(mergeSort(arr));
	}

	insert(val) {
		//iterative approach is used here,
		//this function can also change previous branches
		let currentRoot = this.root;
		while (currentRoot !== null) {
			if (val > currentRoot.data) {
				if (currentRoot.right === null) {
					currentRoot.right = new Node(val);
					return;
				}
				if (val < currentRoot.right.data) {
					let tempRoot = currentRoot.right;
					currentRoot.right = new Node(val);
					currentRoot.right.right = tempRoot;
					return;
				}
				currentRoot = currentRoot.right;
			} else if (val < currentRoot.data) {
				if (currentRoot.left === null) {
					currentRoot.left = new Node(val);
					return;
				}
				if (val > currentRoot.left.data) {
					let tempRoot = currentRoot.left;
					currentRoot.left = new Node(val);
					currentRoot.left.left = tempRoot;
					return;
				}
				currentRoot = currentRoot.left;
			} else {
				return "already in tree";
			}
		}
	}
	findMinNode(root = this.root) {
		return root.left !== null ? this.findMinNode(root.left) : root;
	}
	delete(val, root = this.root) {
		if (root === null) return root;
		if (val > root.data) {
			root.right = this.delete(val, root.right);
			return root;
		} else if (val < root.data) {
			root.left = this.delete(val, root.left);
			return root;
		} else {
			if (root.right === null && root.left === null) {
				return (root = null);
			}
			if (root.right !== null && root.left === null) {
				root = root.right;
				return root;
			}
			if (root.left !== null && root.right === null) {
				root = root.left;
				return root;
			}
			if (root.left !== null && root.right !== null) {
				const newRoot = this.findMinNode(root.right);
				root.data = newRoot.data;
				root.right = this.delete(newRoot.data, root.right);
				return root;
			}
		}
	}
	find(val, root = this.root) {
		if (root === null) {
			return "does not exist";
		}
		if (val === root.data) return root;
		else if (val > root.data) return this.find(val, root.right);
		else if (val < root.data) return this.find(val, root.left);
	}
	levelOrder(callback, root = this.root) {
		//iteration approach
		if (root === null) return;
		let queue = [];
		queue.push(root);
		while (queue.length !== 0) {
			callback(queue[0].data);
			if (queue[0].left !== null) queue.push(queue[0].left);
			if (queue[0].right !== null) queue.push(queue[0].right);
			queue.shift();
		}
	}
	inOrder(callback, root = this.root, arr = []) {
		if (root === null) return null;
		if (root.left !== null) this.inOrder(callback, root.left, arr);
		callback ? callback(root.data) : arr.push(root.data);
		if (root.right !== null) this.inOrder(callback, root.right, arr);
		if (arr.length != 0) return arr;
	}
	preOrder(callback, root = this.root, arr = []) {
		if (root === null) return null;
		callback ? callback(root.data) : arr.push(root.data);
		if (root.left !== null) this.preOrder(callback, root.left, arr);
		if (root.right !== null) this.preOrder(callback, root.right, arr);
		if (arr.length != 0) return arr;
	}
	postOrder(callback, root = this.root, arr = []) {
		if (root === null) return null;
		if (root.left !== null) this.postOrder(callback, root.left, arr);
		if (root.right !== null) this.postOrder(callback, root.right, arr);
		callback ? callback(root.data) : arr.push(root.data);
		if (arr.length != 0) return arr;
	}
	height(root = this.root) {
		if (root === null) return 0;
		let lHeight = this.height(root.left) + 1;
		let rHeight = this.height(root.right) + 1;

		if (lHeight > rHeight) {
			return lHeight;
		} else {
			return rHeight;
		}
	}
	depth(rootValue, root = this.root) {
		if (root === null) return;
		if (rootValue == root.data) return 0;
		if (rootValue > root.data) return this.depth(rootValue, root.right) + 1;
		if (rootValue < root.data) return this.depth(rootValue, root.left) + 1;
	}
}

const myTree = new Tree([1, 2]);
prettyPrint(myTree.root);
