import React, { Fragment } from 'react'
import axios from "axios"

import useUser, { useApi } from "common/hooks"

import { ProfilePicture, NewPfpButton } from "common/components"
import { myUrl, config } from "common/Api"

import { Row, Col } from "react-bootstrap"
import darkMeteor from "assets/dark_meteor.png"

export default function UpdatePfp({ useLeague }) {

    const Api = useApi()
    const { token } = useUser()

    const [league, setLeague] = useLeague

    const handlePfpSubmit = (file) => {

        let bodyFormData = new FormData()
        bodyFormData.append("league_picture", file)

        return Api.Submit(
            () => axios.patch(
                myUrl(`api/leagues/${league.pk}/`),
                bodyFormData,
                config(token, null, "multipart/form-data")
            ))
            .then(res =>
                setLeague(res.data)
            )
    }

    return (
        <Fragment>
            <Row>
                <Col className="d-inline-flex">
                    <h5 className="mb-3 mr-auto">
                        <strong>League Logo</strong>
                    </h5>
                    <NewPfpButton
                        handleSubmit={handlePfpSubmit} />
                </Col>
            </Row>
            <Row>
                <Col className="text-center">
                    <div className="d-inline-flex flex-wrap border border-muted rounded p-1">
                        <ProfilePicture
                            className="img-fluid rounded"
                            src={league.league_picture}
                            alt={darkMeteor} />
                    </div>
                </Col>
            </Row>
        </Fragment>
    )
}
