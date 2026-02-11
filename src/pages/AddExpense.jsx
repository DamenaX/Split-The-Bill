import { useState } from "react"

import MainContainer from "../components/MainContainer"
import MobileContainer from "../components/MobileContainer"
import Button from "../components/buttons/Button"
import Heading from "../components/text/Heading"
import TextInput from "../components/form/TextInput"
import UserBubble from "../components/UserBubble"
import ExpenseTab from "../components/ExpenseTab"
import BalanceTab from "../components/BalanceTab"

function AddExpense() {
    const [numberOfPayers, setNumberOfPayers] = useState("single");
    const [split, setSplit] = useState("equally");

    const singlePayerFields = (
        <div className="flex flex-col w-full space-y-1">
            <label for="single-payer">Who paid?</label>
            <select id="single-payer" name="single-payer" className="w-full border border-gray-200 rounded-sm px-2 h-8">
                {/* Enumerate actual users */}
                <option value="user1">User 1</option>
                <option value="user2">User 2</option>
                <option value="user3">User 3</option>
            </select>
        </div>
    )

    const multiPayerFields = (
        <div className="flex flex-col space-y-2">
            <div className="flex justify-between">
                <div className="space-x-2">
                    <input type="checkbox" value="payer1" id="payer1" />
                    <label for="payer1">You</label>
                </div>

                <input type="text" inputMode="numeric" id="payer1-paid-amount" className="border border-gray-300" />
            </div>

            <div className="flex justify-between">
                <div className="space-x-2">
                    <input type="checkbox" value="payer1" id="payer1" />
                    <label for="payer1">User 2</label>
                </div>

                <input type="text" inputMode="numeric" id="payer1-paid-amount" className="border border-gray-300" />
            </div>

            <div className="flex justify-between">
                <div className="space-x-2">
                    <input type="checkbox" value="payer1" id="payer1" />
                    <label for="payer1">User 3</label>
                </div>

                <input type="text" inputMode="numeric" id="payer1-paid-amount" className="border border-gray-300" />
            </div>

        </div>
    )

    const unequalSplitFields = (
        <div className="flex flex-col space-y-2">
            <div className="flex justify-between">
                <div className="space-x-2">

                    <label for="payer1">You</label>
                </div>

                <input type="text" inputMode="numeric" id="payer1-paid-amount" className="border border-gray-300" />
            </div>

            <div className="flex justify-between">
                <div className="space-x-2">

                    <label for="payer1">User 2</label>
                </div>

                <input type="text" inputMode="numeric" id="payer1-paid-amount" className="border border-gray-300" />
            </div>

            <div className="flex justify-between">
                <div className="space-x-2">

                    <label for="payer1">User 3</label>
                </div>

                <input type="text" inputMode="numeric" id="payer1-paid-amount" className="border border-gray-300" />
            </div>

        </div>
    )

    return (
        <MainContainer>
            <MobileContainer variant="scrollable">
                <div className="w-full space-y-3">
                    <Heading tagName="h1" level="1"> Add an Expense</Heading>
                    <form className="flex flex-col space-y-2">
                        <TextInput id="expense-description" placeholder="Description" isRequired={true} variant="default-wide" label="Description" />
                        <TextInput id="expense-total-amount " placeholder="Total Amount" isRequired={true} variant="default-wide" label="Total Bill Amount" />

                        <div className="flex flex-col w-full space-y-1">
                            <label for="number-of-payers">How many people helped pay the bill</label>
                            <select onChange={(e) => setNumberOfPayers(e.target.value)} id="number-of-payers" name="number-of-payers" className="w-full border border-gray-200 rounded-sm px-2 h-8">
                                <option value="single">One Person</option>
                                <option value="multiple">Multiple people</option>
                            </select>
                        </div>

                        {numberOfPayers === "single" ? singlePayerFields : multiPayerFields }




                        <div className="flex flex-col w-full space-y-1">
                            <label for="split">Split</label>
                            <select onChange={(e) => setSplit(e.target.value)} className="w-full border border-gray-200 rounded-sm px-2 h-8">
                                <option value="equally">Equally</option>
                                <option value="unequally">Unequally</option>
                            </select>
                        </div>

                        {/* if unequally */}

                        {split === "equally" ? "" : unequalSplitFields}

                        <Button type="submit" variant="default">Add Expense</Button>

                    </form>
                </div>
            </MobileContainer>
        </MainContainer>

    )
}

export default AddExpense