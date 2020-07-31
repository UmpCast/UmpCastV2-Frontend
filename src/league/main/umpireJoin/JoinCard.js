import React, { Fragment } from 'react'

import useUser from "hooks"
import { setAlert } from "tools/Display"
import { joinLeague } from "league/promises"

import { Row, Col, Button } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function JoinCard(props) {

    const myUser = useUser()
    const { user, token } = myUser[0]

    const { useUls, league_pk } = props
    const [uls, setUls] = useUls

    let res = {}
    const onClick = () => {
        joinLeague({ token: token }, { user: user.pk, league: league_pk })
            .then(payload => {
                res = { variant: "success", msg: <span>Request to join <strong>{league_pk}</strong> sent</span> }
                setUls(uls.concat(payload.uls))
            })
            .catch(err => {
                //TODO: Error - You have already sent a request
                console.log(err.response)
                res = { variant: "danger", msg: "An unknown error occured while sending join request" }
            })
            .finally(() => setAlert(myUser, res))
    }

    return (
        <Fragment>
            <FontAwesomeIcon icon={'users'} className="fa-5x text-muted mb-3" /><br />
            <Button type="submit" variant="primary rounded pb-0" onClick={onClick}>
                <h5 style={{ "lineHeight": 1.7 }}><strong>Join Palo Alto Little League</strong></h5>
            </Button>
            <Row>
                <Col xs={8} className="mx-auto my-3">
                    You currently aren't associated with this league. To view league details 
                    and signup for league games, you can request to join as an umpire.
                </Col>
            </Row>
        </Fragment>
    )
}
