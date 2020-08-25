import React from 'react'

import { Button } from "react-bootstrap"

export default function SubmitButtons({ formik, setShow }) {
    return (
        <div className="d-inline-flex w-100 justify-content-end">
            <CancelRoleButton
                setShow={setShow} />
            <CreateRoleButton
                submitting={formik.isSubmitting} />
        </div>
    )
}

const CancelRoleButton = ({ setShow }) => (
    <Button
        size="sm"
        variant="secondary rounded mb-auto mr-2"
        type="button"
        onClick={() => setShow(false)}>
        Cancel
    </Button>
)

const CreateRoleButton = ({ submitting }) => (
    <Button
        size="sm"
        variant="primary rounded mb-auto"
        disabled={submitting}
        type="submit">
        Create
    </Button>
)