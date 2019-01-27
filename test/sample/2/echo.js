import "./is_string";

function echo(mixed) {
	if (is_string(mixed) === false) {
		throw new Error("echo expected parameter 1 to be a string");
	}

	console.log(mixed);
}
