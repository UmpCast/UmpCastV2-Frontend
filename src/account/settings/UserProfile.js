import React from 'react'
import { Formik, Form as FormikForm } from "formik"
import * as Yup from "yup"

import useUser from "hooks"
import { patchUser } from "account/promises"

import { TextInput, MyPhoneInput, formatPhone } from "tools/Input"
import { includeProps } from "tools/Utils"
import { MyAlert } from "tools/Display"

import ProfilePicture from "./ProfilePicture"
import UserSettingsNav from "./UserSettingsNav"

import { Row, Col, Button } from "react-bootstrap"

export default function UserProfile() {

    const [User, setUser] = useUser()
    const { user, token } = User
    const { pk, first_name, last_name, email, phone_number, profile_picture } = user

    const initialValues = {
        first_name: first_name,
        last_name: last_name,
        email: email,
        phone_number: formatPhone(phone_number)
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

    const onSubmit = (values, { setSubmitting, setErrors }) => {
        
        const myValues = includeProps(values)
        
        const {phone_number} = myValues
        if (phone_number) {
            myValues.phone_number = phone_number.replace(/\D/g,'')
        }

        patchUser({ pk: pk, token: token}, myValues)
            .then(payload => { 
                setSubmitting(false)
                setUser({ ...User, user: payload.User.user, alert:
                    <MyAlert variant="success" className="mb-0">
                        Profile information updated
                    </MyAlert>
                 }) 
            })
            .catch(err => {
                let errors = err.response.data
                setErrors(errors)
                setSubmitting(false)
            })
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
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={onSubmit}
                                validateOnChange={false}
                                validateOnBlur={false}>
                                {formik => (

                                    <FormikForm noValidate>
                                        <TextInput
                                            label="First Name"
                                            name="first_name"
                                            type="text"
                                            className="rounded"
                                        />
                                        <TextInput
                                            label="Last Name"
                                            name="last_name"
                                            type="text"
                                            className="rounded"
                                        />
                                        <TextInput
                                            label="Email"
                                            name="email"
                                            type="email"
                                            className="rounded"
                                        />
                                        <MyPhoneInput
                                            label="Phone Number"
                                            name="phone_number"
                                            type="text"
                                            className="rounded"
                                        />
                                        <Button disabled={formik.isSubmitting} type="submit" className="rounded">
                                            Update Account
                                        </Button>
                                    </FormikForm>
                                )}
                            </Formik>
                        </Col>
                    </Row>
                </Col>
                <Col lg="4">
                    <ProfilePicture link = {profile_picture}/>
                </Col>
            </Row>
        </UserSettingsNav>
    )
}
