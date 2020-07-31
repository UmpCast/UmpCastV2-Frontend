export const reduceArrays = obj => {
    const reduced = {}
    Object.keys(obj).map(key => reduced[key] = obj[key][0])

    return reduced
}

export const pickFirst = obj => {
    if (obj) {
        const err = obj[Object.keys(obj)[0]]
        return err
    }
    return null
}

export const pickProps = function (obj, props, condition = (obj, prop) => { return obj[prop] }) {

    var picked = {}

    props.forEach(prop => condition(obj, prop) && (picked[prop] = obj[prop]))

    return picked;
}

export const includeProps = function(obj, condition = (val) => val !== "") {
    var picked = {}

    Object.keys(obj).map(prop => condition(obj[prop]) && (picked[prop] = obj[prop]))

    return picked
}

export const createObj = (fields, fill = "") => {
    const filled = {}
    fields.map((field) => filled[field] = fill)

    return filled
}

export const isEmpty = (obj) => {
    return !obj || Object.keys(obj).length === 0;
}

export const intersection = (arr1, arr2) => {
    return arr1.filter(x => arr2.includes(x))
}

export const difference = (arr1, arr2) => {
    return arr1.filter(x => !arr2.includes(x))
}

