import React from "react"
import { Formik, Form as FormikForm } from "formik"
import * as Yup from "yup"

import { TextInput } from "common/Input"

import { Modal, Button } from "react-bootstrap"

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

export default InputConfirm