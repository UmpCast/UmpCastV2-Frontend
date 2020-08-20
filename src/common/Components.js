import CustomToggle from "common/component/CustomToggle"
import FocusContainer from "common/component/FocusContainer"
import PageNav from "common/component/PageNav"
import ProfilePicture from "common/component/ProfilePicture"
import SettingsHeader from "common/component/SettingsHeader"
import SettingsNav from "common/component/SettingsNav"
import TimerAlert from "common/component/TimerAlert"

export {
    CustomToggle,
    FocusContainer,
    PageNav,
    ProfilePicture,
    SettingsHeader,
    SettingsNav,
    TimerAlert
}

export default function Loader({ dep, children }) {
    if (Array.isArray(dep)) {
        for (const cond of dep) {
            if (!cond) return null
        }
    } else {
        if (!dep) return null
    }
    return children
}