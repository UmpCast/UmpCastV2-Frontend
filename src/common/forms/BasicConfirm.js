import React from "react"

import { Modal, Button } from "react-bootstrap"

const BasicConfirm = props => {

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

export default BasicConfirm