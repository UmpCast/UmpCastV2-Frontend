import React from "react"

import Loader from "common/components"

import { Nav } from "react-bootstrap"

const SettingsHeader = (props) => {

    const { profilePicture, title, footer } = props

    return (
        <Nav.Item >
            <Nav.Link
                eventKey="disabled"
                className="bg-light text-secondary border ump-border-rounded-top disabled">
                <div className="d-inline-flex justify-content-center">
                    <Loader dep={profilePicture}>
                        {profilePicture}
                    </Loader>
                    <div className="my-auto d-flex flex-column">
                        <div className="my-auto flex-shrink-0">
                            <p className="mb-0 font-weight-strong">
                                {title}
                            </p>
                        </div>
                        <small className="text-muted" style={{ "lineHeight": 1 }} >
                            {footer}
                        </small>
                    </div>
                </div>
            </Nav.Link>
        </Nav.Item >
    )
}

export default SettingsHeader