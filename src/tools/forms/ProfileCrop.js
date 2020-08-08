import React, { useState } from 'react'
import axios from "axios"
import ReactCrop from "react-image-crop"

import useUser, { useDisplay, ApiSubmit } from "hooks"
import { myUrl, config } from "tools/Api"

import { Button, Modal } from "react-bootstrap"

export default function ProfileCrop(props) {

    const myUser = useUser()
    const [User, setUser] = myUser
    const { token, user } = User
    const { pk } = user

    const myDisplay = useDisplay()

    const { useShow, newSrc, setSrc } = props
    const [show, setShow] = useShow

    const [imageRef, setImageRef] = useState(null)
    const [crop, setCrop] = useState(null)

    const onLoad = img => {
        setImageRef(img)
        setCrop(defaultCrop(img))
        return false
    }

    const handleCropChange = (crop) => {
        setCrop(crop)
    }

    const onSubmit = () => {

        getCroppedImg(imageRef, crop)
            .then(file => {
                let bodyFormData = new FormData()
                bodyFormData.append("profile_picture", file)

                return ApiSubmit(myDisplay, () => axios.patch(
                    myUrl(`api/users/${pk}/`),
                    bodyFormData,
                    config(token, null, "multipart/form-data")
                ))
            })
            .then(res => {
                setShow(false)
                setSrc(res.data.profile_picture)
                setUser({...User, user: res.data})
            })
    }

    return (
        <Modal show={show} onHide={() => setShow(false)}>
            <div onClick={e => e.stopPropagation()}>
                <Modal.Header closeButton className="py-3">
                    Crop your Profile Picture
                </Modal.Header>
            </div>
            <Modal.Body className="d-flex justify-content-center">
                <ReactCrop
                    src={newSrc}
                    crop={crop}
                    onChange={handleCropChange}
                    onImageLoaded={onLoad}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary rounded" onClick={onSubmit} block>Update Profile Picture</Button>
            </Modal.Footer>
        </Modal>
    )
}

const defaultCrop = img => {

    const {width, height} = img
    const length = width < height ? width : height

    return {
        unit: 'px',
        width: length,
        height: length,
        x: (width - length) / 2,
        y: (height - length) / 2,
        aspect: 1
    }
}

const getCroppedImg = (image, crop) => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;

    const ctx = canvas.getContext("2d");

    ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
    )

    const reader = new FileReader()

    return new Promise(resolve => {
        canvas.toBlob(blob => {
            reader.readAsDataURL(blob)
            reader.onloadend = () => {
                resolve(dataURLtoFile(reader.result, 'profile.jpg'))
            }
        })
    })
}

const dataURLtoFile = (dataurl, filename) => {
    let arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    let croppedImage = new File([u8arr], filename, { type: mime });
    return croppedImage
}