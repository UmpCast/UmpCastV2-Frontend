import React from "react"

export const LeagueSyncFeatures = () => (
    <span>
        Umpcast will be able to transfer all existing divisions and games from your account,
        while keeping up-to-date with any changes
    </span>
)

export const SyncDivisionConseq = ({ league, division }) => (
    <span>
        <strong>{division.title}</strong>, and all associated games, will be synced
        from Teamsnap onto <strong>{league.title}'s</strong> UmpCast calendar.
    </span>
)

export const UnsyncDivisionConseq = ({ division }) => (
    <span>
        Deleting <strong>{division.title}</strong> will also delete all associated games,
        including games already with signups. Past games and signup history will be
        preserved.
    </span>
)

export const DeleteRoleConseq = ({ division }) => (
    <span>
        This role will be removed from all current games and umpires will be notified.
            It will no longer be included for any future <strong>{division.title}</strong>
            games
    </span>
)

export const UserJoinDescription = ({account_type}) => {
    const action = account_type === "umpire" ?
    " signup for league games, you can request to join as an umpire.":
    " manage umpire signups, you can request to join as a manager."
    return (
        <span>
            You currently aren't associated with this league. To view league details and 
            {action}
        </span>
    )
}

export const JoinRequestPending = () => (
    <span>
        Sit tight! Your join request has been sent and will be reviewed by Palo Alto
        Little League. We will let you know when they respond.
    </span>
)

export const JoinRequestAccepted = ({account_type}) => {
    const action = account_type === "umpire" ?
    "What are you still waiting here for? Go signup for some games!" :
    "Please head to your league home page."

    return (
        <span>
            Congratulations! You've already been accepted into this league. {action}
        </span>
    )
}

export const JoinRequestRejected = () => (
    <span>
        A league manager has decided to dismiss your join request. If you believe this
        was a mistake, please contact a manager to reopen your request.
    </span>
)
