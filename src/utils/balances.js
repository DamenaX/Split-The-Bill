export function calculateBalances(group) {
  // returns { net: map(memberId->number), pairwise: map(debtorId -> map(creditorId->number)) }
  const net = {}
  const pairwise = {}
  if (!group) return { net, pairwise }

  // init
  group.members.forEach(m => { net[m.id] = 0; pairwise[m.id] = {} })

  group.expenses.forEach(exp => {
    const total = Number(exp.total) || 0
    // sum paid
    const paidMap = {}
    (exp.payers || []).forEach(p => {
      paidMap[p.memberId] = (paidMap[p.memberId] || 0) + Number(p.amountPaid || 0)
    })

    // shares: if present, use shares; else equal split
    let shares = {}
    if (exp.shares && exp.shares.length) {
      exp.shares.forEach(s => { shares[s.memberId] = Number(s.shareAmount || 0) })
    } else {
      const n = group.members.length || 1
      const per = total / n
      group.members.forEach(m => { shares[m.id] = per })
    }

    // compute deltas (paid - share)
    const deltas = {}
    group.members.forEach(m => {
      const paid = paidMap[m.id] || 0
      const share = shares[m.id] || 0
      const d = (paid - share)
      deltas[m.id] = d
      net[m.id] = (net[m.id] || 0) + d
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
  })

  return { net, pairwise }
}

export default calculateBalances
