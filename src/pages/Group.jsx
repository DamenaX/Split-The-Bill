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

function Group() {
    const [tab, setTab] = useState("Expense")
    const { groupId } = useParams()
    const navigate = useNavigate()
    const { getGroupById } = useGroups()
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
            <MobileContainer variant="normal">
                <header className="w-full">
                    <div data-role="group-header" className="flex h-fit p-3 w-full">
                        <div className="flex flex-col w-full">
                            <p>{group.name}</p>
                            <p>{group.members.length} Members</p>
                        </div>

                        <div className="flex w-full justify-center items-center">
                            <button onClick={() => navigate(`/groups/${groupId}/add-members`)}>+</button>
                        </div>
                    </div>

                    <div data-role="members-list" className="flex justify-evenly h-fit p-3 w-full">
                        {group.members.map(m => <UserBubble key={m.id} member={m} />)}
                    </div>
                </header>
                <div id="tabs" className="flex w-full">
                    <div className="flex justify-center px-3 py-2 w-full">
                        <label htmlFor="Expense" className="text-center">Expenses</label>
                        <input type="radio" name="tab" value="Expense" id="Expense" className="hidden" onChange={(e) => { setTab(e.target.value) }} defaultChecked />
                    </div>

                    <div className="flex justify-center px-3 py-2 w-full">
                        <label htmlFor="Balance" className="text-center">Balance</label>
                        <input type="radio" name="tab" value="Balance" id="Balance" className="hidden" onChange={(e) => { setTab(e.target.value) }} />
                    </div>
                </div>
                {tab === "Expense" ? <ExpenseTab group={group} /> : <BalanceTab group={group} />}
            </MobileContainer>
        </MainContainer>
    )
}

export default Group