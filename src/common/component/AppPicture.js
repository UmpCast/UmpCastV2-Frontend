import React from "react"

import useUser from "common/hooks"

import { ToolTip, ProfilePicture } from "common/components"
import { Name } from "common/Utils"

import PrimaryBaseball from "assets/primary_baseball.png"
import DarkBaseball from "assets/dark_baseball.png"
import LightPlus from "assets/light_plus.png"

const AppPicture = ({ casted, role, className, size }) => {

    const { user } = useUser()

    const umpire_name = casted ?
        new Name(casted.user.first_name, casted.user.last_name).fullName:
        "Empty"

    const roleTip = `${role.title}: ${umpire_name}`

    return (
        <ToolTip tip={roleTip}>
            <div className={className}>
                <UmpireImg
                    casted={casted}
                    user={user}
                    size={size} />
            </div>
        </ToolTip>
    )
}

const UmpireImg = ({ casted, user, size }) => {
    if (casted) {
        const { profile_picture, pk } = casted.user

        return (
            <ProfilePicture
                src={profile_picture}
                alt={user.pk === pk ? PrimaryBaseball : DarkBaseball}
                size={size}
                className={`rounded border`} />
        )
    } else {
        return (
            <ProfilePicture
                src={LightPlus}
                size={size}
                className={`rounded border`} />
        )
    }
}

export default AppPicture
