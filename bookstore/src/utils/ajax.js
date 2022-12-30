const ip = "http://localhost:8080";

const doPost = async (url, json) => {

    let opts = {
        method: "POST",
        body: JSON.stringify(json),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include"
    };

    url = ip + url;

    let response = null, responseJSON = {};
    try {
        response = await fetch(url,opts);
        responseJSON = await response.json();
        return responseJSON;
    } catch(error) {
        console.log(error);
    }
    return {};
};

const doGet = async (url) => {

    let opts = {
        method: "GET",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: "include"
    };

    url = ip + url;

    let response = null, responseJSON = {};
    try {
        response = await fetch(url,opts);
        responseJSON = await response.json();
        return responseJSON;
    } catch(error) {
        console.log(error);
    }
    return {};
};

export { doGet, doPost }
