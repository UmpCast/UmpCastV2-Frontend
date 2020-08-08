import React, { useState } from 'react'

import useUser, { useDisplay, ApiSubmit } from "hooks"
import basicApi from "promises"

import { InputConfirm } from "tools/Display"

import RenameLevel from "./RenameLevel"
import UmpireVisibility from "league/umpires/existing/UmpireVisibility"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ListGroup, Badge, Button } from "react-bootstrap"
import { Draggable } from "react-beautiful-dnd"

export default function Level(props) {

    const myUser = useUser()
    const { token } = myUser[0]

    const myDisplay = useDisplay()

    const useShow = useState(false)
    const setShow = useShow[1]

    const useShowRename = useState(false)
    const setShowRename = useShowRename[1]

    const { level, league, useLevels, index, pk } = props
    const [levels, setLevels] = useLevels

    const onDelete = () => {
        ApiSubmit(
            myDisplay,
            () => basicApi(
                "api/levels/",
                { pk: pk, token: token },
                "DELETE"
            ).then(res => res.data)
        ).then(() =>
            setLevels(levels.filter(level => level.pk !== pk))
        )
    }

    return (
        <Draggable draggableId={pk.toString()} index={index}>
            {provided => (
                <ListGroup.Item
                    className="border-top-0"
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                >
                    <div className="d-inline-flex justify-content-between w-100">
                        <span {...provided.dragHandleProps} className="my-auto">
                            <FontAwesomeIcon icon={'bars'} className="mr-3" />
                            {level.title}
                            <Button className="p-0 bg-white border-0 my-auto" onClick={() => setShowRename(true)}>
                                <FontAwesomeIcon icon="pen" className="ml-2 text-muted fa-sm" />
                            </Button>
                            <RenameLevel level={level} useShow={useShowRename} useLevels={useLevels} />
                        </span>
                        <Badge variant="primary my-auto">
                            5<FontAwesomeIcon icon={'user'} className="ml-1" />
                        </Badge>
                        <div className="d-inline-flex">
                            <UmpireVisibility divisions={league.divisions} status={{ ...level, endpoint: "levels" }} />
                        </div>
                        <Button className="p-0 bg-white border-0 my-auto" onClick={() => setShow(true)}>
                            <FontAwesomeIcon className="text-muted" icon={'times'} />
                        </Button>
                        <InputConfirm
                            action="Delete Level"
                            consequences={
                                <span><strong>{level.title}</strong> will no longer be assignable to umpires. All umpires
                                    with this level will retain their role visibility, but will have the custom level label.</span>
                            }
                            action_text="I understand, please delete this level."
                            confirm_text={`${level.title}`}
                            useShow={useShow}
                            onConfirm={onDelete}
                        />
                    </div>
                </ListGroup.Item>
            )}
        </Draggable>
    )
}
