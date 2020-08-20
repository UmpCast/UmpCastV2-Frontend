import React, { Fragment } from "react"

import { TextInput } from "common/Input"

import { Modal, Button } from "react-bootstrap"

const TitleInput = ({ setShow, action, confirm, formik, ...props }) => {
    return (
        <Fragment>
            <Modal.Header closeButton className="no-border py-3">
                <Modal.Title>{action}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="no-border py-0">
                <TextInput
                    name="title"
                    type="text"
                    className="rounded"
                    {...props}
                />
            </Modal.Body>
            <Modal.Footer className="no-border pt-0">
                <Button
                    type="button"
                    variant="secondary rounded py-1"
                    onClick={() => setShow(false)}>
                    Cancel
                </Button>
                <Button
                    disabled={formik.isSubmitting}
                    type="submit"
                    variant="primary rounded py-1">
                    {confirm}
                </Button>
            </Modal.Footer>
        </Fragment>
    )
}

export default TitleInput