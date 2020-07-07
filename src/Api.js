import axios from 'axios'

export class API {
    constructor( url, token = null )  {
        this.url = url
        this.token = token
        this.endpoints = {}
    }

    createEntity(entity) {
        this.endpoints[entity.name] = this.createBasicCRUDEndpoints(entity)
    }

    createEntitites(arrayOfEntity) {
        arrayOfEntity.forEach(this.createEntity.bind(this))
    }

    config() {
        return {
            headers: {
                'Content-Type': 'application/json',
                ...(this.token && { 'Authorization': `Bearer ${this.token}` })
            }
        }
    }

    createEndpoints( name ) {
        var endpoints = {}

        const resourceURL = `${this.url}${name}`

        const config = this.config()

        endpoints.getAll = (query = {}) => axios.get(resourceURL, { ...config, params: query })

        endpoints.getOne = (pk) => axios.get(`${resourceURL}${pk}/`, config)

        endpoints.create = (toCreate) => axios.post(resourceURL, toCreate, config)

        endpoints.tweak = (pk, toTweak) => axios.patch(`${resourceURL}${pk}/`, toTweak, config)

        endpoints.update = (pk, toUpdate) => axios.put(`${resourceURL}${pk}/`, toUpdate, config)

        endpoints.delete = (pk) => axios.delete(`${resourceURL}${pk}/`, config)

        return endpoints
    }
}

export const reducePromise = res => (
    {
        status: res.status,
        statusText: res.statusText,
        data: res.data
    }
)

export const basicAPI = (token = null) => {
    return new API("http://127.0.0.1:3000/", token)
}

export const userAPI = (token = null) => {
    const authAPI = basicAPI(token)
    return authAPI.createEndpoints('api/users/')
}