import React, { Fragment, useState } from 'react'

import { useApi } from "common/hooks"

import { InputConfirm } from "common/Forms"

import RenameLevel from "./RenameLevel"
import UmpireVisibility from "components/league/umpires/existing/Visibility/UmpireVisibility"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ListGroup, Badge, Button } from "react-bootstrap"
import { Draggable } from "react-beautiful-dnd"

export default function Level(props) {

    const { level, divisions, useLevels, onChange, index } = props

    const { pk } = level
    const [levels, setLevels] = useLevels

    const Api = useApi(deleteLevel)
    const useShow = useState(false)
    const useShowRename = useState(false)

    const onDelete = () => {
        Api.Submit(() =>
            Api.deleteLevel(pk)
        ).then(() =>
            setLevels(levels.filter(level => level.pk !== pk))
        )
    }

    return (
        <Draggable
            draggableId={pk.toString()}
            index={index}>
            {provided => (
                <ListGroup.Item
                    className="border-top-0"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                >
                    <div className="d-inline-flex justify-content-between w-100">
                        <LevelName
                            level={level}
                            provided={provided} />

                        <LevelRename
                            level={level}
                            useLevels={useLevels}
                            useShowRename={useShowRename} />

                        <UmpiresBadge />

                        <LevelVis
                            level={level}
                            divisions={divisions}
                            onChange={onChange} />

                        <DeleteButton
                            setShow={useShow[1]} />

                        <ConfirmDelete
                            level={level}
                            useShow={useShow}
                            onDelete={onDelete} />
                    </div>
                </ListGroup.Item>
            )}
        </Draggable>
    )
}

export const LevelName = ({ level, provided }) => {
    return (
        <div
            {...provided.dragHandleProps}
            className="my-auto">
            <FontAwesomeIcon
                icon={'bars'}
                className="mr-3" />
            {level.title}
        </div>
    )
}

export const LevelRename = ({ level, useShowRename, useLevels }) => (
    <Fragment>
        <Button
            className="p-0 bg-white border-0 my-auto"
            onClick={() => useShowRename[1](true)}>
            <FontAwesomeIcon
                icon="pen"
                className="ml-2 text-muted fa-sm" />
        </Button>
        <RenameLevel
            level={level}
            useShow={useShowRename}
            useLevels={useLevels} />
    </Fragment>
)

export const UmpiresBadge = () => (
    <Badge variant="primary my-auto">
        5
        <FontAwesomeIcon
            icon={'user'}
            className="ml-1" />
    </Badge>
)

export const LevelVis = ({ level, divisions, onChange }) => {
    const status = {
        ...level,
        endpoint: "levels"
    }

    return (
        <div className="d-inline-flex">
            <UmpireVisibility
                divisions={divisions}
                onChange={onChange}
                status={status} />
        </div>
    )
}

export const DeleteButton = ({ setShow }) => (
    <Button
        className="p-0 bg-white border-0 my-auto"
        onClick={() => setShow(true)}>
        <FontAwesomeIcon
            className="text-muted"
            icon={'times'} />
    </Button>
)

export const ConfirmDelete = ({ level, useShow, onDelete }) => (
    <InputConfirm
        action="Delete Level"
        consequences={
            <span>
                <strong>{level.title}</strong>
                will no longer be assignable to umpires. All umpires
                with this level will retain their role visibility,
                but will have the custom level label.
            </span>
        }
        action_text="I understand, please delete this level."
        confirm_text={`${level.title}`}
        useShow={useShow}
        onConfirm={onDelete}
    />
)

export const deleteLevel = (level_pk) => [
    "api/levels/",
    {
        pk: level_pk
    },
    "DELETE"
]
