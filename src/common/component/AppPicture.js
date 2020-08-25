import React from "react"

import { ProfilePicture } from "common/components"
import PrimaryBaseball from "assets/primary_baseball.png"
import LightPlus from "assets/light_plus.png"

const AppPicture = ({ app, className, size }) => {
    return app ?
        <ProfilePicture
            src={app.user.profile_picture}
            alt={PrimaryBaseball}
            size={size}
            className={`rounded border ${className}`} />
        : <ProfilePicture
            src={LightPlus}
            size={size}
            className={`rounded border ${className}`} />
}

export default AppPicture