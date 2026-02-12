import React, { createContext, useContext, useEffect, useReducer, useRef } from 'react'

const STORAGE_KEY = 'split-the-bill:v1'
const GroupsContext = createContext(null)

const initialState = { groups: [], nextId: 1 }

function normalizeId(val) {
  const n = Number(val)
  return Number.isFinite(n) ? n : val
}

function normalizeSaved(saved) {
  if (!saved) return initialState
  if (Array.isArray(saved)) {
    const groups = saved.map(g => ({
      ...g,
      id: normalizeId(g.id),
      members: Array.isArray(g.members) ? g.members.map(m => ({ ...m, id: normalizeId(m.id) })) : [],
      expenses: Array.isArray(g.expenses) ? g.expenses.map(e => ({ ...e, id: normalizeId(e.id) })) : []
    }))
    const maxId = groups.reduce((max, g) => Math.max(max, typeof g.id === 'number' ? g.id : max), 0)
    return { groups, nextId: maxId + 1 || 1 }
  }
  if (typeof saved === 'object') {
    const groups = Array.isArray(saved.groups) ? saved.groups.map(g => ({
      ...g,
      id: normalizeId(g.id),
      members: Array.isArray(g.members) ? g.members.map(m => ({ ...m, id: normalizeId(m.id) })) : [],
      expenses: Array.isArray(g.expenses) ? g.expenses.map(e => ({ ...e, id: normalizeId(e.id) })) : []
    })) : []
    const providedNext = typeof saved.nextId === 'number' ? saved.nextId : undefined
    const maxId = groups.reduce((max, g) => Math.max(max, typeof g.id === 'number' ? g.id : max), 0)
    return { groups, nextId: providedNext || (maxId + 1) || 1 }
  }
  return initialState
}

function initFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return initialState
    const parsed = JSON.parse(raw)
    return normalizeSaved(parsed)
  } catch (e) {
    return initialState
  }
}

function reducer(state, action) {
  switch (action.type) {
    case 'INIT':
      return action.payload ? action.payload : state
    case 'CREATE_GROUP': {
      const group = action.payload && action.payload.group ? action.payload.group : null
      if (!group) return state
      return { ...state, groups: [...state.groups, group], nextId: (typeof state.nextId === 'number' ? state.nextId + 1 : 1) }
    }
    case 'ADD_MEMBERS': {
      const { groupId, members } = action.payload || {}
      if (!groupId || !Array.isArray(members)) return state
      return { ...state, groups: state.groups.map(g => g.id === groupId ? { ...g, members: [...g.members, ...members] } : g) }
    }
    case 'ADD_EXPENSE': {
      const { groupId, expense } = action.payload || {}
      if (!groupId || !expense) return state
      return { ...state, groups: state.groups.map(g => g.id === groupId ? { ...g, expenses: [...g.expenses, expense] } : g) }
    }
    case 'DELETE_EXPENSE': {
      const { groupId, expenseId } = action.payload || {}
      if (!groupId || expenseId === undefined) return state
      return { ...state, groups: state.groups.map(g => g.id === groupId ? { ...g, expenses: g.expenses.filter(e => e.id !== expenseId) } : g) }
    }
    default:
      return state
  }
}

export function GroupsProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, initFromStorage)
  const hydrated = useRef(false)

  // mark hydrated after first render
  useEffect(() => { hydrated.current = true }, [])

  // persist
  useEffect(() => {
    if (!hydrated.current) return
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)) } catch (e) {}
  }, [state])

  // actions
  function createGroup({ name }) {
    const id = typeof state.nextId === 'number' ? state.nextId : 1
    const group = { id, name: name || 'New Group', members: [], expenses: [], createdAt: Date.now() }
    dispatch({ type: 'CREATE_GROUP', payload: { group } })
    return id
  }

  function addMembers(groupId, members) {
    const normalized = members.map(m => ({ ...m, id: normalizeId(m.id) }))
    const gid = normalizeId(groupId)
    dispatch({ type: 'ADD_MEMBERS', payload: { groupId: gid, members: normalized } })
  }

  function addExpense(groupId, expense) {
    const e = { ...expense, id: Date.now(), createdAt: Date.now() }
    const gid = normalizeId(groupId)
    dispatch({ type: 'ADD_EXPENSE', payload: { groupId: gid, expense: e } })
    return e.id
  }

  function deleteExpense(groupId, expenseId) {
    const gid = normalizeId(groupId)
    const eid = normalizeId(expenseId)
    dispatch({ type: 'DELETE_EXPENSE', payload: { groupId: gid, expenseId: eid } })
  }

  function getGroupById(id) {
    const sid = String(id)
    return state.groups.find(g => String(g.id) === sid)
  }

  return (
    <GroupsContext.Provider value={{ state, createGroup, addMembers, addExpense, deleteExpense, getGroupById }}>
      {children}
    </GroupsContext.Provider>
  )
}

export function useGroups() {
  const ctx = useContext(GroupsContext)
  if (!ctx) throw new Error('useGroups must be used inside GroupsProvider')
  return ctx
}

export default GroupsProvider
