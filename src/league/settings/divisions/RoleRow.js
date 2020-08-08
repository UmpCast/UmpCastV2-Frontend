import React, { useState, useContext } from 'react'

import UserContext from "UserContext"
import { deleteRole } from "league/promises"

import { InputConfirm } from "tools/Display"
import { MyAlert } from "tools/Display"

import { ListGroup, Badge, Button } from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function RoleRow(props) {

    const [User, setUser] = useContext(UserContext)
    const { token } = User

    const { pk, title, div_title, num_umpires, useMyRoles } = props
    const [myRoles, setMyRoles] = useMyRoles

    const useShow = useState(false)
    const setShow = useShow[1]

    const onConfirm = () => {
        let data = {}
        deleteRole({ pk: pk, token: token })
            .then(() => {
                const myNewRoles = []
                myRoles.map(role => role.pk !== pk && myNewRoles.push(role))
                setMyRoles(myNewRoles)

                data = { variant: "success", res: <span>Successfully deleted role</span> }
            })
            .catch(() => data = {variant: "danger", res: <span>Unknown error while deleting role</span> })
            .finally(() => {
                setUser({...User, alert: <MyAlert variant={data.variant} className="mb-0">{data.res}</MyAlert>})
            })
    }

    return (
        <ListGroup.Item className="d-inline-flex w-100 justify-content-between border-0">
            <div>
                <Badge variant="primary mr-3">
                    {num_umpires}<FontAwesomeIcon icon={'user'} className="ml-1" />
                </Badge>
                <span className="my-auto">{title}</span>
            </div>
            <InputConfirm
                action="Delete Role"
                consequences={
                    <span>This role will be removed from all current games and umpires will be notified.
                    It will no longer be included for any future <strong>{div_title}</strong> games</span>
                }
                action_text="I understand, please delete this role."
                confirm_text={`${div_title} ${title}`}
                useShow={useShow}
                onConfirm={onConfirm}
            />
            <Button variant="bg-none border-0 my-auto p-0" onClick={() => setShow(true)}>
                <FontAwesomeIcon icon={'times'} className="text-muted" />
            </Button>
        </ListGroup.Item>
    )
}
