const file_get_contents = async function(url) {
    let response = null;
    
    try {
        response = await fetch(url);
    } catch(exception) {
        console.warning(exception);
    }

    return response;
}
