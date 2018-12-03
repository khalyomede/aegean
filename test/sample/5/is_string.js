const is_string = function(mixed) {
    return mixed !== null && mixed !== undefined && mixed.constructor === String;
}

export default is_string;
