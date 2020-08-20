import React from "react"

import { Pagination } from "react-bootstrap"

export default function PageNav(props) {

    const { list, setPage, page_size } = props

    const { page_number, count } = list
    const num_pages = Math.ceil(count / page_size)

    const isFirst = page_number === 1
    const isLast = page_number === num_pages

    const pages = []

    for (let i = 1; i <= num_pages; i++) {
        const active = i === page_number

        pages.push(
            <Pagination.Item
                active={active}
                key={i}
                onClick={() => setPage(i)}>
                {i}
            </Pagination.Item>
        )
    }

    return (
        <Pagination className="mx-auto">
            <Pagination.Prev
                disabled={isFirst}
                onClick={() => setPage(page_number - 1)} />
            {pages}
            <Pagination.Next
                disabled={isLast}
                onClick={() => setPage(page_number + 1)} />
        </Pagination>
    )
}