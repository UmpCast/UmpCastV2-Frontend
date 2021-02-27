import React, { Fragment, useState } from 'react'

import { useApi } from "common/hooks"
import { RenameListItem } from "common/forms"

import { InputConfirm } from "common/forms"

import { ListGroup, Badge, Button } from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DeleteRoleConseq } from "components/league/settings/Text"

export default function RoleRow(props) {

    const { role, useRoles, division } = props

    const { pk, title } = role
    const [roles, setRoles] = useRoles

    const Api = useApi(requests)
    const useShow = useState(false)
    const useShowRename = useState(false)

    const [, setShow] = useShow

    const onConfirm = () => {
        Api.Submit(() =>
            Api.deleteRole(pk)
        )
            .then(() => {
                const new_roles = roles.filter(role => role.pk !== pk)

                setRoles(new_roles)
            })
    }

    return (
        <ListGroup.Item className="d-inline-flex w-100 justify-content-between border-0">
            <div className="d-inline-flex">
                <RoleProfile
                    role={role} />

                <RoleRename
                    role={role}
                    useRoles={useRoles}
                    useShow={useShowRename} />
            </div>

            <DeleteRoleButton
                setShow={setShow} />

            <InputConfirm
                action="Delete Role"
                consequences={
                    <DeleteRoleConseq
                        division={division} />
                }
                action_text="I understand, please delete this role."
                confirm_text={`${division.title} ${title}`}
                useShow={useShow}
                onConfirm={onConfirm}
            />
        </ListGroup.Item>
    )
}

const RoleProfile = ({ role }) => (
    <div>
        <Badge variant="primary mr-3">
            {/* {role.num_umpires} */}
            <FontAwesomeIcon
                icon={'user'}
                className="ml-1" />
        </Badge>
        <span className="my-auto">
            {role.title}
        </span>
    </div>
)

export const RoleRename = ({ role, useRoles, useShow }) => (
    <Fragment>
        <Button
            className="bg-white border-0 my-auto ml-2 p-0"
            onClick={() => useShow[1](true)}>
            <FontAwesomeIcon
                icon="pen"
                className="text-muted fa-sm" />
        </Button>
        <RenameListItem
            action="Rename Role"
            useShow={useShow}
            useList={useRoles}
            item={role}
            endpoint="api/roles/" />
    </Fragment>
)

const DeleteRoleButton = ({ setShow }) => (
    <Button
        variant="bg-none border-0 my-auto p-0"
        onClick={() => setShow(true)}>
        <FontAwesomeIcon
            icon={'times'}
            className="text-muted" />
    </Button>
)

const requests = {
    deleteRole: (role_pk) => [
        "api/roles/",
        {
            pk: role_pk
        },
        "DELETE"
    ]
}