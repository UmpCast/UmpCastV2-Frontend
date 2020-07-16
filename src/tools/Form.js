
export const pickFields = function (obj, props, condition = (obj, prop) => { return obj[prop] }) {

    var picked = {}

    props.forEach(prop => condition(obj, prop) && (picked[prop] = obj[prop]))

    return picked;
}

export const fillFields = (fields, fill = "") => {
    const filled = {}
    fields.map((field) => filled[field] = fill)

    return filled
}

export const isEmpty = (obj) => {
    return !obj || Object.keys(obj).length === 0;
}

export const identifyRequest = (config) => {
    return { endpoint: new URL(config.url).pathname, method: config.method }
}

export const equalObj = (obj1, obj2) => {
    return JSON.stringify(obj1) === JSON.stringify(obj2)
}

export const isRequest = (err, reqArray) => {
    return equalObj(identifyRequest(err.response.config), { endpoint: reqArray[0], method: reqArray[1] })
}

// setUser({ ...User, ...userUpdate })

//             setForm({
//                 validated: true,
//                 errors: {
//                     username: "Invalid Credentials given",
//                     password: "Invalid Credentials given",
//                 }
//             })