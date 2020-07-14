import { useState, useContext } from "react"
import axios from "axios"

import UserContext from "../../UserContext"
import { myUrl, config, tokenCreateBody } from "../../Api"

export default function useLogin(onCatch) {

    const [User, setUser] = useContext(UserContext)

    const [values, setValue] = useState({
        username: "",
        password: "",
        token: ""
    })

    let userUpdate = {}

    new Promise(resolve => resolve({ success: true }))
        .then(() => {
            if (values.token) {
                userUpdate = { token: values.token}
                return axios.get(myUrl("api/users/36/"), config(values.token))

            } else if (values.username && values.password) {

                axios.post(myUrl("auth/token/"), tokenCreateBody(values), config())
                    .then(res => {
                        let token = res.data.access_token

                        userUpdate = { token: token }
                        localStorage.setItem("token", token)
                        return axios.get(myUrl("api/users/36/"), config(token))
                    })

            }
            return Promise.reject({response: {data: "Not enough inputs"}})
        })
        .then(res => {

            userUpdate = {
                ...userUpdate,
                isAuthenticated: true,
                isConfigured: res.data.account_type !== "inactive",
                user: res.data
            }
            console.log(userUpdate)

            setUser({ ...User, ...userUpdate })

        })
        .catch(err => {
            onCatch(err)
        })
    
    return [[values, setValue], [User, setUser]]
}