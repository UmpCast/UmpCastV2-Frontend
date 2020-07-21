const client_id = process.env.REACT_APP_CLIENT_ID
const client_secret = process.env.REACT_APP_CLIENT_SECRET

export const myUrl = (endpoint) => {
    return "https://127.0.0.1:3000/" + endpoint
}

export const config = (token = null, params = null) => {
    return {
        headers: {
            "Content-Type": "application/json",
            ...(token && { "Authorization": `Bearer ${token}` })
        },
        ...(params && { "params": params })
    }
}

export const tokenCreateBody = (values) => {
    return {
        grant_type: "password",
        client_id: client_id,
        client_secret: client_secret,
        username: (values.username ? values.username : values.email),
        password: values.password
    }
}

export const accessCreateBody = (values) => {
    return {
        grant_type: "convert_token",
        client_id: client_id,
        client_secret: client_secret,
        backend: values.backend,
        token: values.token
    }
}