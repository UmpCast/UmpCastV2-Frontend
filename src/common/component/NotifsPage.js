import React, { useState, createElement, useEffect } from "react"

import { useApi, useMountEffect } from "common/hooks"

import Loader from "common/components"

import { Col } from "react-bootstrap"

export default function NotifsPage({
    fetchNotifs,
    msgTemplate,
    useReset,
    processNotifs = ({ results }) => results
}) {
    const Api = useApi(fetchNotifs)

    const [notifs, setNotifs] = useState()

    useMountEffect(() => {
        Api.fetchNotifs().then((res) => setNotifs(res.data))
    })

    useEffect(() => {
        if (!useReset) return

        const [reset, setReset] = useReset

        if (reset) {
            Api.fetchNotifs()
                .then((res) => setNotifs(res.data))
                .finally(() => setReset(false))
        }
    }, [Api, useReset, processNotifs])

    const onNext = (page_number) => {
        Api.fetchNotifs(page_number).then((res) => {
            const new_notifs = res.data

            const new_results = notifs.results.concat(new_notifs.results)

            setNotifs({
                ...new_notifs,
                results: new_results
            })
        })
    }

    return (
        <Loader dep={notifs}>
            <ListNotifs
                processNotifs={processNotifs}
                notifs={notifs}
                msgTemplate={msgTemplate}
            />
            <NextPage notifs={notifs} onNext={onNext} />
        </Loader>
    )
}

const ListNotifs = ({ notifs, msgTemplate, processNotifs }) =>
    processNotifs(notifs).map((notif) =>
        createElement(msgTemplate, { msg: notif, key: notif.pk })
    )

export const NextPage = ({ notifs, onNext }) => {
    const { results, count, page_number } = notifs
    const atEnd = results.length === count

    return (
        <Col>
            {atEnd ? (
                <p className="text-muted text-center">End of List</p>
            ) : (
                <p
                    className="text-primary text-center"
                    style={{ cursor: "pointer" }}
                    onClick={() => onNext(page_number + 1)}
                >
                    <u>View more</u>
                </p>
            )}
        </Col>
    )
}
