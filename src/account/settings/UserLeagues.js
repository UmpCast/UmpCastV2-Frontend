import React from 'react'
import { Link } from "react-router-dom"

import UserSettingsNav from "./UserSettingsNav"

import { Button, ListGroup } from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function UserLeagues() {
    return (
        <UserSettingsNav active="leagues">
            <div className="d-inline-flex justify-content-between w-100 mb-3">
                <h3><strong>Leagues</strong></h3>
                <Button variant="success" className="rounded my-auto py-0 px-2">
                    <FontAwesomeIcon className="fa-sm mr-1" icon={'plus'} />
                    Join League
                </Button>
            </div>
            <ListGroup>
                <ListGroup.Item className="p-3 pt-4">
                    <div className="d-inline-flex justify-content-between w-100">
                        <div className="d-flex align-middle">
                            <FontAwesomeIcon icon={["fas", "meteor"]} className="fa-lg rounded text-white bg-dark p-1 mr-3" />
                            <Link to="/league/1"><strong>Palo Alto Little League</strong></Link>
                        </div>
                        <Button variant="light rounded py-0 my-auto" style={{ "border": "1px solid #E2E4E8" }}>
                            Leave
                        </Button>
                    </div>
                </ListGroup.Item>
            </ListGroup>
        </UserSettingsNav>
    )
}
