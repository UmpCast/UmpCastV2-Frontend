import React from "react";

import useUser from "common/hooks"

import { NotifsPage } from "common/components"
import Message from "./Message"

export default function Feed() {

    const { pk } = useUser().user

    const fetchNotifs = page => [
        "api/notifications/",
        {
            pk: pk,
            params: {
                page,
                page_size: 1
            }
        },
    ]

    return (
        <NotifsPage
            fetchNotifs={fetchNotifs}
            msgTemplate={Message} />
    )
}