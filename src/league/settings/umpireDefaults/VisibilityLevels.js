import React, { useState } from 'react'
import arrayMove from "array-move"

import useUser from "hooks"
import basicApi from "promises"

import CreateLevel from "./CreateLevel"
import Level from "./Level"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Card, Button } from "react-bootstrap"
import { DragDropContext, Droppable } from "react-beautiful-dnd"

export default function UmpireLevels(props) {

    const { token } = useUser()[0]
    const { league } = props

    const useShow = useState(false)
    const setShow = useShow[1]

    const useLevels = useState(league.levels)
    const [levels, setLevels] = useLevels

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

        basicApi(
            `api/levels/${levels[start].pk}/move/`,
            { token: token, data: { order: end } },
            "PATCH"
        )
    }

    const formatted_levels = levels && levels.map((level, index) =>
        <Level
            level={level}
            useLevels={useLevels}
            league={league}
            onChange={onChange}
            index={index}
            pk={level.pk}
            key={level.pk} />
    )

    return (
        <div className="mt-4">
            <Card className="border-0 mb-3">
                <Card.Header className="border d-inline-flex p-2 px-3">
                    <h5 className="my-auto mr-auto"><strong>Umpire Levels</strong></h5>
                    <Button variant="success rounded p-1 px-3" onClick={() => setShow(true)}>
                        <FontAwesomeIcon icon="layer-group" className="mr-1" />New
                    </Button>
                    <CreateLevel useShow={useShow} useLevels={useLevels} league_pk={league.pk} />
                </Card.Header>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="umpire-levels">
                        {provided => (
                            <Card.Body
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className="p-0">
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