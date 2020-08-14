import React, { Fragment, useState } from 'react'

import useUser, { useDisplay, ApiSubmit } from "hooks"
import basicApi from "promises"

import { BasicConfirm } from "common/Display"

import { Button } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ExitStatus } from 'typescript'

export default function CancelButton(props) {

    const { token } = useUser()[0]
    const myDisplay = useDisplay()

    const useShow = useState(false)
    const setShow = useShow[1]

    const { app, game_status, useGame } = props
    const [game, setGame] = useGame

    const onCancel = () => {
        ApiSubmit(
            myDisplay,
            () => basicApi(
                "api/applications/",
                { pk: app.pk, token: token },
                "DELETE"
            )
        ).then(() => {
            const new_posts = game.posts
            const index = new_posts.findIndex(post => post.pk === app.post)

            new_posts[index].applications =
                new_posts[index].applications.filter(
                    post_app => post_app.pk !== app.pk
                )

            setGame({
                ...game,
                posts: new_posts
            })
        })
    }

    const status = game_status.order === 0 ? "Cast" : "Backup"
    const consequences = status === "Cast" ?
        "Manger's will be notified. The next umpire in-line will replace your cast." :
        "You will be removed from the backup line for this role."

    return (
        <Fragment>
            <Button
                variant="danger rounded p-0 px-1 mr-2 mt-2"
                style={{ position: "absolute", right: 0 }}
                disabled={game_status.cancel_expired}
                onClick={() => setShow(true)}>
                <FontAwesomeIcon icon="ban" />
            </Button>
            <BasicConfirm
                action={`Cancel ${status}`}
                action_text="Confirm"
                consequences={consequences}
                useShow={useShow}
                onConfirm={onCancel}
            />
        </Fragment>
    )
}
