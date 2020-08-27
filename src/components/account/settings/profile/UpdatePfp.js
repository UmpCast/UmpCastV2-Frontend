import React, { Fragment } from 'react'

import { NewPfpButton, ProfilePicture } from "common/components"

import primaryBaseball from "assets/primary_baseball.png"
import { Row, Col } from "react-bootstrap"

export default function UpdatePfp({ src, handlePfpSubmit }) {
    return (
        <Fragment>
            <Row className="mr-0">
                <Col className="d-inline-flex">
                    <h5 className="mb-3 mr-auto">
                        <strong>Profile Picture</strong>
                    </h5>
                    <NewPfpButton
                        handleSubmit={handlePfpSubmit} />
                </Col>
            </Row>
            <Row className="mr-0">
                <Col>
                    <ProfilePicture
                        className="img-thumbnail rounded-circle"
                        src={src}
                        alt={primaryBaseball} />
                </Col>
            </Row>
        </Fragment>
    )
}
