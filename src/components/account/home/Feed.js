import React, { Component } from "react";

import Message from "./Message";
import FullGame from "../../game/reminder/ReminderGame";

import ProfileIcon from "../icon/ProfileIcon";
import MessageIcon from "../icon/MessageIcon";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Button, Accordion } from "react-bootstrap"

class Feed extends Component {
    cast = [
        {
            role: "Base",
            first_name: "Max",
            last_name: "Campbell"
        },
        {
            role: "Plate",
            first_name: "Jonathan",
            last_name: "Kao"
        },
        {
            role: "Scorekeeper",
            first_name: null,
            last_name: null
        }
    ]

    render() {
        return (
            <div className="align-items-center mt-3">
                <div className="row mx-auto pb-4">
                    <div className="col-12">
                        <Accordion>
                            <Card text="white" bg="dark">
                                <Card.Header>
                                    <strong className="text-white">You have a game coming up</strong>
                                    <Accordion.Toggle as={Button} eventKey="0"
                                        className="flex-wrap float-right secondary rounded border-muted p-0 bg-dark border-0">
                                        <FontAwesomeIcon icon={['fas', 'chevron-down']} />
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body className="pb-0">
                                        <FullGame
                                            role="Base"
                                            date="Aug 10"
                                            time_start="3:30 PM"
                                            time_end="5:30 PM"
                                            title="Morgan-Gault vs. Agile"
                                            division="Majors"
                                            location="Mitchell Ballpark"
                                            cast={this.cast} />
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    </div>
                </div>
                <div className="mb-4">
                    <Message
                        profileIcon={
                            <ProfileIcon
                                icon={['fas', 'baseball-ball']}
                                rotation={30}
                                variant="primary"
                                size="fa-2x"
                                padding="p-2"
                            />
                        }
                        messageIcon={<MessageIcon icon={['fas', 'wrench']} />}
                        sender="UmpCast"
                        subject="Update to our Policy"
                        date="Mar 4, 2020"
                        body="We have recently updated our privacy policy. Please navigate to the home page and
                        review the changes."/>
                </div>
                <div className="mb-3">
                    <Message
                        profileIcon={
                            <ProfileIcon
                                icon={['fas','user-alt']}
                                variant="success"
                                size="fa-2x"
                                padding="p-2"
                            />
                        }
                        messageIcon={<MessageIcon icon={['fas', 'exclamation-circle']} />}
                        sender="Palo Alto Little League"
                        subject="COVID-19 Response"
                        date="Mar 1, 2020"
                        body="Due to the escalation of the covid-19 pandemic, PA little league will be terminating the
                        season early. Any games that umpires have signed up for will be dropped."/>
                </div>
                <div className="row mx-auto mb-4">
                    <div className="col-1" />
                    <div className="col-11 text-center">
                        <a href="/#/">View more</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Feed;