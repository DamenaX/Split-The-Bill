import Button from "./buttons/Button"

function ExpenseTab() {
    return (
        <div className="w-full h-full space-y-2">
                    <ul className="flex flex-col w-full h-fit">
                        <li className="flex w-full h-fit justify-evenly px-2 py-4 border-b-2 border-b-gray-400">
                            <div id="expense-date">FEB 24</div>
                            <div id="expense-name">Dinner at KK Green</div>
                            <div id="paid-information" className="flex flex-col">
                                <p>Paid by Daniel</p>
                                <p>$100</p>
                            </div>
                            <div id="your status"> You <span>borrowed/lent</span> <span>$30</span></div>
                        </li >
                        <li className="flex w-full h-fit justify-evenly px-2 py-4 border-b-2 border-b-gray-400">
                            <div id="expense-date">FEB 24</div>
                            <div id="expense-name">Dinner at KK Green</div>
                            <div id="paid-information" className="flex flex-col">
                                <p>Paid by Daniel</p>
                                <p>$100</p>
                            </div>
                            <div id="your status"> You <span>borrowed/lent</span> <span>$30</span></div>
                        </li >
        
                    </ul>
                    <Button variant="default" type="button">Add an Expense</Button>
                </div>
    )
}

export default ExpenseTab