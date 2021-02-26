import React from "react";

import useUser from "common/hooks"

import Loader, { ProfilePicture } from "common/components"

import CancelButton from "./CancelButton"

import { Card } from "react-bootstrap"
import PrimaryBaseball from "assets/primary_baseball.png"
import DarkBaseball from "assets/dark_baseball.png"

const UmpireCard = (props) => {

    const { app, order, game_status, useGame } = props

    const { user } = useUser()

    const umpire = app.user
    let { first_name, last_name } = umpire

    first_name = first_name.charAt(0).toUpperCase() + first_name.slice(1)
    last_name = last_name.charAt(0).toUpperCase()

    const isCasted = order === 0
    const isMe = umpire.pk === user.pk

    const styles = {
        border: isMe ? "border-primary-custom" : "border-secondary-custom",
        title: isCasted ? "Casted" : "Backup",
        umpire_name: first_name + " " + last_name + "."
    }

    return (
        <div className={styles.border}>
            <Card className="text-center border-0">
                <Loader dep={[isMe, game_status.status === "scheduled"]}>
                    <CancelButton
                        app={app}
                        game_status={game_status}
                        useGame={useGame} />
                </Loader>
                <Card.Body>
                    <Card.Title>
                        {styles.title}
                    </Card.Title>

                    <ProfilePicture
                        src={umpire.profile_picture}
                        alt={isMe ? PrimaryBaseball : DarkBaseball}
                        className="rounded-circle img-thumbnail border-0 mt-2 mb-3 p-4" />

                    <Card.Text>
                        {styles.umpire_name}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

export default UmpireCard