function UserBubble({ member }) {
    if (!member) return (
        <div>
            <div className="rounded-full w-9 h-9 bg-amber-400"></div>
            <p>User</p>
        </div>
    )

    return (
        <div className="flex flex-col items-center">
            <div className="rounded-full w-9 h-9 bg-amber-400"></div>
            <p>{member.name}</p>
        </div>
    )
}

export default UserBubble