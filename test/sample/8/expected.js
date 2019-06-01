const echo = function(data) {
    console.log(data);
}

const is_array = function(element) {
    return element !== null && element !== undefined && element.constructor === Array;
}

const file_get_contents = async function(url) {
    let response = null;
    
    try {
        response = await fetch(url);
    } catch(exception) {
        console.warning(exception);
    }

    return response;
}

