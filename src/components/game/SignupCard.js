import React from 'react';
import {Card} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserAlt} from "@fortawesome/free-solid-svg-icons";

const SignupCard = () => (
    <div className="col-6 col-md-4 col-lg-3 col-xl-2 p-2">
        <div className="border-primary-custom">
            <Card className="text-center border-0">
                <Card.Body>
                    <Card.Title className="mb-0">Casted</Card.Title>
                    <div
                        className="d-inline-flex flex-wrap bg-secondary p-4 my-4 rounded-circle text-white fa-4x">
                        <FontAwesomeIcon className="text-white"
                                         icon={faUserAlt}/>
                    </div>
                    <Card.Text><a href="/#/game/1">Max Campbell</a></Card.Text>
                </Card.Body>
            </Card>
        </div>
    </div>
)

export default SignupCard;