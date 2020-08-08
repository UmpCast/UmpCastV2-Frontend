import React from 'react'
import dayjs from "dayjs"
import localizedFormat from "dayjs/plugin/localizedFormat"

import useUser, {useDisplay, ApiSubmit} from "hooks"
import basicApi from "promises"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button } from "react-bootstrap"

dayjs.extend(localizedFormat)

export default function PendingRow(props) {

    const myUser = useUser()
    const { token } = myUser[0]

    const myDisplay = useDisplay()

    const { status, usePending } = props
    const [pending, setPending] = usePending

    const { pk, user, date_pending } = status
    const { first_name, last_name } = user

    const onClick = (status) => {

        ApiSubmit(myDisplay, () => basicApi(
            "api/user-league-status/",
            { pk: pk, token: token, data: { request_status: `${status}ed` } },
            "PATCH"
        )).then(() => setPending({
            ...pending, 
            count: pending.count - 1, 
            results: pending.results.filter(status => status.pk !== pk)
        }))
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
                    <div className="d-inline-flex rounded mr-2">
                        <h6 className="my-auto mr-2"><strong>{user.account_type}</strong></h6>
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
