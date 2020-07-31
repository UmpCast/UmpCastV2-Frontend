import React from 'react'
import { Link } from "react-router-dom"

import useUser, { ApiSubmit } from "hooks"
import basicApi from "promises"

import { Button, ListGroup } from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function LeagueItem(props) {

    const myUser = useUser()

    const User = myUser[0]
    let { token } = User

    const { status, useUls } = props

    const {pk, league} = status
    const [uls, setUls] = useUls

    const useSubmit = () => {
        ApiSubmit(myUser, () => basicApi("api/user-league-status/", { pk: pk, token: token }, "DELETE"))
            .then(() => setUls(uls.filter(status => status.league.pk !== league.pk)))
            .catch()
    }

    return (
        <ListGroup.Item className="p-3 pt-4">
            <div className="d-inline-flex justify-content-between w-100">
                <div className="d-flex align-middle">
                    <FontAwesomeIcon icon={["fas", "meteor"]} className="fa-lg rounded text-white bg-dark p-1 mr-3" />
                    <Link to={`/league/${pk}`}><strong>{league.title}</strong></Link>
                </div>
                <Button variant="light rounded py-0 my-auto" style={{ "border": "1px solid #E2E4E8" }} onClick={useSubmit}>
                    Leave
                </Button>
            </div>
        </ListGroup.Item>
    )
}
