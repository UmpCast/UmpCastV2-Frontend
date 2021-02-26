import React, { useState } from 'react'
import arrayMove from "array-move"
import { DragDropContext, Droppable } from "react-beautiful-dnd"

import { useApi } from "common/hooks"

import CreateLevel from "./CreateLevel"
import Level from "./Level"

import { Card, Button } from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function UmpireLevels(props) {

    const { league } = props

    const { divisions } = league

    const Api = useApi(requests)
    const useShow = useState(false)
    const useLevels = useState(league.levels)

    const [, setShow] = useShow
    const [levels, setLevels] = useLevels

    const onChange = new_level => {
        setLevels(
            levels.map(level =>
                level.pk === new_level.pk ? new_level : level
            )
        )
    }

    const onDragEnd = result => {
        const { destination, source } = result

        if (!destination || !source) return

        const start = source.index
        const end = destination.index

        if (start === end) {
            return
        }

        Api.reorderLevel(levels[start].pk, end)
            .then(() =>
                setLevels(arrayMove(levels, start, end)
                )
            )
    }

    return (
        <div className="mt-4">
            <Card className="border-0 mb-3">
                <Card.Header className="border d-inline-flex p-2 px-3">
                    <h5 className="my-auto mr-auto">
                        <strong>Umpire Levels</strong>
                    </h5>
                    <Button
                        variant="success rounded p-1 px-3"
                        onClick={() => setShow(true)}>
                        <FontAwesomeIcon
                            icon="layer-group"
                            className="mr-1" />
                        New
                    </Button>
                    <CreateLevel
                        useShow={useShow}
                        useLevels={useLevels}
                        league_pk={league.pk} />
                </Card.Header>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="umpire-levels">
                        {provided => (
                            <Card.Body
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className="p-0">
                                <ListLevels
                                    useLevels={useLevels}
                                    divisions={divisions}
                                    onChange={onChange}
                                />
                                {provided.placeholder}
                            </Card.Body>
                        )}
                    </Droppable>
                </DragDropContext>
            </Card>
        </div>
    )
}


const ListLevels = props => {
    const { useLevels, divisions, onChange } = props
    const [levels] = useLevels

    return levels.map((level, index) =>
        <Level
            level={level}
            useLevels={useLevels}
            divisions={divisions}
            onChange={onChange}
            index={index}
            key={level.pk} />
    )
}

const requests = {
    reorderLevel: (level_pk, end) => [
        `api/levels/${level_pk}/move/`,
        {
            data: {
                order: end
            }
        },
        "PATCH"
    ]
}