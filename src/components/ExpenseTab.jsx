import Button from "./buttons/Button"
import { useNavigate } from 'react-router-dom'

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
                    <li
                        key={e.id}
                        className="flex w-full items-center justify-between px-4 py-3 hover:bg-slate-50 transition-colors"
                    >
                        <div className="flex flex-col gap-0.5">
                            <div id="expense-name" className="text-sm font-medium text-slate-900">
                                {e.description}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-slate-500">
                                <span id="expense-date">
                                    {new Date(e.createdAt).toLocaleDateString()}
                                </span>
                                <span aria-hidden="true">•</span>
                                <span id="paid-information">
                                    {e.payers && e.payers.length > 1
                                        ? `Paid by ${e.payers.length} people`
                                        : `Paid by ${group.members.find(m => m.id === (e.payers?.[0]?.memberId))?.name || 'Unknown'
                                        }`}
                                </span>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-semibold text-slate-900">
                                ${Number(e.total).toFixed(2)}
                            </p>
                        </div>
                    </li>
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