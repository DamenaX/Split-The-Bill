import { useState } from "react"
import { useParams, useNavigate } from 'react-router-dom'

import MainContainer from "../components/MainContainer"
import MobileContainer from "../components/MobileContainer"
import Button from "../components/buttons/Button"
import Heading from "../components/text/Heading"
import TextInput from "../components/form/TextInput"
import UserBubble from "../components/UserBubble"
import ExpenseTab from "../components/ExpenseTab"
import BalanceTab from "../components/BalanceTab"
import { useGroups } from '../state/GroupsProvider'
import calculateBalances from '../utils/balances'

function Group() {
    const [tab, setTab] = useState("Expense")
    const [showAllMembers, setShowAllMembers] = useState(false)
    const { groupId } = useParams()
    const navigate = useNavigate()
    const { getGroupById, deleteMember } = useGroups()
    const group = getGroupById(groupId)

    if (!group) return (
        <MainContainer>
            <MobileContainer variant="centered">
                <p>Group not found</p>
            </MobileContainer>
        </MainContainer>
    )

    return (
        <MainContainer>
            <MobileContainer variant="centered">
                <header className="w-full ">
                    <div data-role="group-header" className="flex h-fit p-3 w-full rounded-md bg-gray-50 border border-gray-300">
                        <div className="flex flex-col w-full ">
                            <p>{group.name}</p>
                            <p className="text-sm text-gray-500">{group.members.length} Members</p>
                        </div>

                        <div className="flex w-full justify-center items-center">
                            <button onClick={() => navigate(`/groups/${groupId}/add-members`)} className=" rounded-md px-3 py-2 bg-emerald-600 text-white">+ Add member</button>
                        </div>
                    </div>

                    <div data-role="members-list" className="flex items-center space-x-3 h-fit p-3 w-full overflow-x-auto ">
                        {(() => {
                            const total = group.members.length
                            const showAll = showAllMembers
                            const list = showAll ? group.members : group.members.slice(0, 3)
                            return (
                                <>
                                    <div className="flex items-center space-x-8 w-full">
                                        {list.map(m => (
                                            <div key={m.id} className="flex flex-col items-center">
                                                <UserBubble member={m} />
                                                <div className="flex items-center mt-1 space-x-1">
                                                    <button onClick={() => {
                                                        const ok = window.confirm(`Delete ${m.name}? This requires their balance be zero.`)
                                                        if (!ok) return
                                                        const success = deleteMember(groupId, m.id)
                                                        if (!success) {
                                                            const { net } = calculateBalances(group)
                                                            const v = net && (net[m.id] || net[String(m.id)]) || 0
                                                            window.alert(`${m.name} cannot be deleted. Balance is $${v.toFixed(2)} (must be $0.00).`)
                                                        }
                                                    }} className="text-xs text-red-600">Remove</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    {total > 4 && (
                                        <div>
                                            {!showAll && (
                                                <button onClick={() => setShowAllMembers(true)} className="text-sm text-blue-600">Show members (+{total - 3})</button>
                                            )}
                                            {showAll && (
                                                <button onClick={() => setShowAllMembers(false)} className="text-sm text-gray-600">Hide members</button>
                                            )}
                                        </div>
                                    )}
                                </>
                            )
                        })()}
                    </div>
                </header>

                <div id="tabs" className="flex w-full">
                    <div className="flex justify-center px-3 py-2 w-full has-checked:border-b-2 border-emerald-600">
                        <input type="radio" name="tab" value="Expense" id="Expense" className="hidden peer" onChange={(e) => { setTab(e.target.value) }} defaultChecked />
                        <label htmlFor="Expense" className="text-center peer-checked:text-emerald-600 ">Expenses</label>
                    </div>

                    <div className="flex justify-center px-3 py-2 w-full has-checked:border-b-2 border-emerald-600">
                        <input type="radio" name="tab" value="Balance" id="Balance" className="hidden peer" onChange={(e) => { setTab(e.target.value) }} />
                        <label htmlFor="Balance" className="text-center peer-checked:text-emerald-600">Balance</label>
                    </div>
                </div>
                {tab === "Expense" ? <ExpenseTab group={group} /> : <BalanceTab group={group} />}
            </MobileContainer>
        </MainContainer>
    )
}

export default Group