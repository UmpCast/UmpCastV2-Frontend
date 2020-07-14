import React, { Fragment } from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Button } from "react-bootstrap"

import "./league.css"

export default function LeagueBanner() {
    return (
        <Fragment>
            <div className="px-3 pt-3 bg-light border-bottom">
                <Container className="px-5">
                    <div className="row my-3">
                        <div className="ml-3 d-inline-flex align-items-center">
                            <FontAwesomeIcon icon={["fas", "meteor"]} className="fa-3x rounded text-white bg-dark p-2 mr-3" />
                            <h3><strong>Palo Alto Little League</strong></h3>
                        </div>
                    </div>
                    <div className="row">
                        <div>
                            <Button variant="light" className="px-3 border-bottom-hidden text-muted">
                                <p className="mb-1">Announcements</p>
                            </Button>
                            <Button variant="light" className="text-muted border-bottom-hidden px-3">
                                <p className="mb-1">Calendar</p>
                            </Button>
                            <Button variant="light" className="text-muted border-bottom-hidden px-3">
                                <p className="mb-1">Managers</p>
                            </Button>
                            <Button variant="light" className="text-muted border-bottom-hidden px-3">
                                <p className="mb-1">Urgent Games</p>
                            </Button>
                            <Button variant="light" className="border-bottom-primary px-3">
                                <p className="mb-1"><strong>Settings</strong></p>
                            </Button>
                            {/* <div className="mx-auto">
                            <Button variant="light" className="border-bottom-primary px-xl-5 px-md-3">
                                <p className="mb-1"><strong>Announcements</strong></p>
                            </Button>
                            <Button variant="light" className="text-muted border-bottom-hidden px-xl-5 px-md-4">
                                <p className="mb-1">Calendar</p>
                            </Button>
                            <Button variant="light" className="text-muted border-bottom-hidden px-xl-5 px-md-4">
                                <p className="mb-1">Managers</p>
                            </Button>
                        </div> */}
                        </div>
                    </div>
                </Container>
            </div>
        </Fragment>
    )
}

{/* <div className="row">
    <div className="mx-auto text-center">
        <FontAwesomeIcon icon={["fas", "meteor"]} className="fa-7x rounded text-white bg-dark p-2 mb-3" />
        <h3><strong>Palo Alto Little League</strong></h3>
    </div>
</div> */}