export function calculateBalances(group) {
  // returns map of memberId -> net (positive = is owed, negative = owes)
  const result = {}
  if (!group) return result
  group.members.forEach(m => { result[m.id] = 0 })

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

    // for each member, net change = paid - share
    group.members.forEach(m => {
      const paid = paidMap[m.id] || 0
      const share = shares[m.id] || 0
      result[m.id] = (result[m.id] || 0) + (paid - share)
    })
  })

  return result
}

export default calculateBalances
