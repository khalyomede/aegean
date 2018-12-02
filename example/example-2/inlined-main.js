function is_string(mixed) {
	return (
		mixed !== null && mixed !== undefined && mixed.constructor === String
	);
}


function echo(mixed) {
	if (is_string(mixed) === false) {
		throw new Error("echo expects parameter 1 to be a string");
	}

	console.log(mixed);
}


echo("hello world");
