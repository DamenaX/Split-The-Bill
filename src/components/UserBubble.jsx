import genericProfile from "../assets/profile-pictures/2.jpg"
function getInitials(name = "") {
    const parts = name.trim().split(" ").filter(Boolean);
    if (!parts.length) return "";
    if (parts.length === 1) return parts[0][0]?.toUpperCase() || "";
    return `${parts[0][0] || ""}${parts[1][0] || ""}`.toUpperCase();
}

function UserBubble({ member, width="10.5", height="10", hidden=""}) {

    // if (!member) {
    //     return (
    //         <div className="flex flex-col items-center">
    //             <div className="flex items-center justify-center rounded-full w-10 h-10 bg-amber-400 text-xs font-semibold text-white">
    //                 U
    //             </div>
    //             <p className="mt-1 text-xs font-medium text-slate-700">User</p>
    //         </div>
    //     );
    // }

    // const initials = getInitials(member.name);

    
    return (
        <div className="flex flex-col items-center">

            <img src={genericProfile} alt="Profile" className={`w-${width} h-${height} rounded-full`}/>
            <p className={`mt-1 max-w-[72px] truncate text-xs font-medium text-slate-700 ${hidden}`}>
                {member.name}
            </p>
        </div>
    );
}

export default UserBubble