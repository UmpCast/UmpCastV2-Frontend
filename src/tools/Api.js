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

export const tokenCreateBody = (values) => {
    return {
        grant_type: "password",
        client_id: "xZevnzc91l75WMLaswLxlAl3Avg1XaKSGAAra1dk",
        client_secret: "8uIJQJFJBBymPX4t2LImIBu6xUyEE8SzOpPFDjZOtT0wD5fDu5faEE8SrGJtKGHdDyUulQkQXoO1G3FUg9WoDtZdaa1rmBBOTszGabDSduTkNbduRCSqm6ccbt2Oe2Cp",
        username: (values.username ? values.username : values.email),
        password: values.password
    }
}

export const accessCreateBody = (values) => {
    return {
        grant_type: "convert_token",
        client_id: "xZevnzc91l75WMLaswLxlAl3Avg1XaKSGAAra1dk",
        client_secret: "8uIJQJFJBBymPX4t2LImIBu6xUyEE8SzOpPFDjZOtT0wD5fDu5faEE8SrGJtKGHdDyUulQkQXoO1G3FUg9WoDtZdaa1rmBBOTszGabDSduTkNbduRCSqm6ccbt2Oe2Cp",
        backend: values.backend,
        token: values.token
    }
}

// userAPI().create({email: "joe@gmail.com"})
// .then(res => console.log(res.data))
// .catch(err => console.log(err.response.data))