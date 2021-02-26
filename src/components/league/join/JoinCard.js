import React from 'react'

import useUser, { useApi } from "common/hooks"
import Loader from "common/components"

import { Row, Col, Button } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { UserJoinDescription } from "components/league/settings/Text"

export default function JoinCard(props) {

    const { useUls, league } = props

    const Api = useApi(requests)

    const { user } = useUser()
    const [, setUls] = useUls

    const onClick = () => {
        Api.Submit(() =>
            Api.joinLeague(user.pk, league.pk)
        ).then(res =>
            setUls([res.data])
        )
    }

    return (
        <Loader dep={[league]}>
            <FontAwesomeIcon
                icon={'users'}
                className="fa-5x text-muted mb-3" />
            <br />
            <JoinButton
                league={league}
                onClick={onClick} />
            <Row>
                <Col xs={8} className="mx-auto my-3">
                    <UserJoinDescription
                        account_type={user.account_type} />
                </Col>
            </Row>
        </Loader>
    )
}

const JoinButton = ({ league, onClick }) => (
    <Button type="submit" variant="primary rounded pb-0" onClick={onClick}>
        <h5 style={{ "lineHeight": 1.7 }}>
            <strong>
                Join {league.title}
            </strong>
        </h5>
    </Button>
)

const requests = {
    joinLeague: (user_pk, league_pk) => [
        "api/user-league-status/",
        {
            data: {
                user: user_pk,
                league: league_pk
            }
        },
        "POST"
    ]
}
