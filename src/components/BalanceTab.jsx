
import calculateBalances from '../utils/balances'

function BalanceTab({ group }) {
    if (!group) return <div />
    const balances = calculateBalances(group)
    const net = balances.net || {}
    const pairwise = balances.pairwise || {}

    return (
        <div className="w-full h-full space-y-2">
            <ul className="flex flex-col w-full h-fits">
                {group.members.map(m => {
                    const nv = net[m.id] || net[String(m.id)] || 0
                    const owes = pairwise[m.id] || {}
                    const owesList = Object.entries(owes).filter(([,a]) => a > 0)
                    const owedByList = group.members.map(o => ({ id: o.id, amt: (pairwise[o.id] && pairwise[o.id][m.id]) || 0, name: o.name })).filter(x => x.amt > 0)
                    return (
                        <li key={m.id} className="flex flex-col w-full h-fit px-2 py-4 border-b-2 border-b-gray-400">
                            <div className="flex w-full justify-between items-center">
                                <div className="flex items-center">
                                    <div title="profile-picture" className="w-9 h-9 rounded-full bg-blue-600 mr-3"></div>
                                    <p>{m.name}</p>
                                </div>
                                <p className={nv < 0 ? 'text-red-600' : 'text-green-600'}>
                                    {nv < 0 ? `owes $${Math.abs(nv).toFixed(2)}` : `is owed $${Math.abs(nv).toFixed(2)}`}
                                </p>
                            </div>
                            <div className="mt-2 ml-12 text-sm">
                                {owesList.length > 0 && (
                                    <div>
                                        {owesList.map(([toId, amt]) => {
                                            const to = group.members.find(x => String(x.id) === String(toId))
                                            return <div key={toId} className="text-red-500">{"owes $" + amt.toFixed(2) + " to " + (to ? to.name : toId)}</div>
                                        })}
                                    </div>
                                )}
                                {owedByList.length > 0 && (
                                    <div>
                                        {owedByList.map(o => <div key={o.id} className="text-green-600">{"is owed $" + o.amt.toFixed(2) + " by " + o.name}</div>)}
                                    </div>
                                )}
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default BalanceTab

