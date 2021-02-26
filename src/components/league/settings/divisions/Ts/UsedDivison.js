import React, { useState } from 'react'

import { useApi } from "common/hooks"

import { InputConfirm } from "common/forms"

import { ListGroup } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { UnsyncDivisionConseq } from 'components/league/settings/Text'

export default function UsedDivison({ division, useLeague }) {

    const Api = useApi(requests)

    const { title, ts_id, pk } = division
    const [league, setLeague] = useLeague

    const useShow = useState(false)
    const setShow = useShow[1]

    const onDelete = () => {
        Api.Submit(() =>
            Api.deleteDivision(pk)
        )
            .then(() => {
                const new_divisions = league.divisions.filter(
                    div => div.pk !== pk
                )

                setLeague({
                    ...league,
                    divisions: new_divisions
                })
            })
            .finally(() => setShow(false))
    }

    return (
        <ListGroup.Item
            className="d-flex justify-content-between bg-primary 
            border-0 p-1 px-2 text-white"
            onClick={() => setShow(true)}
            action
            key={ts_id}>
            {title}
            <FontAwesomeIcon
                icon={'trash'}
                className="mr-2 fa-sm my-auto" />
            <InputConfirm
                action="Delete Division"
                consequences={
                    <UnsyncDivisionConseq
                        division={division} />
                }
                action_text="I understand, please delete this division."
                confirm_text={`${title}`}
                useShow={useShow}
                onConfirm={onDelete}
            />
        </ListGroup.Item>
    )
}

const requests = {
    deleteDivision: (division_pk) => [
        "api/divisions/",
        {
            pk: division_pk
        },
        "DELETE"
    ]
}