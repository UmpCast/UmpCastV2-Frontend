
export const getMissing = values => {
    return Object.assign(
        ...Object.entries(values).map(
            pair => pair[1] === ""
                ? { [pair[0]]: pair[0] + " is missing" }
                : {}
        ))
}

export const pick = function (obj, props) {

    if (!obj || !props) return;

    var picked = {};

    props.forEach(function (prop) {
        obj[prop] && (picked[prop] = obj[prop])
    });

    return picked;
}

export const fill = (fields) => {
    const filled = {}
    fields.map((field) => filled[field] = "")

    return filled
}

// setUser({ ...User, ...userUpdate })

//             setForm({
//                 validated: true,
//                 errors: {
//                     username: "Invalid Credentials given",
//                     password: "Invalid Credentials given",
//                 }
//             })