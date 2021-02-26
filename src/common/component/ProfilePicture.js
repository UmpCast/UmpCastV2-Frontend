import React from "react"

const ProfilePicture = ({ src, className, size = "100%", alt }) => {

    return (
        <img
            src={src ? src : alt}
            alt="Profile"
            className={className}
            style={{ width: size, height: size}}
        />
    )
}

export default ProfilePicture