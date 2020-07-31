import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import { Formik, Form as FormikForm } from "formik"
import * as Yup from "yup"

import useUser from "hooks"
import { TextInput } from "tools/Input"

import { Nav, Alert, Modal, Button } from "react-bootstrap"

export const FocusContainer = (props) => (
    <div className="d-flex
                    align-items-center
                    justify-content-center"
        style={{ "height": "80vh" }}>
        {props.children}
    </div>
)

export const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <div ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}>
        {children}
    </div>
));

export const SettingsNavHeader = (props) => {

    const { icon, title, footer } = props
    return (
        <Nav.Item >
            <Nav.Link eventKey="disabled" className="bg-light text-secondary border ump-border-rounded-top disabled">
                <div className="d-inline-flex justify-content-center">
                    {icon && <div className="d-inline-flex flex-wrap bg-secondary rounded p-1 mr-2 mt-1">{icon}</div>}
                    <div className="my-auto d-flex flex-column">
                        <div className="my-auto flex-shrink-0">
                            <p className="mb-0"><strong>{title}</strong></p>
                        </div>
                        {footer && <small className="text-muted" style={{ "lineHeight": .5 }} >{footer}</small>}
                    </div>
                </div>
            </Nav.Link>
        </Nav.Item >
    )
}

export const formatSettingsNavs = (active, subjects, toPath) => {
    return subjects.map(subject => {
        const subject_caps = subject.charAt(0).toUpperCase() + subject.slice(1)
        return (
            <Nav.Item key={subject}>
                <Nav.Link
                    as={Link}
                    to={toPath(subject)}
                    className={`text-muted rounded-0 ump-border-top-0 ${active === subject ? "active" : null}`}
                >
                    {subject_caps}
                </Nav.Link>
            </Nav.Item>
        )
    })
}

export const MyAlert = props => {

    const [User, setUser] = useUser()

    const [show, setShow] = useState(true)

    useEffect(() => {
        setTimeout(() => setShow(false), props.delay ? props.delay : 3000)
    }, [props.delay])

    useEffect(() => {
        if (!show) {
            setUser({ ...User, alert: null })
        }
    })

    return (
        <Alert {...props} show={show} onClose={() => setShow(false)} dismissible style={{ "position": "absolute", "width": "100%", "opacity": .8, "zIndex": 1000 }}>
            {props.children}
        </Alert>
    )
}

export const setAlert = (useUser, res) => {

    const [User, setUser] = useUser

    setUser({
        ...User,
        alert:
            <MyAlert variant={res.variant} className="mb-0">
                {res.msg}
            </MyAlert>
    })
}

export const InputConfirm = props => {

    const { action, consequences, action_text, confirm_text, useShow, onConfirm } = props

    const [show, setShow] = useShow

    const initialValues = {
        title: ""
    }

    const validationSchema =
        Yup.object({
            title: Yup.string()
                .matches(confirm_text)
                .required()
        })

    return (
        <Modal show={show} onHide={() => setShow(false)}>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={() => { }}
            >
                {formik => (
                    <FormikForm noValidate>
                        <div onClick={e => e.stopPropagation()}>
                            <Modal.Header closeButton className="py-3">
                                <p className="my-auto"><strong>{action}</strong></p>
                            </Modal.Header>
                        </div>
                        {consequences ?
                            <Modal.Body>
                                {consequences}
                            </Modal.Body> : null}
                        <Modal.Footer>
                            <TextInput
                                label={<span>Please type <strong>{confirm_text}</strong> to confirm.</span>}
                                name="title"
                                type="text"
                                className="rounded"
                                groupClass="w-100"
                                noError
                            />
                            <Button
                                type="button"
                                disabled={!formik.isValid || !formik.dirty}
                                onClick={onConfirm}
                                variant="primary rounded py-1"
                                block
                            >
                                {action_text}
                            </Button>
                        </Modal.Footer>
                    </FormikForm>
                )}
            </Formik>
        </Modal>
    )
}

export const BasicConfirm = props => {

    const { action, consequences, action_text, useShow, onConfirm } = props

    const [show, setShow] = useShow

    return (
        <Modal show={show} size="sm">
            <Modal.Header className="py-3 no-border">
                <h5 className="my-auto mx-auto"><strong>{action}</strong></h5>
            </Modal.Header>
            {consequences ? <Modal.Body className="text-center no-border py-0">{consequences}</Modal.Body> : null}
            <Modal.Footer className="no-border">
                <div className="mx-auto" onClick={e => e.stopPropagation()}>
                    <Button
                        type="button"
                        onClick={() => setShow(false)}
                        variant="secondary rounded py-1 mr-2"
                    >
                        Cancel
                        </Button>
                    <Button
                        type="button"
                        onClick={onConfirm}
                        variant="primary rounded py-1"
                    >
                        {action_text}
                    </Button>
                </div>
            </Modal.Footer>
        </Modal>
    )
}