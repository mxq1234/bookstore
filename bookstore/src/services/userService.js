import { doGet, doPost } from "../utils/ajax";

export async function userLogin (data, navigate) {
    console.log(data);
    const url = "/login";
    let result = await doPost(url, data);
    if(result.status > 0) {
        if(result.data.userType >= 0) {
            localStorage.setItem('user', JSON.stringify(result.data));
            navigate("/", {});
            alert(result.message);
        } else {
            alert("您的账号已经被禁用");
        }
    }
    else{
        alert(result.message);
    }
};

export async function userLogOut (data, navigate) {
    console.log(data);
    const url = "/logout";
    let response = await doPost(url, data);
    if(response.status > 0) {
        localStorage.removeItem('user');
        alert(response.message);
        navigate("/login", {})
    }
    else{
        alert(response.message);
    }
};

export async function userBan(userID) {
    const url = "/ban?userID=" + userID.toString();
    console.log(url);
    let data = await doGet(url);
    return data;
}

export async function userUnban(userID) {
    const url = "/unban?userID=" + userID.toString();
    let data = await doGet(url);
    return data;
}

export async function validateUserName(userName) {
    let result = await doGet("/validateUserName?userName=" + userName);
    if(result === {}) {
        alert("出错了");
        return null;
    }
    return result.status;
}

export async function register(info) {
    let result = await doPost("/register", info);
    if(result === {}) {
        alert("出错了");
        return null;
    }
    return result;
}

export async function checkAuthed() {
    const url = "/checkAuthed";
    let result = await doGet(url);
    return result;
}
