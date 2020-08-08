import { useFetch } from "hooks"

import basicApi from "promises"

export const useLeague = (pk, token) => {
    const myLeague = useFetch(() => basicApi("api/leagues/", {pk: pk, token: token}))
    return myLeague
}