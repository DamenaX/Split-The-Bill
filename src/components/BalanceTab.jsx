
import calculateBalances from '../utils/balances'

function BalanceTab({ group }) {
    if (!group) return <div />
    const balances = calculateBalances(group)

    return (
        <div className="w-full h-full space-y-2">
            <ul className="flex flex-col w-full h-fits">
                {group.members.map(m => (
                    <li key={m.id} className="flex w-full h-fit justify-between px-2 py-4 border-b-2 border-b-gray-400">
                        <div className="flex items-center">
                            <div title="profile-picture" className="w-9 h-9 rounded-full bg-blue-600 mr-3"></div>
                            <p>{m.name}</p>
                        </div>
                        <p className={balances[m.id] < 0 ? 'text-red-600' : 'text-green-600'}>
                            {balances[m.id] < 0 ? `owes $${Math.abs(balances[m.id]).toFixed(2)}` : `is owed $${Math.abs(balances[m.id]).toFixed(2)}`}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default BalanceTab

