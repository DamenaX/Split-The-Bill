import React, { createContext, useContext, useEffect, useReducer } from 'react'

const STORAGE_KEY = 'split-the-bill:v1'

const GroupsContext = createContext(null)

function makeId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`
}

const initialState = {
  groups: []
}

function reducer(state, action) {
  switch (action.type) {
    case 'INIT':
      return action.payload
    case 'CREATE_GROUP': {
      const group = {
        id: makeId(),
        name: action.payload.name || 'New Group',
        members: [],
        expenses: [],
        createdAt: Date.now()
      }
      return { ...state, groups: [...state.groups, group] }
    }
    case 'ADD_MEMBERS': {
      const { groupId, members } = action.payload
      return {
        ...state,
        groups: state.groups.map(g => g.id === groupId ? { ...g, members: [...g.members, ...members] } : g)
      }
    }
    case 'ADD_EXPENSE': {
      const { groupId, expense } = action.payload
      return {
        ...state,
        groups: state.groups.map(g => g.id === groupId ? { ...g, expenses: [...g.expenses, expense] } : g)
      }
    }
    case 'DELETE_EXPENSE': {
      const { groupId, expenseId } = action.payload
      return {
        ...state,
        groups: state.groups.map(g => g.id === groupId ? { ...g, expenses: g.expenses.filter(e => e.id !== expenseId) } : g)
      }
    }
    default:
      return state
  }
}

export function GroupsProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  // hydrate from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        dispatch({ type: 'INIT', payload: JSON.parse(raw) })
      }
    } catch (e) {
      // ignore
    }
  }, [])

  // persist
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch (e) {}
  }, [state])

  // actions
  function createGroup({ name }) {
    dispatch({ type: 'CREATE_GROUP', payload: { name } })
    // return id by reading last inserted group after a tick
    // consumer can read from context afterwards
  }

  function addMembers(groupId, members) {
    // members: [{id,name}]
    dispatch({ type: 'ADD_MEMBERS', payload: { groupId, members } })
  }

  function addExpense(groupId, expense) {
    // ensure expense has id and date
    const e = { ...expense, id: makeId(), createdAt: Date.now() }
    dispatch({ type: 'ADD_EXPENSE', payload: { groupId, expense: e } })
    return e.id
  }

  function deleteExpense(groupId, expenseId) {
    dispatch({ type: 'DELETE_EXPENSE', payload: { groupId, expenseId } })
  }

  function getGroupById(id) {
    return state.groups.find(g => g.id === id)
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
