
export const getMissing = values => {
    return Object.assign(
        ...Object.entries(values).map(
            pair => pair[1] === ""
            ? { [pair[0]]: pair[0] + " is missing" } 
            : {}
        ))
}