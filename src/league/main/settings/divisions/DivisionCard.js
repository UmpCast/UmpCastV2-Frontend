import React, { useState } from 'react'

import RoleRow from "./RoleRow"
import AddRole from "./AddRole"

import { Card, Button, ListGroup } from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function DivisionSummary(props) {

    const useMyRoles = useState(props.roles)
    const myRoles = useMyRoles[0]

    const useVisible = useState(false)
    const setVisible = useVisible[1]

    const { title, pk } = props

    const formatted_roles = myRoles.map(role =>
        <RoleRow
            key={role.pk}
            pk={role.pk}
            title={role.title}
            div_title={title}
            num_umpires={role.num_umpires}
            useMyRoles={useMyRoles}
        />
    )

    return (
        <Card className="border mb-3">
            <Card.Header className="p-1 text-center">
                {title}
            </Card.Header>
            <Card.Body className="p-0 rounded-bottom">
                {formatted_roles}
                <AddRole
                    division_pk={pk}
                    useVisible={useVisible}
                    useMyRoles={useMyRoles}
                />
                <ListGroup.Item className="border-0 text-center pt-2 mt-auto">
                    <Button variant="bg-none border-0 p-0 rounded" onClick={() => setVisible(true)}>
                        <FontAwesomeIcon icon={['far', 'plus-square']} className="my-auto fa-lg text-success" />
                    </Button>
                </ListGroup.Item>
            </Card.Body>
        </Card>
    )
}