import React, { useState, useEffect } from "react"

import { useDisplay } from "common/hooks"

import { Alert } from "react-bootstrap"

export default function TimerAlert(props) {

    const [Display, setDisplay] = useDisplay()

    const [show, setShow] = useState(true)

    useEffect(() => {
        setTimeout(() => setShow(false), props.delay ? props.delay : 3000)
    }, [props.delay])

    useEffect(() => {
        if (!show) {
            setDisplay({ ...Display, alert: null })
        }
    })

    return (
        <Alert
            {...props}
            show={show}
            onClose={() => setShow(false)}
            style={{
                position: "absolute",
                width: "100%",
                opacity: .8,
                zIndex: 1000
            }}
            dismissible >
            {props.children}
        </Alert>
    )
}
