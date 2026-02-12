export function calculateBalances(group) {
  // returns { net: map(memberId->number), pairwise: map(debtorId -> map(creditorId->number)) }
  const net = {}
  const pairwise = {}
  if (!group) return { net, pairwise }

  const members = Array.isArray(group.members) ? group.members : []
  const expenses = Array.isArray(group.expenses) ? group.expenses : []

  // init using string keys
  members.forEach(m => { const id = String(m.id); net[id] = 0; pairwise[id] = {} })

  expenses.forEach((exp, expIndex) => {
    try {
      const total = Number(exp && exp.total) || 0

      // sum paid
      const paidMap = {}
      const payers = Array.isArray(exp && exp.payers) ? exp.payers : []
      payers.forEach(p => {
        if (!p) return
        const pid = String(p.memberId)
        const amt = Number(p.amountPaid) || 0
        paidMap[pid] = (paidMap[pid] || 0) + amt
      })

      // shares: if present, use shares; else equal split
      const shares = {}
      if (Array.isArray(exp && exp.shares) && exp.shares.length) {
        exp.shares.forEach(s => {
          if (!s) return
          shares[String(s.memberId)] = Number(s.shareAmount) || 0
        })
      } else {
        const n = members.length || 1
        const per = total / n
        members.forEach(m => { shares[String(m.id)] = per })
      }

      // compute deltas (paid - share)
      const deltas = {}
      members.forEach(m => {
        const id = String(m.id)
        const paid = paidMap[id] || 0
        const share = shares[id] || 0
        const d = paid - share
        deltas[id] = d
        net[id] = (net[id] || 0) + d
      })

      // separate creditors and debtors for this expense
      const creditors = [] // {id, amt}
      const debtors = []
      Object.keys(deltas).forEach(id => {
        const v = deltas[id]
        if (v > 0) creditors.push({ id, amt: v })
        else if (v < 0) debtors.push({ id, amt: -v }) // store positive debt amount
      })

      // settle debts between debtors and creditors within this expense
      let cIdx = 0
      let dIdx = 0
      while (dIdx < debtors.length && cIdx < creditors.length) {
        const debtor = debtors[dIdx]
        const creditor = creditors[cIdx]
        const take = Math.min(debtor.amt, creditor.amt)
        if (!pairwise[debtor.id]) pairwise[debtor.id] = {}
        pairwise[debtor.id][creditor.id] = (pairwise[debtor.id][creditor.id] || 0) + take
        debtor.amt -= take
        creditor.amt -= take
        if (Math.abs(debtor.amt) < 1e-8) dIdx++
        if (Math.abs(creditor.amt) < 1e-8) cIdx++
      }
    } catch (err) {
      // swallow and log; continue processing other expenses
      // eslint-disable-next-line no-console
      console.error(`calculateBalances: error processing expense at index ${expIndex}`, err, exp)
    }
  })

  return { net, pairwise }
}

export default calculateBalances
