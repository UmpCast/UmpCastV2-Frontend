import React, { Fragment, useState } from 'react'

import ProfileCrop from "tools/forms/ProfileCrop"

import { Form, Button } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import 'react-image-crop/dist/ReactCrop.css'
export default function ProfilePicture(props) {

    const { link } = props

    const [src, setSrc] = useState(link)
    const [newSrc, setNewSrc] = useState(null)

    const useShow = useState(false)
    const setShow = useShow[1]

    let inputElement = null
    const handleClick = () => {
        inputElement.value = null;
        inputElement.click();
    }

    const handleFile = e => {
        const fileReader = new FileReader()
        if (e.target.files.length > 0) {
            fileReader.readAsDataURL(e.target.files[0])
            fileReader.onloadend = () => {
                setNewSrc(fileReader.result)
                setShow(true)
            }
        }
    }

    return (
        <Fragment>
            <div className="d-inline-flex w-100">
                <h5 className="mb-3 mr-auto">
                    <strong>Profile Picture</strong>
                </h5>
                <ProfileCrop useShow={useShow} newSrc={newSrc} setSrc={setSrc} />
                <Form.File className="d-none" ref={input => inputElement = input} onChange={handleFile} />
                <Button className="p-0 px-1 rounded mb-auto" onClick={handleClick}>
                    Edit<FontAwesomeIcon icon="pen" className="ml-2 fa-sm" />
                </Button>
            </div>
            {
                src ?
                    <img src={src} alt="Your Profile" className="rounded border-secondary-thick pfp-square" /> :
                    <div className="px-3 py-1">
                        <FontAwesomeIcon icon={["fas", "baseball-ball"]} transform={{ rotate: 30 }}
                            className="rounded text-white bg-dark pfp-square p-4"
                        />
                    </div>
            }
        </Fragment>
    )
}