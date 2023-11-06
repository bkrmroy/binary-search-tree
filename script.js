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

}

const myArr = new Tree([1, 2, 3, 4, 5, 6, 7]);
const banana = 3;
const a = 2343;
prettyPrint(myArr.root);
