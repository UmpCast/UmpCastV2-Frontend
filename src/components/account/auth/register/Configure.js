import React from "react"

import useUser, { useApi } from "common/hooks"

import { FocusContainer } from "common/components"

import { Card, Row, Col, Button } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Configure = () => {

    const Api = useApi(requests)
    const [User, setUser] = useUser(true)

    const { user } = User

    const onClick = (config) => {
        Api.configureUser(user.pk, config)
            .then(res =>
                setUser({
                    ...User,
                    isConfigured: true,
                    user: res.data
                })
            )
    }

    return (
        <FocusContainer>
            <Card
                className="mt-5 mb-5 p-4"
                style={{ "width": "500px" }}>
                <Card.Body>
                    <h2 className="text-center">
                        How will you use UmpCast?
                    </h2>

                    <Row className="mt-1">
                        <Col sm={12} md={6} className="p-3">
                            <ConfigureButton
                                config="umpire"
                                icon={
                                    <FontAwesomeIcon
                                        icon="baseball-ball"
                                        className="mr-3" />
                                }
                                onClick={() => onClick("umpire")}
                            />
                        </Col>

                        <Col sm={12} md={6} className="p-3">
                            <ConfigureButton
                                config="manager"
                                icon={
                                    <FontAwesomeIcon
                                        icon="user"
                                        className="mr-3" />
                                }
                                onClick={() => onClick("manager")}
                            />
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </FocusContainer>
    )
}

const ConfigureButton = ({ config, icon, onClick }) => {
    const style = styles[config]

    return (
        <Button
            onClick={() => onClick(config)}
            variant={style.variant}
            className="pt-3 pb-2"
            block>
            <h5 className="font-weight-strong">
                {icon}{style.text}
            </h5>
        </Button>
    )
}

const styles = {
    umpire: {
        variant: "primary",
        text: "As an Umpire"
    },
    manager: {
        variant: "success",
        text: "As a manager"
    }
}

const requests = {
    configureUser: (user_pk, config) => [
        "api/users/",
        {
            pk: user_pk,
            data: {
                account_type: config
            }
        },
        "PATCH"
    ]
}

export default Configure