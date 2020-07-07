import { basicAPI } from '../../Api.js'

export const tokenCreate = (values) => {
    const guestAPI = basicAPI()
    const tokenAPI = guestAPI.createEndpoints('auth/token/')

    const body = {
        grant_type: "password",
        client_id: "xZevnzc91l75WMLaswLxlAl3Avg1XaKSGAAra1dk",
        client_secret: "8uIJQJFJBBymPX4t2LImIBu6xUyEE8SzOpPFDjZOtT0wD5fDu5faEE8SrGJtKGHdDyUulQkQXoO1G3FUg9WoDtZdaa1rmBBOTszGabDSduTkNbduRCSqm6ccbt2Oe2Cp",
        ...values
    }

    // const interpreter = {
    //     "error": {
    //         "invalid_grant": {},
    //         "invalid_request": {}
    //     },
    //     "error_description": {
    //         "Invalid credentials given.": {
    //             username: "Invalid credentials given.",
    //             password: "Invalid credentials given."
    //         }
    //     }
    // }

    return [tokenAPI, body]
}
// export const interpretErrors = (errors, interpreter) => {
//     const interpretations = Object.entries(errors).map(
//         error => {
//             const [element, detail] = error
//             return interpreter[element][detail]
//         }
//     )
//     return Object.assign(...interpretations)
// }

// const [tokenAPI, body, interpreter]  = tokenCreate({username: "victor@gmail.com", password: "Qw3rty11"})

// tokenAPI.create(body)
// .then( res => console.log(res))
// .catch( err => console.log(err))