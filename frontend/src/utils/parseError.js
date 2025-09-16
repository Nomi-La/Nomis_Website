function parseError(error) {
    let message = "";

    if (error.response) {
        const data = error.response.data;

        if (typeof data === "string") {
            message = data;
        } else if (data.detail) {
            message = data.detail;
        } else if (typeof data === "object") {
            message = Object.values(data).flat().join(" ");
        } else {
            message = "An error occurred.";
        }
    } else {
        message = 'Network error, please try again.'
    }
    return message
}

export default parseError

