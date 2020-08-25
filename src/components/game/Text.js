export const CancelAppConseq = ({ status }) => (
    status === "Cast" ?
        "Manger's will be notified. The next umpire in-line will replace your cast." :
        "You will be removed from the backup line for this role."
)

export const GameSignupConseq = ({ order }) => (
    order === 0 ?
        "You will be casted for this role, and expected to appear at the game." :
        "You will be a backup for this role."
)
