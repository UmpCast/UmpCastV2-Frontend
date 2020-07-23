import React, {useContext} from 'react'

import UserContext from "UserContext"
import { deleteRole } from "league/promises"

import { ListGroup, Badge, Button } from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function RoleRow(props) {

    const {token} = useContext(UserContext)[0]

    const {pk, title, num_umpires, useMyRoles} = props
    const [myRoles, setMyRoles] = useMyRoles

    const onClick = () => {
        deleteRole({pk: pk, token: token})
        .then(() => {
            const myNewRoles = []
            myRoles.map(role => role.pk !== pk && myNewRoles.push(role))
            setMyRoles(myNewRoles)
        })
        .catch(err => console.log(err))
    }

    return (
        <ListGroup.Item className="d-inline-flex w-100 justify-content-between border-0">
            <div>
                <Badge variant="primary mr-3">
                    {num_umpires}<FontAwesomeIcon icon={'user'} className="ml-1" />
                </Badge>
                <span className="my-auto">{title}</span>
            </div>
            <Button variant="bg-none border-0 my-auto p-0" onClick={onClick}>
                <FontAwesomeIcon icon={'times'} className="text-muted" />
            </Button>
        </ListGroup.Item>
    )
}
