import React, { Fragment, useState } from 'react'

import { useApi } from "common/hooks"

import { BasicConfirm } from "common/forms"
import { CancelAppConseq } from "components/game/Text"

import { Button } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function CancelButton(props) {

    const { app, game_status, useGame } = props

    const [game, setGame] = useGame

    const Api = useApi(requests)

    const useShow = useState(false)

    const [, setShow] = useShow

    const onCancel = () => {
        Api.Submit(() =>
            Api.cancelApp(app.pk)
        ).then(() =>
            setGame({
                ...game,
                posts: removeAppFromPost(app, game.posts)
            })
        )
    }

    const status = game_status.order === 0 ? "Cast" : "Backup"

    return (
        <Fragment>
            <BanButton
                setShow={setShow}
                game_status={game_status}
            />
            <BasicConfirm
                action={`Cancel ${status}`}
                action_text="Confirm"
                consequences={
                    <CancelAppConseq
                        status={status} />
                }
                useShow={useShow}
                onConfirm={onCancel}
            />
        </Fragment>
    )
}

const BanButton = ({ setShow, game_status }) => (
    <Button
        variant="danger rounded p-0 px-1 mr-2 mt-2"
        style={{ position: "absolute", right: 0 }}
        disabled={game_status.cancel_expired}
        onClick={() => setShow(true)}>
        <FontAwesomeIcon icon="ban" />
    </Button>
)

const removeAppFromPost = (app, posts) => {
    const new_posts = posts

    const index = new_posts.findIndex(post =>
        post.pk === app.post
    )

    new_posts[index].applications =
        new_posts[index].applications.filter(
            post_app => post_app.pk !== app.pk
        )

    return new_posts
}

const requests = {
    cancelApp: (app_pk) => [
        "api/applications/",
        {
            pk: app_pk
        },
        "DELETE"
    ]
}