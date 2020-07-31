import React from 'react'

import UmpireVisibility from "league/main/umpires/existing/UmpireVisibility"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ListGroup, Badge, Button } from "react-bootstrap"
import { Draggable } from "react-beautiful-dnd"

export default function Level(props) {

    const { league, level, index, id } = props

    return (
        <Draggable draggableId={id} index={index}>
            {provided => (
                <div>
                    <ListGroup.Item
                        className="border-top-0"
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                    >
                        <div className="d-inline-flex justify-content-between w-100">
                            <span {...provided.dragHandleProps} className="my-auto">
                                <FontAwesomeIcon icon={'bars'} className="mr-3" />
                                {props.level.title}
                            </span>
                            <Badge variant="primary my-auto">
                                5<FontAwesomeIcon icon={'user'} className="ml-1" />
                            </Badge>
                            <div className="d-inline-flex">
                                <UmpireVisibility divisions={league.divisions} status={{...level, endpoint: "levels"}}/>
                            </div>
                            <Button className="p-0 bg-white border-0 my-auto">
                                <FontAwesomeIcon className="text-muted" icon={'times'} />
                            </Button>
                        </div>
                    </ListGroup.Item>
                </div>
            )}
        </Draggable>
    )
}
