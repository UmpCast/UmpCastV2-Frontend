import React, { useState } from 'react'
import arrayMove from "array-move"

import useUser from "hooks"
import basicApi from "promises"

import Level from "./Level"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Card, Dropdown, Button } from "react-bootstrap"
import { DragDropContext, Droppable } from "react-beautiful-dnd"

export default function UmpireLevels(props) {

    const { token } = useUser()[0]

    const { league } = props

    const [levels, setLevels] = useState(league.levels)

    const onChange = new_level => {
        setLevels(levels.map(level => level.pk === new_level.pk ? new_level : level))
    }

    const onDragEnd = async result => {
        const { destination, source } = result

        const start = source.index
        const end = destination.index

        if (start !== end) {
            setLevels(arrayMove(levels, start, end))
        }

        basicApi(`api/levels/${levels[start].pk}/move_level/`, { token: token, data: { order: end } }, "PATCH")
            .then()
            .catch()
    }

    const formatted_levels = levels.map((level, index) =>
        <Level league={league} level={level} onChange={onChange} index={index} id={level.pk.toString()} key={level.pk} />
    )

    return (
        <div className="mt-4">

            <Card className="border-0 mb-3">
                <Card.Header className="border d-inline-flex w-100 justify-content-between p-2 px-3">
                    <h5 className="my-auto"><strong>Umpire Levels</strong></h5>
                    <Button variant="success rounded p-1 px-3">
                        <FontAwesomeIcon icon="layer-group" className="mr-1" />New
                    </Button>
                </Card.Header>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="umpire-levels">
                        {provided => (
                            <Card.Body
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className="p-0"
                            >
                                {formatted_levels}
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