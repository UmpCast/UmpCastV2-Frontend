import React, { useState } from 'react'

import { useApi } from "hooks"

import { InputConfirm } from "common/Display"

import { ListGroup } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { UnsyncDivisionConseq } from 'league/settings/Text'

export default function UsedDivison(props) {

    const Api = useApi(deleteDivision)

    const { division } = props
    const { title, ts_id, pk } = division

    const useShow = useState(false)
    const setShow = useShow[1]

    const onDelete = () => {
        Api.deleteDivision(pk)
            .finally(setShow(false))
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

const deleteDivision = (division_pk) => [
    "api/divisions/",
    {
        pk: division_pk
    },
    "DELETE"
]