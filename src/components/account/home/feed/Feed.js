import React from "react"

import useUser from "common/hooks"

import { NotifsPage } from "common/components"
import Message from "./Message"

export default function Feed() {
    const { pk } = useUser().user

    const fetchNotifs = {
        fetchNotifs: (page) => [
            "api/notifications/",
            {
                pk: pk,
                params: {
                    page,
                    page_size: 10
                }
            }
        ]
}

    return (
        <div className="mt-3">
            <NotifsPage fetchNotifs={fetchNotifs} msgTemplate={Message} />
        </div>
    )
}
