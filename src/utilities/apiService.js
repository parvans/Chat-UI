//  ******************** Base URL ***********************
// let baseUrl = "http://localhost:9000/api/";
let baseUrl = "http://localhost:9000/api/";
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
        headers: { 
            "Content-Type": "application/json" 
        },
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

export const userProfile = async () => {
    const requestOptions = {
        method: "GET",
        mode: "cors",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": token 
        },
    }
    const response = await fetch(baseUrl + "user/userprofile", requestOptions)
    if (!response.ok) {
        let data = await response.json();
        return { data: data, ok: false }
    }
    let data = await response?.json();
    return { data: data, ok: true }
}

export const userEdit=async(body)=>{
    const requestOptions = {
        method: "PUT",
        mode: "cors",
        headers: { 
            "Content-Type": "application/json",
            "Authorization":token 
        },
        body: JSON.stringify(body)
    }
    const response = await fetch(baseUrl + "user/useredit", requestOptions)
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
        headers: { 
            "Content-Type": "application/json" 
        },
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
        headers: { 
            "Content-Type": "application/json" 
        },
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
        headers: { 
            "Content-Type": "application/json" 
        },
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
        headers: { 
            "Content-Type": "application/json", 
            "Authorization": token 
        },
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
            "Authorization": token 
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
            "Authorization": token 
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

export const createGroup = async (body) => {
    const requestOptions = {
        method: "POST",
        mode: "cors",
        headers: { 
            "Content-Type": "application/json", 
            "Authorization": token 
        },
        body: JSON.stringify(body)
    }
    const response = await fetch(baseUrl + "chat/creategroupchat", requestOptions)
    if (!response.ok) {
        let data = await response.json();
        return { data: data, ok: false }
    }
    let data = await response?.json();
    return { data: data, ok: true }
}
//----
export const renameGroup = async (body) => {
    const requestOptions = {
        method: "PUT",
        mode: "cors",
        headers: { 
            "Content-Type": "application/json", 
            "Authorization": token 
        },
        body: JSON.stringify(body)
    }
    const response = await fetch(baseUrl + "chat/renamegroup", requestOptions)
    if (!response.ok) {
        let data = await response.json();
        return { data: data, ok: false }
    }
    let data = await response?.json();
    return { data: data, ok: true }
}


export const groupAddMember = async (body) => {
    const requestOptions = {
        method: "PUT",
        mode: "cors",
        headers: { 
            "Content-Type": "application/json", 
            "Authorization": token 
        },
        body: JSON.stringify(body)
    }
    const response = await fetch(baseUrl + "chat/groupadd", requestOptions)
    if (!response.ok) {
        let data = await response.json();
        return { data: data, ok: false }
    }
    let data = await response?.json();
    return { data: data, ok: true }
}

export const groupRemoveMember = async (body) => {
    const requestOptions = {
        method: "PUT",
        mode: "cors",
        headers: { 
            "Content-Type": "application/json", 
            "Authorization": token 
        },
        body: JSON.stringify(body)
    }
    const response = await fetch(baseUrl + "chat/groupremove", requestOptions)
    if (!response.ok) {
        let data = await response.json();
        return { data: data, ok: false }
    }
    let data = await response?.json();
    return { data: data, ok: true }
}

export const sendUserMessage = async (body) => {
    const requestOptions = {
        method: "POST",
        mode: "cors",
        headers: { 
            "Content-Type": "application/json", 
            "Authorization": token 
        },
        body: JSON.stringify(body)
    }
    const response = await fetch(baseUrl + "message/sendmessage", requestOptions)
    if (!response.ok) {
        let data = await response.json();
        return { data: data, ok: false }
    }
    let data = await response?.json();
    return { data: data, ok: true }
}

export const fetcheMessages = async (chatId) => {
    const requestOptions = {
        method: "GET",
        mode: "cors",
        headers: { 
            "Content-Type": "application/json", 
            "Authorization": token 
        },
    }
    const response = await fetch(baseUrl + `message/${chatId}`, requestOptions)
    if (!response.ok) {
        let data = await response.json();
        return { data: data, ok: false }
    }
    // console.log(response)
    let data = await response?.json();
    return { data: data, ok: true }
}

export const readMessage = async (body) => {
    const requestOptions = {
        method: "PUT",
        mode: "cors",
        headers: { 
            "Content-Type": "application/json", 
            "Authorization": token 
        },
        body: JSON.stringify(body)
    }
    const response = await fetch(baseUrl + `message/readmessage`, requestOptions)
    if (!response.ok) {
        let data = await response.json();
        return { data: data, ok: false }
    }
    // console.log(response)
    let data = await response?.json();
    return { data: data, ok: true }
}

export const editMessage = async (body,id) => {
    const requestOptions = {
        method: "PUT",
        mode: "cors",
        headers: { 
            "Content-Type": "application/json", 
            "Authorization": token 
        },
        body: JSON.stringify(body)
    }
    const response = await fetch(baseUrl + `message/editmessage/${id}`, requestOptions)
    if (!response.ok) {
        let data = await response.json();
        return { data: data, ok: false }
    }
    // console.log(response)
    let data = await response?.json();
    return { data: data, ok: true }
}





