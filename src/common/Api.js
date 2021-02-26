const FRONTEND_URL = process.env.REACT_APP_FRONTEND_URL
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

const DB_CLIENT_ID = process.env.REACT_APP_DB_CLIENT_ID 
const DB_CLIENT_SECRET = process.env.REACT_APP_DB_CLIENT_SECRET
const TS_CLIENT_ID = process.env.REACT_APP_TS_CLIENT_ID
const TS_CLIENT_SECRET = process.env.REACT_APP_TS_CLIENT_SECRET

export const myUrl = (endpoint) => {
    return `${BACKEND_URL}/${endpoint}`
}

export const config = (token = null, params = null, content_type = null) => {
    return {
        headers: {
            "Content-Type": content_type ? content_type : "application/json",
            ...(token && { "Authorization": `Bearer ${token}` })
        },
        ...(params && { params: params })
    }
}

export const OauthConvertToken = (backend, token) => {
    return {
        grant_type: "convert_token",
        client_id: DB_CLIENT_ID,
        client_secret: DB_CLIENT_SECRET,
        backend,
        token
    }
}

export const OauthUserValidate = (username, password) => {
    return {
        grant_type: "password",
        client_id: DB_CLIENT_ID,
        client_secret: DB_CLIENT_SECRET,
        username,
        password
    }
}

export const TsRedirect = (pk) => {
    const base = new URL("https://auth.teamsnap.com/oauth/authorize")

    base.searchParams.append("client_id", TS_CLIENT_ID)
    base.searchParams.append("redirect_uri", TsCallbackUri(pk))
    base.searchParams.append("response_type", "code")

    return base.toString()
}

export const TsCallbackUri = (pk) => (
    `${FRONTEND_URL}/callback/teamsnap/?pk=${pk}`
)

export const OauthTsToken = (code, redirect_uri) => {
    return {
        client_id: TS_CLIENT_ID,
        client_secret: TS_CLIENT_SECRET,
        grant_type: "authorization_code",
        redirect_uri,
        code
    }
}
