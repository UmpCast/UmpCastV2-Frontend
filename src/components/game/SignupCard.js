import React from "react";

import {Card} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faUserAlt} from "@fortawesome/free-solid-svg-icons";

const SignupCard = () => (
    <div className="border-secondary-dashed">
        <Card className="text-center border-0 text-muted">
            <Card.Body className="p-0">
                <div className="list-group-item-action border-0 py-3">
                    <Card.Title className="mb-0 mt-1">
                        <FontAwesomeIcon className="mr-2 fa-sm" icon={faPlus}/>
                        <strong>Click to add</strong>
                    </Card.Title>
                    <div
                        className="d-inline-flex flex-wrap p-4 my-4 rounded-circle text-white fa-4x"
                        style={{"backgroundColor": "#E8EAED"}}>
                        <FontAwesomeIcon className="text-white"
                                         icon={faUserAlt}/>
                    </div>
                    <Card.Text className="mb-1">Yourself</Card.Text>
                </div>
            </Card.Body>
        </Card>
    </div>
)

export default SignupCard;