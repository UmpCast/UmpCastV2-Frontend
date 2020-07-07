
export const tokenCreateBody = (values) => {
    return {
        grant_type: "password",
        client_id: "xZevnzc91l75WMLaswLxlAl3Avg1XaKSGAAra1dk",
        client_secret: "8uIJQJFJBBymPX4t2LImIBu6xUyEE8SzOpPFDjZOtT0wD5fDu5faEE8SrGJtKGHdDyUulQkQXoO1G3FUg9WoDtZdaa1rmBBOTszGabDSduTkNbduRCSqm6ccbt2Oe2Cp",
        username: (values.username ? values.username : values.email),
        password: values.password
    }
}