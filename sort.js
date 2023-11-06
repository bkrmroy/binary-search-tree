function mergeSort(arr) {
	if (arr.length < 2) {
		return arr;
	} else {
		const leftArr = arr.slice(0, Math.floor(arr.length / 2));
		const rightArr = arr.slice(Math.floor(arr.length / 2));
		return merge(mergeSort(leftArr), mergeSort(rightArr));
	}
}
function merge(arr1, arr2) {
	const finArr = [];
	let i = 0;
	let j = 0;
	while (i < arr1.length || j < arr2.length) {
		if (arr1[i] === arr2[j]) {
			finArr.push(arr1[i]);
			i++;
			j++;
		}
		if (arr1[i] < arr2[j]) {
			finArr.push(arr1[i]);
			i++;
		}
		if (arr1[i] > arr2[j]) {
			finArr.push(arr2[j]);
			j++;
		}

		if (i >= arr1.length && j < arr2.length) {
			finArr.push(arr2[j]);
			j++;
		}
		if (i < arr1.length && j >= arr2.length) {
			finArr.push(arr1[i]);
			i++;
		}
	}
	return finArr;
}

