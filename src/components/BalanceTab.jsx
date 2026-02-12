
import calculateBalances from '../utils/balances'
import dropDownIcon from "../assets/dropdown-arrow.svg";
import UserBubble from './UserBubble';
import { useState } from "react"

function BalanceTab({ group }) {
    if (!group) return <div />
    let balances = { net: {}, pairwise: {} }
    try {
        balances = calculateBalances(group) || balances
    } catch (err) {
        console.error('calculateBalances error', err)
        return <div className="p-4 text-red-600">Error computing balances</div>
    }
    const net = balances.net || {}
    const pairwise = balances.pairwise || {}

    const fmt = (v) => {
        const n = Number(v)
        if (!Number.isFinite(n)) return '0.00'
        return n.toFixed(2)
    }

    const [expandedIds, setExpandedIds] = useState({});

    const toggleExpand = (id) => {
        setExpandedIds(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    return (
        <div className="w-full h-full space-y-3">
            <ul className="flex flex-col w-full rounded-xl border border-slate-100 bg-white divide-y divide-slate-100">
                {group.members.map(m => {
                    const isExpanded = !!expandedIds[m.id];
                    const nv = net[m.id] || net[String(m.id)] || 0
                    const owes = pairwise[m.id] || {}
                    const owesList = Object.entries(owes).filter(([, a]) => a > 0)
                    const owedByList = group.members
                        .map(o => ({ id: o.id, amt: (pairwise[o.id] && pairwise[o.id][m.id]) || 0, name: o.name }))
                        .filter(x => x.amt > 0)

                    return (
                        <li key={m.id} className="flex flex-col w-full px-4 py-3">
                            <div className="flex w-full items-center justify-between gap-3">
                                <div className="flex items-center gap-3">
                                    {/* <div
                                        title="profile-picture"
                                        className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 text-xs font-semibold text-white"
                                    >
                                        {m.name?.[0]?.toUpperCase() || "U"}
                                    </div> */}
                                    <UserBubble hidden="hidden" member={m}/>
                                    <div className="flex flex-col">
                                        <p className="text-sm font-medium text-slate-900">{m.name}</p>
                                        <p className="text-xs text-slate-500">
                                            {Number(nv) < 0 ? 'Net payer' : 'Net receiver'}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <p className={Number(nv) < 0 ? 'text-sm font-semibold text-red-600' : 'text-sm font-semibold text-emerald-600'}>
                                        {Number(nv) < 0
                                            ? `owes $${fmt(Math.abs(nv))}`
                                            : `is owed $${fmt(Math.abs(nv))}`}
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => toggleExpand(m.id)}
                                        className={`px-1 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                                        aria-label="Toggle breakdown"
                                    >
                                        <img src={dropDownIcon} width="24" height="24" alt="" />
                                    </button>
                                </div>
                            </div>

                            <div className={`mt-2 pl-12 text-sm space-y-1 ${isExpanded ? '' : 'hidden'}`}>
                                {owesList.length > 0 && (
                                    <div className="space-y-0.5">
                                        {owesList.map(([toId, amt]) => {
                                            const to = group.members.find(x => String(x.id) === String(toId));
                                            return (
                                                <div key={toId} className="text-xs text-red-600">
                                                    owes ${fmt(amt)} to {to ? to.name : toId}
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                                {owedByList.length > 0 && (
                                    <div className="space-y-0.5">
                                        {owedByList.map(o => (
                                            <div key={o.id} className="text-xs text-emerald-600">
                                                is owed ${fmt(o.amt)} by {o.name}
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {!owesList.length && !owedByList.length && (
                                    <p className="text-xs text-slate-500">
                                        This person is settled up.
                                    </p>
                                )}
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    )
}

export default BalanceTab

