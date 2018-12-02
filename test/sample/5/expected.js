function echo(mixed) {
    console.log(mixed);
}

function is_string(mixed) {
    return mixed !== null && mixed !== undefined && mixed.constructor === String;
}


const input = "hello world";

if(is_string(input)) {
    echo(input);
}
