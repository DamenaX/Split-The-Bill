function RightPanel() {
    return (
        <div className="flex flex-col w-45">
            <div data-role="home" className="w-full border-b border-gray-400 h-">
                <p>Home</p>
            </div>
            <div data-role="groups" className="w-full border-b border-gray-400">
                <p>Groups</p>
            </div>
            <div>
                <p>Account</p>
            </div>
        </div>
    )
}

export default RightPanel