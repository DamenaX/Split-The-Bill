import Button from "./buttons/Button"
import { useNavigate } from 'react-router-dom'
import ExpenseItem from './ExpenseItem'

function ExpenseTab({ group }) {
    const navigate = useNavigate()

    if (!group) return <div />

    return (
        <div className="w-full h-full space-y-3">
            <ul className="flex flex-col w-full h-fit divide-y divide-slate-100 border border-slate-100 rounded-xl bg-white">
                {group.expenses.length === 0 && (
                    <li className="px-4 py-4 text-sm text-slate-500 text-center">
                        No expenses yet. Add your first one below.
                    </li>
                )}
                {group.expenses.map(e => (
                    <ExpenseItem key={e.id} expense={e} group={group} />
                ))}
            </ul>
            <Button
                variant="default"
                type="button"
                onClick={() => navigate(`/groups/${group.id}/add-expense`)}
            >
                Add an expense
            </Button>
        </div>
    )
}

export default ExpenseTab