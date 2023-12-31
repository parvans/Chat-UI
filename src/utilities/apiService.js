//  ******************** Base URL ***********************
let baseUrl = "http://localhost:6060/api/";
//  ******************** Token ***********************
var token = localStorage.getItem('auth-token')
//  ******************** User API ***********************
export const userLogin = async (email, password) => {
    const requestOptions = {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    }
    const response = await fetch(baseUrl + "user/login", requestOptions)
    if (!response.ok) {
        let data = await response.json();
        return { data: data, ok: false }
    }
    let data = await response?.json();
    return { data: data, ok: true }
}

export const userRegister = async (body) => {
    const requestOptions = {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    }
    const response = await fetch(baseUrl + "user/register", requestOptions)
    if (!response.ok) {
        let data = await response.json();
        return { data: data, ok: false }
    }
    let data = await response?.json();
    return { data: data, ok: true }
}
export const verifyUserEmail = async (body) => {
    const requestOptions = {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    }
    const response = await fetch(baseUrl + "user/verifyemail", requestOptions)
    if (!response.ok) {
        let data = await response.json();
        return { data: data, ok: false }
    }
    let data = await response?.json();
    return { data: data, ok: true }
}
export const verifyUserOtp = async (body) => {
    const requestOptions = {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    }
    const response = await fetch(baseUrl + "user/verifyotp", requestOptions)
    if (!response.ok) {
        let data = await response.json();
        return { data: data, ok: false }
    }
    let data = await response?.json();
    return { data: data, ok: true }
}
export const userResetPassword = async (body) => {
    const requestOptions = {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    }
    const response = await fetch(baseUrl + "user/resetpassword", requestOptions)
    if (!response.ok) {
        let data = await response.json();
        return { data: data, ok: false }
    }
    let data = await response?.json();
    return { data: data, ok: true }
}

export const getUsers = async (keword) => {
    const requestOptions = {
        method: "GET",
        mode: "cors",
        headers: { "Content-Type": "application/json", "auth-token": token },
    }
    const response = await fetch(baseUrl + `user/users?search=${keword}`, requestOptions)
    if (!response.ok) {
        let data = await response.json();
        return { data: data, ok: false }
    }
    let data = await response?.json();
    return { data: data, ok: true }
}

export const accessChat = async (userId) => {
    const requestOptions = {
        method: "POST",
        mode: "cors",
        headers: { 
            "Content-Type": "application/json", 
            "auth-token": token 
        },
        body: JSON.stringify({userId})
    }
    const response = await fetch(baseUrl + "chat/accesschat", requestOptions)
    if (!response.ok) {
        let data = await response.json();
        return { data: data, ok: false }
    }
    let data = await response?.json();
    return { data: data, ok: true }
}

export const getChats = async () => {
    const requestOptions = {
        method: "GET",
        mode: "cors",
        headers: { 
            "Content-Type": "application/json", 
            "auth-token": token 
        },
    }
    const response = await fetch(baseUrl + "chat/fetchchat", requestOptions)
    if (!response.ok) {
        let data = await response.json();
        return { data: data, ok: false }
    }
    let data = await response?.json();
    return { data: data, ok: true }
}



