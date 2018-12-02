import "is_string";

function echo(mixed) {
	if (is_string(mixed) === false) {
		throw new Error("echo expects parameter 1 to be a string");
	}

	console.log(mixed);
}
