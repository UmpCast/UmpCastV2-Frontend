import { useApi } from "hooks"

import basicApi from "promises"

export const useLeague = (pk, token) => {
    const myLeague = useApi(() => basicApi("api/leagues/", {pk: pk, token: token}))
    return myLeague
}