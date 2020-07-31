import React, {useState} from 'react'

import useUser, { ApiSubmit } from "hooks"
import basicApi from "promises"

import { BasicConfirm } from "tools/Display"

import { ListGroup } from "react-bootstrap"

export default function UnusedDivision(props) {

    const myUser = useUser()
    const { token } = myUser[0]

    const { division, useLeague } = props

    const [league, setLeague] = useLeague
    const { title, path, ts_id } = division

    const useShow = useState(false)
    const setShow = useShow[1]

    const onCreate = (title, ts_id) => () => {
        ApiSubmit(myUser, () => basicApi("api/divisions/",
            {
                token: token,
                data: { title: title, ts_id: ts_id, league: league.pk }
            }, "POST"))
            .then(res => setLeague(
                {
                    ...league,
                    divisions: league.divisions.concat(res)
                }))
            .catch()
            .finally(() => setShow(false))
    }

    return (
        <ListGroup.Item
            className="border-0 p-1 px-2 text-primary"
            onClick={() => setShow(true)}
            action
            key={ts_id}>
            {title}
            <small className="float-right text-muted">{path}</small>
            <BasicConfirm
                action="Add Division"
                action_text="Confirm"
                consequences={<span>This division, and all associated games, will be synced from Teamsnap
                onto <strong>{league.title}'s</strong> UmpCast calendar</span>}
                confirm_text={`${title}`}
                useShow={useShow}
                onConfirm={onCreate(title, ts_id)}
            />
        </ListGroup.Item>
    )
}
