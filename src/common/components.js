import AppPicture from "common/component/AppPicture"
import CustomToggle from "common/component/CustomToggle"
import FocusContainer from "common/component/FocusContainer"
import NewPfpButton from "common/component/NewPfpButton"
import NotifsPage from "common/component/NotifsPage"
import PageNav from "common/component/PageNav"
import ProfilePicture from "common/component/ProfilePicture"
import SettingsHeader from "common/component/SettingsHeader"
import SettingsNav from "common/component/SettingsNav"
import TimerAlert from "common/component/TimerAlert"
import ToolTip from "common/component/ToolTip"

export {
    AppPicture,
    CustomToggle,
    FocusContainer,
    NewPfpButton,
    NotifsPage,
    PageNav,
    ProfilePicture,
    SettingsHeader,
    SettingsNav,
    TimerAlert,
    ToolTip
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