import axios from 'axios'

class API {
    constructor({ url, token = null }) {
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

    createBasicCRUDEndpoints({ name }) {
        var endpoints = {}

        const resourceURL = `${this.url}/${name}/`

        const config = this.config()

        endpoints.getAll = ({ query } = {}) => axios.get(resourceURL, { ...config, params: query })

        endpoints.getOne = ({ pk }) => axios.get(`${resourceURL}${pk}/`, config)

        endpoints.create = (toCreate) => axios.post(resourceURL, toCreate, config)

        endpoints.tweak = (toTweak) => axios.patch(`${resourceURL}${toTweak.pk}/`, toTweak, config)

        endpoints.update = (toUpdate) => axios.put(`${resourceURL}${toUpdate.pk}/`, toUpdate, config)

        endpoints.delete = ({ pk }) => axios.delete(`${resourceURL}${pk}/`, config)

        return endpoints
    }
}

const reducePromise = res => {
    return {
        status: res.status,
        statusText: res.statusText,
        data: res.data
    }
}

// const test = new API({ url: "http://127.0.0.1:3000" , token: "adminToken"})

// const userAPI = test.createBasicCRUDEndpoints({name: "api/users"})