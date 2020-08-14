import React, {Fragment, useState} from "react";

import useUser, { useDisplay, ApiSubmit } from "hooks"
import basicApi from "promises"

import { BasicConfirm } from "common/Display"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card } from "react-bootstrap";

const SignupCard = (props) => {

    const { user, token } = useUser()[0]
    const myDisplay = useDisplay()

    const useShow = useState(false)
    const setShow = useShow[1]

    const { post, useGame } = props

    const [game, setGame] = useGame
    const { pk } = post
    const apps = post.applications

    const onSubmit = () => {
        ApiSubmit(
            myDisplay,
            () => basicApi(
                "api/applications/",
                { token: token, data: { user: user.pk, post: pk } },
                "POST"
            )
        ).then(res => {
            const new_apps = apps.concat(res.data)
            const new_posts = game.posts.map(post => post.pk === pk ?
                { ...post, applications: new_apps } : post
            )

            setGame({
                ...game,
                posts: new_posts
            })
        })
    }

    const consequences = apps.length === 0 ? 
    "You will be casted for this role, and expected to appear at the game.":
    "You will be a backup for this role."

    return (
        <Fragment>
            <div className="border-secondary-dashed">
                <Card className="text-center border-0 text-muted">
                    <Card.Body className="p-0">
                        <div className="list-group-item-action border-0 py-3" onClick={() => setShow(true)}>
                            <Card.Title className="my-2">
                                <FontAwesomeIcon className="mr-2 fa-sm" icon="plus" />
                        Click to add
                    </Card.Title>
                            <div
                                className="d-inline-flex flex-wrap p-4 my-4 rounded-circle text-white fa-4x"
                                style={{ "backgroundColor": "#E8EAED" }}>
                                <FontAwesomeIcon className="text-white"
                                    icon={['fas', 'user-alt']} />
                            </div>
                            <Card.Text className="my-1">You</Card.Text>
                        </div>
                    </Card.Body>
                </Card>
            </div>
            <BasicConfirm
                action={`Signup for ${post.role.title}`}
                action_text="Confirm"
                consequences={consequences}
                useShow={useShow}
                onConfirm={onSubmit}
            />
        </Fragment>
    )
}

export default SignupCard;