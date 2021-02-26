export class Name {
    constructor(first_name = "", last_name = "") {
        this.first_name = this.capitalize(first_name)
        this.last_name = this.capitalize(last_name)
    }

    get fullName() {
        return `${this.first_name} ${this.last_name}`
    }

    get fullFirst() {
        return `${this.first_name} ${this.last_name.charAt(0)}.`
    }

    get initials() {
        return `${this.first_name.charAt(0)}${this.last_name.charAt(0)}`
    }

    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}

export const expandGames = (games, divisions) => {
    const divs = divsByPk(divisions)
    
    return (
        games.map(game => {
            const div = divs[game.division]

            const new_posts = game.posts.map(post => ({
                ...post,
                role: div.roles[post.role]
            }))

            return {
                ...game,
                division: div,
                posts: new_posts
            }
        })
    )
}

export const divsByPk = (divisions) => {
    const ret = byPk(divisions)

    for (const pk of Object.keys(ret)) {
        const { roles } = ret[pk]
        ret[pk].roles = byPk(roles)
    }

    return ret
}

export const byPk = (arr) => {
    const ret = {}

    for (const item of arr) {
        ret[item.pk] = Object.assign({}, item)
    }

    return ret
}

export const searchPks = (arr, pks) => {
    let sub_arr = undefined

    if(!Array.isArray(pks))
        pks = [pks]

    for (const _pk of pks){
        sub_arr = arr.find(({pk}) => pk === _pk )

        if(sub_arr === undefined)
            return undefined
    }

    return sub_arr
}