import React from "react"
import arrayMove from "array-move"
import { DragDropContext, Droppable } from "react-beautiful-dnd"

import { useApi } from "common/hooks"
import DivisionCard from "./DivisionCard"

import { Col } from "react-bootstrap"

export default function Divisions({ useLeague, handleDeleteDivision }) {
    const [league, setLeague] = useLeague
    const { divisions } = league

    const Api = useApi(requests)

    const onDragEnd = (result) => {
        const { destination, source } = result

        if (!destination || !source) return

        const start = source.index
        const end = destination.index

        if (start === end) return

        Api.Submit(() => Api.reorderDivision(league.divisions[start].pk, end))

        setLeague({
            ...league,
            divisions: arrayMove(divisions, start, end)
        })
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="league-divisions">
                {(provided) => (
                    <Col
                        className="mt-3"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        <ListDivisions
                            league={league}
                            handleDeleteDivision={handleDeleteDivision}
                        />
                        {provided.placeholder}
                    </Col>
                )}
            </Droppable>
        </DragDropContext>
    )
}

const ListDivisions = ({ league, handleDeleteDivision }) =>
    league.divisions.map((division, index) => (
        <DivisionCard
            handleDeleteDivision={handleDeleteDivision}
            division={division}
            index={index}
            key={division.pk}
        />
    ))

const requests = {
    reorderDivision: (division_pk, end) => [
        `api/divisions/${division_pk}/move/`,
        {
            data: {
                order: end
            }
        },
        "PATCH"
    ]
}
