import React from 'react'
import dayjs from "dayjs"
import localizedFormat from "dayjs/plugin/localizedFormat"

import { useApi } from "common/hooks"

import { Button } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

dayjs.extend(localizedFormat)

export default function PendingRow(props) {

    const { status, usePending } = props

    const { pk, user, date_pending } = status
    const [pending, setPending] = usePending

    const Api = useApi(requests)

    const onClick = (status) => {
        Api.Submit(() =>
            Api.decideUls(pk, `${status}ed`)
        ).then(() =>
            setPending({
                ...pending,
                count: pending.count - 1,
                results: pending.results.filter(
                    status => status.pk !== pk
                )
            })
        )
    }

    return (
        <tr className="border-top">
            <td>
                <div className="d-inline-flex w-100 justify-content-between">
                    <UserProfile
                        {...{ user }} />

                    <RequestDate
                        {...{ date_pending }} />

                    <div className="d-inline-flex rounded mr-2">
                        <h6 className="my-auto mr-2">
                            <strong>
                                {user.account_type}
                            </strong>
                        </h6>
                        <AcceptButton
                            {...{ onClick }} />
                        <RejectButton
                            {...{ onClick }} />
                    </div>
                </div>
            </td>
        </tr>
    )
}

const UserProfile = ({ user }) => {
    const { first_name, last_name } = user

    const name = (
        first_name.charAt(0).toUpperCase() + first_name.slice(1) + " " +
        last_name.charAt(0) + "."
    )

    return (
        <div className="d-inline-flex">
            <div className="d-inline-flex flex-wrap bg-primary rounded p-1 mr-2 my-auto">
                <FontAwesomeIcon
                    className="text-white fa-1x"
                    transform={{ rotate: 30 }}
                    icon={['fas', 'baseball-ball']} />
            </div>
            <div className="my-auto flex-shrink-0">
                <h5 className="mb-0">
                    <strong>
                        {name}
                    </strong>
                </h5>
            </div>
        </div>
    )
}

const RequestDate = ({ date_pending }) => (
    <small className="text-muted my-auto">
        submitted {dayjs(date_pending).format("ll")}
    </small>
)

const AcceptButton = ({ onClick }) => (
    <Button
        variant="outline-success rounded p-0 mr-2"
        onClick={() => onClick("accept")}>
        <FontAwesomeIcon
            style={{ "margin": "0px 3px" }}
            icon={['fas', 'check']} />
    </Button>
)

const RejectButton = ({ onClick }) => (
    <Button
        variant="outline-danger rounded p-0 px-1"
        onClick={() => onClick("reject")}>
        <FontAwesomeIcon
            style={{ "margin": "0px 1px" }}
            icon={['fas', 'times']} />
    </Button>
)

const requests = {
    decideUls: (league_pk, status) => [
        "api/user-league-status/",
        {
            pk: league_pk,
            data: {
                request_status: status
            }
        },
        "PATCH"
    ]
}
