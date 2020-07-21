import React from 'react'

import Level from "./Level"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Card, Dropdown, Button } from "react-bootstrap"
import { DragDropContext, Droppable } from "react-beautiful-dnd"

export default function UmpireLevels() {
    return (
        <div className="mt-4">
            <Card className="border-0 mb-3">
                <Card.Header className="border">
                    <div className="d-inline-flex">
                        <FontAwesomeIcon
                            className="text-success my-auto mr-2 fa-lg"
                            icon={['fas', 'plus-square']} />
                        <h5 className="mb-0"><strong>Umpire Levels</strong></h5>
                    </div>
                    <div class="float-right d-inline-flex">
                        <div className="my-auto mr-2">Default:</div>
                        <Dropdown>
                            <Dropdown.Toggle
                                variant="secondary"
                                className="rounded py-0 px-1"
                                style={{ "lineHeight": 1.7 }}
                            >
                                Level 1
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="mt-2">
                                <Dropdown.Item href="#/action-1">Level 1</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Level 2</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Level 3</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </Card.Header>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="umpire-levels">
                        {provided => (
                            <Card.Body
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className="p-0"
                            >
                                <Level index={1} id={"1"} />
                                <Level index={2} id={"2"} />
                                <Level index={3} id={"3"} />
                                <Level index={4} id={"4"} />
                                {provided.placeholder}
                            </Card.Body>
                        )}
                    </Droppable>
                </DragDropContext>
            </Card>
        </div>
    )
}

const onDragEnd = result => {

}