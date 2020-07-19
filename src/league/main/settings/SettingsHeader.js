import React from 'react'

export default function SettingsHeader(props) {
    return (
        <div>
            <h3><strong>{props.title}</strong></h3>
            <hr class="my-3"/>
        </div>
    )
}
