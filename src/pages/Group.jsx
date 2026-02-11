import { useState } from "react"

import MainContainer from "../components/MainContainer"
import MobileContainer from "../components/MobileContainer"
import Button from "../components/buttons/Button"
import Heading from "../components/text/Heading"
import TextInput from "../components/form/TextInput"
import UserBubble from "../components/UserBubble"
import ExpenseTab from "../components/ExpenseTab"
import BalanceTab from "../components/BalanceTab"

function Group() {

    const [tab, setTab] = useState("Expense")

    return (
        <MainContainer>
            <MobileContainer variant="normal">
                <header className="w-full">
                    <div data-role="group-header" className="flex h-fit p-3 w-full">
                        <div className="flex flex-col w-full">
                            <p>groupName</p>
                            <p>4 Members</p>
                        </div>

                        <div className="flex w-full justify-center items-center">
                            <button>+</button>
                        </div>
                    </div>

                    <div data-role="members-list" className="flex justify-evenly h-fit p-3 w-full">
                        <UserBubble />
                        <UserBubble />
                        <UserBubble />
                        <UserBubble />
                    </div>
                </header>
                <div id="tabs" className="flex w-full">
                    <div className="flex justify-center px-3 py-2 w-full">
                        <label htmlFor="Expense" className="text-center">Expenses</label>
                        <input type="radio" name="tab" value="Expense" id="Expense" className="hidden" onChange={(e) => { setTab(e.target.value) }} />
                    </div>

                    <div className="flex justify-center px-3 py-2 w-full">
                        <label htmlFor="Balance" className="text-center">Balance</label>
                        <input type="radio" name="tab" value="Balance" id="Balance" className="hidden" onChange={(e) => { setTab(e.target.value) }} />
                    </div>
                </div>
                {tab == "Expense" ? <ExpenseTab /> : <BalanceTab />}
            </MobileContainer>
        </MainContainer>
    )
}

export default Group