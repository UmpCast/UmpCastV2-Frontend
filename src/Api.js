export const myUrl = (endpoint) => {
    return "http://127.0.0.1:3000/" + endpoint
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

// userAPI().create({email: "joe@gmail.com"})
// .then(res => console.log(res.data))
// .catch(err => console.log(err.response.data))