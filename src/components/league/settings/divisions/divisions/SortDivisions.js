import React from 'react'
import arrayMove from "array-move"
import { DragDropContext, Droppable } from "react-beautiful-dnd"

import { useApi } from "common/hooks"
import DivisionCard from "./DivisionCard"

import { Col } from "react-bootstrap"

export default function Divisions({ useLeague }) {

    const [league, setLeague] = useLeague
    const { divisions } = league

    const Api = useApi(reorderDivision)

    const onDragEnd = result => {
        const { destination, source } = result

        const start = source.index
        const end = destination.index

        if (start === end) return

        Api.Submit(() =>
            Api.reorderDivision(league.divisions[start].pk, end)
        )

        setLeague({
            ...league,
            divisions: arrayMove(divisions, start, end)
        })
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="league-divisions">
                {provided => (
                    <Col
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        xs={6}>
                        <ListDivisions league={league} />
                        {provided.placeholder}
                    </Col>
                )}
            </Droppable>
        </DragDropContext>
    )
}

const ListDivisions = ({ league }) => (
    league.divisions.map((division, index) =>
        <DivisionCard
            division={division}
            index={index}
            key={division.pk}
        />
    )
)

const reorderDivision = (division_pk, end) => [
    `api/divisions/${division_pk}/move/`,
    {
        data: {
            order: end
        }
    },
    "PATCH"
]