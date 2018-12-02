function add(left, operator, right) {
	let result = 0;

	switch (operator) {
		case "+":
			result = left + right;

			break;
	}

	return result;
}


const result = add(1, "+", 2);

console.log(result); // 3
