import React, { Fragment, useState } from "react";

import useUser, { useApi } from "common/hooks"

import { ProfilePicture } from "common/components"
import { BasicConfirm } from "common/forms"
import { GameSignupConseq } from "components/game/Text"

import { Card } from "react-bootstrap";
import PrimaryBaseball from "assets/primary_baseball.png"

const SignupCard = (props) => {

    const { post, useGame } = props

    const { pk } = post
    const apps = post.applications
    const [game, setGame] = useGame

    const Api = useApi(requests)
    const { user } = useUser()

    const useShow = useState(false)

    const [, setShow] = useShow

    const onSubmit = () => {
        Api.Submit(() =>
            Api.gameSignup(user.pk, post.pk)
        ).then(res => {
            const new_apps = apps.concat(res.data)

            const new_posts = game.posts.map(post =>
                post.pk === pk ?
                    { ...post, applications: new_apps } : post
            )

            setGame({
                ...game,
                posts: new_posts
            })
        })
    }

    return (
        <Fragment>
            <div
                className="border-secondary-dashed"
                style={{ cursor: "pointer" }}>
                <Card
                    className="text-center border-0 text-muted list-group-item-action"
                    onClick={() => setShow(true)}>
                    <Card.Body>
                        <Card.Title>
                            <strong>+ Click to add</strong>
                        </Card.Title>

                        <ProfilePicture
                            src={user.profile_picture}
                            alt={PrimaryBaseball}
                            className="rounded-circle img-thumbnail border-0 mt-2 mb-3 p-4" />

                        <Card.Text>
                            You
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
            <BasicConfirm
                action={`Signup for ${post.role.title}`}
                action_text="Confirm"
                consequences={
                    <GameSignupConseq
                        order={apps.length} />
                }
                useShow={useShow}
                onConfirm={onSubmit}
            />
        </Fragment>
    )
}

const requests = {
    gameSignup: (user_pk, post_pk) => [
        "api/applications/",
        {
            data: {
                user: user_pk,
                post: post_pk
            }
        },
        "POST"
    ]
}

export default SignupCard;