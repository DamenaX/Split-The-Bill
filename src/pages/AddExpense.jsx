import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import MainContainer from "../components/MainContainer"
import MobileContainer from "../components/MobileContainer"
import Button from "../components/buttons/Button"
import Heading from "../components/text/Heading"
import { useGroups } from '../state/GroupsProvider'

function AddExpense() {
    const { groupId } = useParams()
    const navigate = useNavigate()
    const { getGroupById, addExpense } = useGroups()
    const group = getGroupById(groupId)

    const [description, setDescription] = useState('')
    const [total, setTotal] = useState('')

    const [numberOfPayers, setNumberOfPayers] = useState('single') // 'single' | 'multiple'
    const [split, setSplit] = useState('equally') // 'equally' | 'unequally'

    const [singlePayerId, setSinglePayerId] = useState('')

    // payerStates: { [memberId]: { selected: boolean, amount: '' } }
    const [payerStates, setPayerStates] = useState({})
    // shareStates: { [memberId]: '' }
    const [shareStates, setShareStates] = useState({})

    useEffect(() => {
        if (group && group.members && group.members.length) {
            setSinglePayerId(group.members[0].id)
            const ps = {}
            const ss = {}
            group.members.forEach(m => {
                ps[m.id] = { selected: false, amount: '' }
                ss[m.id] = ''
            })
            setPayerStates(ps)
            setShareStates(ss)
        }
    }, [groupId, group])

    function togglePayer(memberId) {
        setPayerStates(prev => ({ ...prev, [memberId]: { ...prev[memberId], selected: !prev[memberId].selected } }))
    }

    function setPayerAmount(memberId, value) {
        setPayerStates(prev => ({ ...prev, [memberId]: { ...prev[memberId], amount: value } }))
    }

    function setShare(memberId, value) {
        setShareStates(prev => ({ ...prev, [memberId]: value }))
    }

    function onSubmit(e) {
        e.preventDefault()
        const t = Number(total)
        if (!description || !t) return
        if (!group) return

        // build payers
        let payers = []
        if (numberOfPayers === 'single') {
            if (!singlePayerId) return
            payers = [{ memberId: singlePayerId, amountPaid: t }]
        } else {
            let sumPaid = 0
            Object.keys(payerStates).forEach(id => {
                const s = payerStates[id]
                if (s && s.selected) {
                    const amt = Number(s.amount) || 0
                    sumPaid += amt
                    payers.push({ memberId: id, amountPaid: amt })
                }
            })
            // ensure sumPaid matches total (simple validation)
            if (Math.abs(sumPaid - t) > 0.01) {
                alert('The sum of payer amounts must equal the total amount')
                return
            }
        }

        // build shares
        let shares = []
        if (split === 'equally') {
            const n = group.members.length || 1
            const per = t / n
            shares = group.members.map(m => ({ memberId: m.id, shareAmount: per }))
        } else {
            let sumShares = 0
            group.members.forEach(m => {
                const v = Number(shareStates[m.id]) || 0
                sumShares += v
                shares.push({ memberId: m.id, shareAmount: v })
            })
            if (Math.abs(sumShares - t) > 0.01) {
                alert('The sum of shares must equal the total amount')
                return
            }
        }

        const expense = { description, total: t, payers, shares }
        addExpense(groupId, expense)
        navigate(`/groups/${groupId}`)
    }

    if (!group) return <MainContainer><MobileContainer variant="centered"><p>Group not found</p></MobileContainer></MainContainer>

    return (
        
            <MobileContainer variant="scrollable">
                <div className="w-full space-y-3">
                    <Heading tagName="h1" level="1"> Add an Expense</Heading>
                    <form className="flex flex-col space-y-3" onSubmit={onSubmit}>
                        <div className="flex flex-col">
                            <label htmlFor="expense-description">Description</label>
                            <input id="expense-description" value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" required className="border px-3 py-2 rounded" />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="expense-total-amount">Total Amount</label>
                            <input id="expense-total-amount" inputMode="numeric" value={total} onChange={e => setTotal(e.target.value)} placeholder="Total Amount" required className="border px-3 py-2 rounded" />
                        </div>

                        <div className="flex flex-col w-full space-y-1">
                            <label htmlFor="number-of-payers">How many people helped pay the bill</label>
                            <select value={numberOfPayers} onChange={(e) => setNumberOfPayers(e.target.value)} id="number-of-payers" name="number-of-payers" className="w-full border border-gray-200 rounded-sm px-2 h-8">
                                <option value="single">One Person</option>
                                <option value="multiple">Multiple people</option>
                            </select>
                        </div>

                        {numberOfPayers === 'single' ? (
                            <div className="flex flex-col w-full space-y-1">
                                <label htmlFor="single-payer">Who paid?</label>
                                <select id="single-payer" value={singlePayerId} onChange={e => setSinglePayerId(e.target.value)} className="w-full border border-gray-200 rounded-sm px-2 h-8">
                                    {group.members.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                                </select>
                            </div>
                        ) : (
                            <div className="flex flex-col space-y-2">
                                {group.members.map(m => (
                                    <div key={m.id} className="flex justify-between items-center">
                                        <div className="flex items-center space-x-2">
                                            <input type="checkbox" id={`payer-${m.id}`} checked={payerStates[m.id]?.selected || false} onChange={() => togglePayer(m.id)} />
                                            <label htmlFor={`payer-${m.id}`}>{m.name}</label>
                                        </div>
                                        <input type="number" inputMode="numeric" placeholder="Amount paid" value={payerStates[m.id]?.amount || ''} onChange={e => setPayerAmount(m.id, e.target.value)} className="border px-2 py-1 w-32" />
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="flex flex-col w-full space-y-1">
                            <label htmlFor="split">Split</label>
                            <select value={split} onChange={(e) => setSplit(e.target.value)} className="w-full border border-gray-200 rounded-sm px-2 h-8">
                                <option value="equally">Equally</option>
                                <option value="unequally">Unequally</option>
                            </select>
                        </div>

                        {split === 'equally' ? null : (
                            <div className="flex flex-col space-y-2">
                                {group.members.map(m => (
                                    <div key={m.id} className="flex justify-between items-center">
                                        <label className="mr-2">{m.name}</label>
                                        <input type="number" inputMode="numeric" placeholder="Share amount" value={shareStates[m.id] || ''} onChange={e => setShare(m.id, e.target.value)} className="border px-2 py-1 w-32" />
                                    </div>
                                ))}
                            </div>
                        )}

                        <Button type="submit" variant="default">Add Expense</Button>

                    </form>
                </div>
            </MobileContainer>
       
    )
}

export default AddExpense
