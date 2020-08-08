import React, { Fragment } from 'react'

import useUser, { useDisplay, ApiSubmit } from "hooks"
import basicApi from "promises"

import { Row, Col, Button } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function JoinCard(props) {

    const myUser = useUser()
    const { user, token } = myUser[0]

    const myDisplay = useDisplay()

    const { useUls, league_pk } = props
    const [uls, setUls] = useUls

    const onClick = () => {
        ApiSubmit(myDisplay, () => basicApi(
            "api/user-league-status/",
            { token: token, data: { user: user.pk, league: league_pk } },
            "POST"
        )).then(payload => setUls({...uls, count: 1, results:[payload]}))
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
