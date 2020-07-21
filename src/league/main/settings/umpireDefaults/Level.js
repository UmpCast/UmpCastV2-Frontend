import React from 'react'

import UmpireVisibility from "../../umpires/UmpireVisibility"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ListGroup, Badge, Button } from "react-bootstrap"
import { Draggable } from "react-beautiful-dnd"

export default function Level(props) {
    return (
        <Draggable draggableId={props.id} index={props.index}>
            {provided => (
                <div>
                    <ListGroup.Item
                        className="border-top-0"
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                    >
                        <div className="d-inline-flex justify-content-between w-100">
                            <span {...provided.dragHandleProps} className="my-auto">
                                <FontAwesomeIcon icon={'fas', 'bars'} className="mr-3" />
                                Level {props.index}
                            </span>
                            <Badge variant="primary my-auto">
                                5<FontAwesomeIcon icon={'fas', 'user'} className="ml-1" />
                            </Badge>
                            <div className="d-inline-flex">
                                <UmpireVisibility/>
                            </div>
                            <Button className="p-0 bg-white border-0 my-auto">
                                <FontAwesomeIcon className="text-muted" icon={'fas', 'times'} />
                            </Button>
                        </div>
                    </ListGroup.Item>
                </div>
            )}
        </Draggable>
    )
}
