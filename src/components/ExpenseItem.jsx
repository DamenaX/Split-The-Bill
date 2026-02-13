import { useState } from "react";
import dropDownIcon from "../assets/dropdown-arrow.svg";

function ExpenseItem({ expense, group }) {
    const [isOpen, setIsOpen] = useState(false);

    // Calculate splits if needed, or just display raw data
    // Assuming simple equal split visualization for now or raw data

    // Format date full
    const fullDate = new Date(expense.createdAt).toLocaleString(undefined, {
        dateStyle: "full",
        timeStyle: "short"
    });

    return (
        <li className="flex flex-col w-full border-b border-slate-100 last:border-0">
            {/* Header / Summary Row */}
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="flex w-full items-center justify-between px-4 py-3 hover:bg-slate-50 transition-colors cursor-pointer select-none"
            >
                <div className="flex flex-col gap-0.5">
                    <div className="text-sm font-medium text-slate-900">
                        {expense.description}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span>
                            {new Date(expense.createdAt).toLocaleDateString()}
                        </span>
                        <span aria-hidden="true">•</span>
                        <span>
                            {expense.payers && expense.payers.length > 1
                                ? `Paid by ${expense.payers.length} people`
                                : `Paid by ${group.members.find(m => m.id === (expense.payers?.[0]?.memberId))?.name || 'Unknown'}`
                            }
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <p className="text-sm font-semibold text-slate-900">
                        ${Number(expense.total || 0).toFixed(2)}
                    </p>
                    <img
                        src={dropDownIcon}
                        alt="Toggle details"
                        className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    />
                </div>
            </div>

            {/* Dropdown Details */}
            <div
                className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
            >
                <div className="overflow-hidden">
                    <div className="px-4 pb-4 pt-1 bg-slate-50 text-sm space-y-3 border-t border-slate-100">
                        <div>
                            <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Date</p>
                            <p className="text-slate-700">{fullDate}</p>
                        </div>

                        <div>
                            <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Paid By</p>
                            <ul className="space-y-1">
                                {expense.payers?.map((p, idx) => {
                                    const member = group.members.find(m => m.id === p.memberId);
                                    return (
                                        <li key={idx} className="flex justify-between text-slate-700">
                                            <span>{member?.name || 'Unknown'}</span>
                                            <span className="font-medium text-emerald-600">${Number(p.amountPaid || 0).toFixed(2)}</span>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>

                        <div>
                            <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Split Details</p>
                            <ul className="space-y-1">
                                {expense.shares?.map((s, idx) => {
                                    const member = group.members.find(m => m.id === s.memberId);
                                    return (
                                        <li key={idx} className="flex justify-between text-slate-700">
                                            <span>{member?.name || 'Unknown'}</span>
                                            <span className="font-medium text-red-600">owes ${Number(s.shareAmount || 0).toFixed(2)}</span>
                                        </li>
                                    );
                                })}
                                {!expense.shares && (
                                    <p className="text-slate-600 text-xs italic">
                                        Split equally amongst {group.members.length} members
                                    </p>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
}

export default ExpenseItem;
