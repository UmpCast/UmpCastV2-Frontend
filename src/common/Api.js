const client_id = process.env.REACT_APP_CLIENT_ID
const client_secret = process.env.REACT_APP_CLIENT_SECRET

export const myUrl = (endpoint) => {
    return "https://127.0.0.1:3000/" + endpoint
}

export const config = (token = null, params = null, content_type = null) => {
    return {
        headers: {
            "Content-Type": content_type ? content_type : "application/json",
            ...(token && { "Authorization": `Bearer ${token}` })
        },
        ...(params && { "params": params })
    }
}

export const OauthConvertToken = (backend, token) => {
    return {
        grant_type: "convert_token",
        client_id,
        client_secret,
        backend,
        token
    }
}

export const OauthUserValidate = (username, password) => {
    return {
        grant_type: "password",
        client_id,
        client_secret,
        username,
        password
    }
}