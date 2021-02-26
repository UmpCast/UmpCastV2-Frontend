import React, { useState } from 'react'
import { Draggable } from "react-beautiful-dnd"

import RoleRow from "./RoleRow"
import AddRole from "./AddRole"

import { Card, Button, ListGroup } from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function DivisionCard(props) {

    const { division, index } = props
    const { pk, title } = division

    const useRoles = useState(division.roles)
    const useAddRole = useState(false)

    return (
        <Draggable
            draggableId={pk.toString()}
            index={index}>
            {provided => (
                <Card
                    className="border mb-3"
                    ref={provided.innerRef}
                    {...provided.draggableProps}>
                    <Card.Header
                        className="p-1 text-center">
                        {title}
                        <ReorderDivision
                            provided={provided} />
                    </Card.Header>
                    <Card.Body className="p-0 rounded-bottom">
                        <ListRoles
                            useRoles={useRoles}
                            division={division} />

                        <AddRole
                            useRoles={useRoles}
                            useAddRole={useAddRole}
                            division={division} />

                        <AddRoleButton
                            setAddRole={useAddRole[1]} />
                    </Card.Body>
                </Card>
            )}
        </Draggable>
    )
}

const ReorderDivision = ({ provided }) => (
    <div
        className="text-muted"
        {...provided.dragHandleProps}>
        <FontAwesomeIcon
            icon="bars"
            style={{
                fontSize: 12,
                position: "absolute",
                right: 10,
                top: 6
            }}
        />
    </div>
)

const ListRoles = ({ useRoles, division }) => (
    useRoles[0].map(role =>
        <RoleRow
            role={role}
            useRoles={useRoles}
            division={division}
            key={role.pk}
        />
    )
)

const AddRoleButton = ({ setAddRole }) => (
    <ListGroup.Item
        className="border-0 text-center pt-2 mt-auto">
        <Button
            variant="bg-none border-0 p-0 rounded"
            onClick={() => setAddRole(true)}>
            <FontAwesomeIcon
                icon={['far', 'plus-square']}
                className="my-auto fa-lg text-success" />
        </Button>
    </ListGroup.Item>
)