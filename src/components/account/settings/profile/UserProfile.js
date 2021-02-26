import React from 'react'
import axios from "axios"
import { Formik } from "formik"
import * as Yup from "yup"

import useUser, { useApi } from "common/hooks"

import { formatPhone } from "common/Input"
import { myUrl, config } from "common/Api"

import UserSettingsContainer from "../SettingsContainer"
import ProfileForm from "./ProfileForm"
import UpdatePfp from "./UpdatePfp"

import { Row, Col } from "react-bootstrap"

export default function UserProfile() {

    const Api = useApi(requests)
    const [User, setUser] = useUser(true)

    const { user, token } = User
    const pk = user.pk

    const onSubmit = (values, { setSubmitting, setErrors }) => {

        let new_values = Object.assign({}, values)

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
            .catch(err => 
                setErrors(err.response.data)
            )
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
        <UserSettingsContainer active="profile">
            <h3>
                <strong>User Profile</strong>
            </h3>
            <hr className="my-3" />
            <Row>
                <Col lg="8" className="pr-lg-5">
                    <Row className="mb-5">
                        <Col>
                            <h5>
                                <strong>Edit Details</strong>
                            </h5>
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
                <Col>
                    <UpdatePfp
                        src={user.profile_picture}
                        handlePfpSubmit={handlePfpSubmit} />
                </Col>
            </Row>
        </UserSettingsContainer>
    )
}

const initialValues = (user) => {
    const { first_name, last_name, email, phone_number } = user

    return (
        {
            first_name,
            last_name,
            email,
            phone_number: formatPhone(phone_number)
        }
    )
}

const validationSchema =
    Yup.object({
        first_name: Yup.string()
            .max(255, "Too Long!")
            .required('Required!'),
        last_name: Yup.string()
            .max(255, "Too Long!")
            .required('Required!'),
        email: Yup.string()
            .max(255, "Too Long!")
            .email('Invalid email!')
            .required('Required!'),
        phone_number: Yup.string()
            .min(12, "Must be 10 digits!")
            .max(12, "Must be 10 digits!")
    })


const requests = {
    updateProfile: (user_pk, values) => [
        "api/users/",
        {
            pk: user_pk,
            data: values
        },
        "PATCH"
    ]
}