
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
        <div className="w-full space-y-3">
            <ul className="flex flex-col w-full rounded-xl border border-slate-100 bg-white divide-y divide-slate-100">
                {group.members.map(m => {
                    const isExpanded = !!expandedIds[m.id];
                    const nv = net[m.id] || net[String(m.id)] || 0
                    const owes = pairwise[m.id] || {}

                    // Calculate NET pairwise balances (so we don't show "Owes A $10" AND "Is Owed By A $5")
                    const netOwesList = [] // { id, name, amt } where amt > 0 means m owes them
                    const netOwedByList = [] // { id, name, amt } where amt > 0 means they owe m

                    group.members.forEach(other => {
                        if (other.id === m.id) return

                        // What I owe them
                        const iOweThem = (pairwise[m.id] && pairwise[m.id][other.id]) || 0
                        // What they owe me
                        const theyOweMe = (pairwise[other.id] && pairwise[other.id][m.id]) || 0

                        const net = iOweThem - theyOweMe

                        if (net > 0.005) {
                            netOwesList.push({ id: other.id, name: other.name, amt: net })
                        } else if (net < -0.005) {
                            netOwedByList.push({ id: other.id, name: other.name, amt: Math.abs(net) })
                        }
                    })

                    const owesList = netOwesList.map(x => [x.id, x.amt])
                    const owedByList = netOwedByList

                    return (
                        <li key={m.id} className="flex flex-col w-full px-4 py-3 ">
                            <div className="flex w-full items-center justify-between gap-3">
                                <div className="flex items-center gap-3">
                                    {/* <div
                                        title="profile-picture"
                                        className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 text-xs font-semibold text-white"
                                    >
                                        {m.name?.[0]?.toUpperCase() || "U"}
                                    </div> */}
                                    <UserBubble hidden="hidden" member={m} />
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

                            <div
                                className={`grid transition-[grid-template-rows] duration-300 ease-out ${isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                            >
                                <div className="overflow-hidden">
                                    <div className="px-4 pb-4 pt-4 bg-slate-50 text-sm space-y-4 border-t border-slate-100">

                                        {/* Owes Section */}
                                        {owesList.length > 0 && (
                                            <div>
                                                <p className="text-xs font-semibold text-slate-500 uppercase mb-2">Owes</p>
                                                <ul className="space-y-2">
                                                    {owesList.map(([toId, amt]) => {
                                                        const to = group.members.find(x => String(x.id) === String(toId));
                                                        return (
                                                            <li key={toId} className="flex justify-between text-slate-700">
                                                                <span>{to ? to.name : toId}</span>
                                                                <span className="font-medium text-red-600">${fmt(amt)}</span>
                                                            </li>
                                                        );
                                                    })}
                                                </ul>
                                            </div>
                                        )}

                                        {/* Owed By Section */}
                                        {owedByList.length > 0 && (
                                            <div>
                                                <p className="text-xs font-semibold text-slate-500 uppercase mb-2">Is Owed By</p>
                                                <ul className="space-y-2">
                                                    {owedByList.map(o => (
                                                        <li key={o.id} className="flex justify-between text-slate-700">
                                                            <span>{o.name}</span>
                                                            <span className="font-medium text-emerald-600">${fmt(o.amt)}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {!owesList.length && !owedByList.length && (
                                            <p className="text-slate-500 italic text-center py-2">All settled up.</p>
                                        )}

                                        {/* Net Total Footer */}
                                        <div className="pt-2 border-t border-slate-200 mt-2">
                                            <div className="flex justify-between items-center text-slate-900">
                                                <span className="text-xs font-bold uppercase">Net Total</span>
                                                <span className={`font-bold ${Number(nv) < 0 ? 'text-red-600' : 'text-emerald-600'}`}>
                                                    {Number(nv) < 0 ? '-' : '+'}${fmt(Math.abs(nv))}
                                                </span>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    )
}

export default BalanceTab

