import React from "react"

import useUser from "common/hooks"

import { ProfilePicture } from "common/components"
import PrimaryBaseball from "assets/primary_baseball.png"
import DarkBaseball from "assets/dark_baseball.png"
import LightPlus from "assets/light_plus.png"

const AppPicture = ({ casted, className, size }) => {

    const { user } = useUser()

    if (casted) {
        const { profile_picture, pk } = casted.user

        return (
            <ProfilePicture
                src={profile_picture}
                alt={user.pk === pk ? PrimaryBaseball : DarkBaseball}
                size={size}
                className={`rounded border ${className}`} />
        )
    } else {
        return (
            <ProfilePicture
                src={LightPlus}
                size={size}
                className={`rounded border ${className}`} />
        )
    }
}

export default AppPicture