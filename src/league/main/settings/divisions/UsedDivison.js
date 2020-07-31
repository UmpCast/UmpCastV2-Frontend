import React, { useState } from 'react'

import useUser, { ApiSubmit } from "hooks"
import basicApi from "promises"

import { InputConfirm } from "tools/Display"

import { ListGroup } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function UsedDivison(props) {

    const myUser = useUser()
    const { token } = myUser[0]

    const { division, useLeague } = props
    const { title, ts_id, pk } = division

    const useShow = useState(false)
    const setShow = useShow[1]

    const onDelete = (pk) => () => {
        ApiSubmit(myUser, () => basicApi("api/divisions/", { pk: pk, token: token }, "DELETE"))
            .then(res => { })
            .catch()
            .finally(setShow(false))
    }

    return (
        <ListGroup.Item
            className="border-0 p-1 px-2 text-white bg-primary d-flex justify-content-between"
            onClick={() => setShow(true)}
            action
            key={ts_id}>
            {title}
            <FontAwesomeIcon icon={'trash'} className="mr-2 fa-sm my-auto" />
            <InputConfirm
                action="Delete Division"
                consequences={
                    <span>Deleting <strong>{title}</strong> will also delete all associated games, including
                    games already with signups. Past games and signup history will be preserved.</span>
                }
                action_text="I understand, please delete this division."
                confirm_text={`${title}`}
                useShow={useShow}
                onConfirm={onDelete(pk)}
            />
        </ListGroup.Item>
    )
}
