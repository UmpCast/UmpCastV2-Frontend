import React from "react"
import { Redirect } from "react-router-dom"

import useUser from "common/hooks"

export default function useAuthRedirect(data, auth_start, auth_end) {
    const User = useUser()

    const auths = getAuths(data)

    let authChainIds = getAuthChainIds(auths, auth_end)
    let before_start = true

    for (const auth_id of authChainIds) {

        const { validator, fail } = auths[auth_id]

        const has_auth = validator(User, data)

        if (!has_auth)
            return before_start ? fail : null

        if (auth_id === auth_start)
            before_start = false
    }

    return auths[auth_end].success
}

const getAuthChainIds = (auths, end_id) => {

    let curr_id = end_id
    let chain = []

    do {
        chain.push(curr_id)
        curr_id = auths[curr_id].parent

    } while (curr_id !== null)

    return chain.reverse()
}

const getAuths = (data) => (
    {
        public: {
            parent: null,
            validator: authRoot
        },
        authenticated: {
            parent: "public",
            validator: isAuthenticated,
            fail: <Redirect to="/login" />,
            success: <Redirect to="/register/configure" />
        },
        configured: {
            parent: "authenticated",
            validator: isConfigured,
            fail: <Redirect to="/register/configure" />,
            success: <Redirect to="/" />
        },
        manager: {
            parent: "configured",
            validator: isManager,
            fail: <Redirect to="/" />,
            success: null
        },
        user: {
            parent: "manager",
            validator: authEndpoint
        },
        league_member: {
            parent: "configured",
            validator: isLeagueMember,
            fail: <Redirect to={`/league/${data.pk}/join`} />,
            success: <Redirect to={`/league/${data.pk}/announcements`} />
        },
        league_manager: {
            parent: "league_member",
            validator: isManager,
            fail: <Redirect to={`/league/${data.pk}/announcements`} />,
            success: <Redirect to={`/league/${data.pk}/settings`} />
        },
        league: {
            parent: "league_manager",
            validator: authEndpoint
        }
    }
)

const authRoot = () => true

const authEndpoint = () => false

const isAuthenticated = User => (
    User.isAuthenticated
)

const isConfigured = User => (
    User.isConfigured
)

const isManager = User => (
    User.user.account_type === "manager"
)

const isLeagueMember = (User, data) => {
    const { accepted_leagues } = User.user

    return accepted_leagues.some(
        ({ pk }) => pk === parseInt(data.pk)
    )
}