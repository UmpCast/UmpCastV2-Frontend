import React from 'react'
import dayjs from "dayjs"
import localizedFormat from "dayjs/plugin/localizedFormat"

import useUser from "hooks"
import { patchUls } from "promises"
import { setAlert } from "tools/Display"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button } from "react-bootstrap"

dayjs.extend(localizedFormat)

export default function PendingRow(props) {

    const myUser = useUser()
    const { token } = myUser[0]

    const { status, myPending } = props
    const [pending, setPending] = myPending

    const { pk, user, date_pending } = status
    const { first_name, last_name } = user

    const onClick = (status) => {

        const umpire_name = first_name.toUpperCase()

        let res = {}
        patchUls({ pk: pk, token: token }, { request_status: `${status}ed` })
            .then(payload => {
                setPending(pending.filter(status => status.pk !== pk))
                res = {
                    variant: "success",
                    msg: status === "accept" ? `Added ${umpire_name} to league` : `Dismissed ${umpire_name}'s join request`
                }
            })
            .catch(() => res = { variant: "danger", msg: `Unknown Error while ${status}ing ${umpire_name}` })
            .finally(() => setAlert(myUser, res))
    }
    return (
        <tr className="border-top">
            <td>
                <div className="d-inline-flex w-100 justify-content-between">
                    <div className="d-inline-flex">
                        <div className="d-inline-flex flex-wrap bg-primary rounded p-1 mr-2 my-auto">
                            <FontAwesomeIcon
                                className="text-white fa-1x"
                                transform={{ rotate: 30 }}
                                icon={['fas', 'baseball-ball']} />
                        </div>
                        <div className="my-auto flex-shrink-0">
                            <h5 className="mb-0"><strong>{first_name.toUpperCase()} {last_name.slice(0, 1).toUpperCase()}.</strong></h5>
                        </div>
                    </div>
                    <small className="text-muted my-auto">
                        submitted {dayjs(date_pending).format("ll")}
                    </small>
                    <div className="rounded mr-2">
                        <Button variant="outline-success rounded p-0 mr-2" onClick={() => onClick("accept")}>
                            <FontAwesomeIcon
                                style={{ "margin": "0px 3px" }}
                                icon={['fas', 'check']} />
                        </Button>
                        <Button variant="outline-danger rounded p-0 px-1" onClick={() => onClick("reject")}>
                            <FontAwesomeIcon
                                style={{ "margin": "0px 1px" }}
                                icon={['fas', 'times']} />
                        </Button>
                    </div>
                </div>
            </td>
        </tr>
    )
}
