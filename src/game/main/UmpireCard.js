import React from "react";

import useUser from "hooks"

import CancelButton from "./CancelButton"

import { Card } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const UmpireCard = (props) => {

    const { user } = useUser()[0]

    const { app, order, game_status, useGame } = props
    const umpire = app.user
    let { first_name, last_name } = umpire

    first_name = first_name.charAt(0).toUpperCase() + first_name.slice(1)
    last_name = last_name.charAt(0).toUpperCase()

    const isCasted = order === 0
    const isMe = umpire.pk === user.pk

    const styles = {
        border: isMe ? "border-primary-custom" : "border-secondary-custom",
        title: isCasted ? "Casted" : "Backup",
        umpire_name: first_name + " " + last_name + ".",
        cancel_button: isMe && game_status.status === "scheduled" ?
            <CancelButton
                app={app}
                game_status={game_status}
                useGame={useGame} />
            : null
    }

    return (
        <div className={styles.border}>
            <Card className="text-center border-0">
                {styles.cancel_button}
                <Card.Body className="pt-0">
                    <Card.Title className="mt-4">
                        {styles.title}
                    </Card.Title>
                    <div
                        className="d-inline-flex flex-wrap bg-secondary p-4 my-4 rounded-circle text-white fa-4x">
                        <FontAwesomeIcon className="text-white"
                            icon="user-alt" />
                    </div>
                    <Card.Text>{styles.umpire_name}</Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

export default UmpireCard