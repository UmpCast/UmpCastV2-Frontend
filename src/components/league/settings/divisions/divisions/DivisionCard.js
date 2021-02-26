import React, { useState } from "react"
import { Draggable } from "react-beautiful-dnd"

import { useApi } from "common/hooks"

import RoleRow from "./RoleRow"
import AddRole from "./AddRole"
import { InputConfirm } from "common/forms"

import { Badge, Card, Button, ListGroup } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function DivisionCard(props) {
    const { division, index, handleDeleteDivision } = props
    const { pk, title } = division

    const Api = useApi(requests)

    const useShow = useState(false)
    const [, setShow] = useShow

    const useRoles = useState(division.roles)
    const useAddRole = useState(false)

    const onConfirmDelete = () => {
        Api.Submit(() => Api.deleteDivision(division)).then(() =>
            handleDeleteDivision(division)
        )
    }

    return (
        <Draggable draggableId={pk.toString()} index={index}>
            {(provided) => (
                <Card
                    className="border mb-3"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                >
                    <Card.Header className="p-1 text-center">
                        {division.ts_id === 0 ? (
                            <span
                                className="text-muted"
                                onClick={() => setShow(true)}
                            >
                                <FontAwesomeIcon
                                    icon="trash"
                                    size="sm"
                                    style={{
                                        position: "absolute",
                                        left: 10,
                                        top: 8,
                                        cursor: "pointer"
                                    }}
                                />
                            </span>
                        ) : (
                            <Badge
                                variant="warning"
                                style={{
                                    position: "absolute",
                                    left: 10,
                                    top: 6
                                }}
                            >
                                TS
                            </Badge>
                        )}
                        {title}
                        <ReorderDivision provided={provided} />
                        <InputConfirm
                            action={`Delete Division: ${division.title}`}
                            action_text="Delete"
                            confirm_text={division.title}
                            consequences="
                            All associated games will be deleted. Levels will no longer show this division.
                            "
                            useShow={useShow}
                            onConfirm={onConfirmDelete}
                        />
                    </Card.Header>
                    <Card.Body className="p-0 rounded-bottom">
                        <ListRoles useRoles={useRoles} division={division} />

                        <AddRole
                            useRoles={useRoles}
                            useAddRole={useAddRole}
                            division={division}
                        />

                        <AddRoleButton setAddRole={useAddRole[1]} />
                    </Card.Body>
                </Card>
            )}
        </Draggable>
    )
}

const ReorderDivision = ({ provided }) => (
    <div className="text-muted" {...provided.dragHandleProps}>
        <FontAwesomeIcon
            icon="bars"
            style={{
                fontSize: 12,
                position: "absolute",
                right: 10,
                top: 8
            }}
        />
    </div>
)

const ListRoles = ({ useRoles, division }) =>
    useRoles[0].map((role) => (
        <RoleRow
            role={role}
            useRoles={useRoles}
            division={division}
            key={role.pk}
        />
    ))

const AddRoleButton = ({ setAddRole }) => (
    <ListGroup.Item className="border-0 text-center pt-2 mt-auto">
        <Button
            variant="bg-none border-0 p-0 rounded"
            onClick={() => setAddRole(true)}
        >
            <FontAwesomeIcon
                icon={["far", "plus-square"]}
                className="my-auto fa-lg text-success"
            />
        </Button>
    </ListGroup.Item>
)

const requests = {
    deleteDivision: (division) => [
        "api/divisions/",
        {
            pk: division.pk
        },
        "DELETE"
    ]
}
