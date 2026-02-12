import Button from "./buttons/Button"
import { useNavigate } from 'react-router-dom'

function ExpenseTab({ group }) {
    const navigate = useNavigate()

    if (!group) return <div />

    return (
        <div className="w-full h-full space-y-2">
            <ul className="flex flex-col w-full h-fit">
                {group.expenses.map(e => (
                    <li key={e.id} className="flex w-full h-fit justify-between px-2 py-4 border-b-2 border-b-gray-400">
                        <div className="flex items-center space-x-3">
                            <div id="expense-date">{new Date(e.createdAt).toLocaleDateString()}</div>
                            <div id="expense-name">{e.description}</div>
                        </div>
                        <div id="paid-information" className="flex flex-col text-right">
                            {/* <p>Paid by {group.members.find(m => m.id === (e.payers && e.payers[0] && e.payers[0].memberId))?.name || 'Unknown'}</p> */}
                            <p>
                                {e.payers && e.payers.length > 1
                                    ? `Paid by ${e.payers.length} people`
                                    : `Paid by ${group.members.find(m => m.id === (e.payers?.[0]?.memberId))?.name || 'Unknown'}`
                                }
                            </p>
                            <p>${e.total}</p>
                        </div>
                    </li>
                ))}
            </ul>
            <Button variant="default" type="button" onClick={() => navigate(`/groups/${group.id}/add-expense`)}>Add an Expense</Button>
        </div>
    )
}

export default ExpenseTab