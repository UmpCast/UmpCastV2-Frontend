import React, { Fragment, useState } from 'react'

import ProfileCrop from "common/forms/ProfileCrop"

import { Form, Button } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import 'react-image-crop/dist/ReactCrop.css'

export default function NewPfpButton(props) {

    let inputElement = null

    const { handleSubmit } = props

    const useShow = useState(false)
    const [src, setSrc] = useState()

    const setShow = useShow[1]

    const handleClick = () => {
        inputElement.value = null;
        inputElement.click();
    }

    const handleFile = e => {
        const fileReader = new FileReader()
        if (e.target.files.length > 0) {
            fileReader.readAsDataURL(e.target.files[0])

            fileReader.onloadend = () => {
                setSrc(fileReader.result)
                setShow(true)
            }
        }
    }

    return (
        <Fragment>
            <Form.File
                className="d-none"
                ref={input => inputElement = input}
                onChange={handleFile} />

            <EditButton
                {...{ handleClick }} />

            <ProfileCrop
                src={src}
                useShow={useShow}
                handleSubmit={handleSubmit} />
        </Fragment>
    )
}

const EditButton = ({ handleClick }) => (
    <Button
        className="p-0 px-1 rounded mb-auto"
        onClick={handleClick}>
        New
        <FontAwesomeIcon
            icon="pen"
            className="ml-2 fa-sm" />
    </Button>
)