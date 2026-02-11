

function BalanceTab() {
    return (<div className="w-full h-full space-y-2">
        <ul className="flex flex-col w-full h-fits">
            <li className="flex w-full h-fit justify-evenly px-2 py-4 border-b-2 border-b-gray-400">
                <div className="flex items-center w-full">
                    <div title="profile-picture" className="w-9 h-9 rounded-full bg-blue-600 mr-3"></div>
                    <p>Daniel</p>
                </div>

                <p className="text-red-600">owes $13.6</p>
            </li>
        </ul>
    </div>
    )
}

export default BalanceTab

