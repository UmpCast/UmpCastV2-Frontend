import React from 'react'
import axios from "axios"
import { Formik } from "formik"
import * as Yup from "yup"

import useUser, { useApi } from "common/hooks"

import { formatPhone } from "common/Input"
import { ProfilePicture } from "common/components"
import { myUrl, config } from "common/Api"

import darkBaseball from "assets/dark_baseball.png"

import UserSettingsNav from "../UserSettingsNav"
import ProfileForm from "./ProfileForm"
import NewPfpButton from "./NewPfpButton"

import { Row, Col } from "react-bootstrap"

export default function UserProfile() {

    const Api = useApi(updateProfile)
    const [User, setUser] = useUser(true)

    const { user, token } = User
    const pk = user.pk
    const src = user.profile_picture

    const onSubmit = (values, { setSubmitting, setErrors }) => {

        let new_values = values

        const { phone_number } = new_values

        if (phone_number === "") {
            delete new_values.phone_number
        } else {
            new_values.phone_number = phone_number.replace(/\D/g, '')
        }

        Api.Submit(() =>
            Api.updateProfile(pk, new_values)
        )
            .then(res =>
                setUser({
                    ...User,
                    user: res.data
                })
            )
            .catch(err => {
                const errors = err.response.data

                setErrors(errors)
            })
            .finally(() =>
                setSubmitting(false)
            )
    }

    const handlePfpSubmit = (file) => {

        let bodyFormData = new FormData()
        bodyFormData.append("profile_picture", file)

        return Api.Submit(
            () => axios.patch(
                myUrl(`api/users/${pk}/`),
                bodyFormData,
                config(token, null, "multipart/form-data")
            ))
            .then(res =>
                setUser({ ...User, user: res.data }))
    }

    return (
        <UserSettingsNav active="profile">
            <h3><strong>User Profile</strong></h3>
            <hr className="my-3" />
            <Row>
                <Col lg="8" className="pr-5">
                    <Row className="mb-4">
                        <Col>
                            <h5><strong>Edit Details</strong></h5>
                            <Formik
                                initialValues={initialValues(user)}
                                validationSchema={validationSchema}
                                onSubmit={onSubmit}
                                validateOnChange={false}
                                validateOnBlur={false}>
                                {ProfileForm}
                            </Formik>
                        </Col>
                    </Row>
                </Col>
                <Col lg="4">
                    <Row className="mr-0">
                        <Col className="d-inline-flex">
                            <h5 className="mb-3 mr-auto">
                                <strong>Profile Picture</strong>
                            </h5>
                            <NewPfpButton
                                handleSubmit={handlePfpSubmit} />
                        </Col>
                    </Row>
                    <Row className="mr-0">
                        <Col>
                            <ProfilePicture
                                className="img-thumbnail rounded-circle"
                                src={src}
                                alt={darkBaseball} />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </UserSettingsNav>
    )
}

const initialValues = (user) => {
    const { first_name, last_name, email, phone_number } = user

    return (
        {
            first_name: first_name,
            last_name: last_name,
            email: email,
            phone_number: formatPhone(phone_number)
        }
    )
}

const validationSchema =
    Yup.object({
        first_name: Yup.string()
            .max(32, "first name has max of 32 characters")
            .required('required'),
        last_name: Yup.string()
            .max(32, "last name has max of 32 characters")
            .required('required'),
        email: Yup.string()
            .max(30, "email has max of 32")
            .email('Invalid email address')
            .required('Required'),
        phone_number: Yup.string()
            .min(12, "Ensure this is a 10-digit number")
            .max(12, "Ensure this is a 10-digit number")
    })

const updateProfile = (user_pk, values) => [
    "api/users/",
    {
        pk: user_pk,
        data: values
    }
]