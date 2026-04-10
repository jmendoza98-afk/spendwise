import { useState, useEffect, useCallback, useRef } from 'react'
import { SEED_EXPENSES, MONTHLY_BUDGET } from '../data/expenses'

const STORAGE_KEY = 'spendwise_expenses'

function loadExpenses() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : SEED_EXPENSES
  } catch {
    return SEED_EXPENSES
  }
}

function getNextId(expenses) {
  return expenses.length > 0 ? Math.max(...expenses.map(e => e.id)) + 1 : 1
}

export function useExpenses() {
  const [expenses, setExpenses] = useState(() => loadExpenses())
  const [filterCategory, setFilterCategory] = useState('all')
  const [searchQuery, setSearchQuery]       = useState('')
  const [sortBy, setSortBy]                 = useState('date_desc')
  const nextIdRef = useRef(getNextId(loadExpenses()))
  const debounceRef = useRef(null)

  // Persist on change
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses))
    }, 400)
  }, [expenses])

  useEffect(() => {
    const save = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses))
    window.addEventListener('beforeunload', save)
    return () => window.removeEventListener('beforeunload', save)
  }, [expenses])

  // Derived stats
  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0)
  const remaining  = MONTHLY_BUDGET - totalSpent
  const budgetPct  = Math.min((totalSpent / MONTHLY_BUDGET) * 100, 100)

  const byCategory = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount
    return acc
  }, {})

  // Filtered + sorted list
  const filtered = expenses
    .filter(e => {
      const matchCat   = filterCategory === 'all' || e.category === filterCategory
      const matchQuery = !searchQuery || e.description.toLowerCase().includes(searchQuery.toLowerCase())
      return matchCat && matchQuery
    })
    .sort((a, b) => {
      if (sortBy === 'date_desc')   return new Date(b.date) - new Date(a.date)
      if (sortBy === 'date_asc')    return new Date(a.date) - new Date(b.date)
      if (sortBy === 'amount_desc') return b.amount - a.amount
      if (sortBy === 'amount_asc')  return a.amount - b.amount
      return 0
    })

  const addExpense = useCallback((data) => {
    const expense = { ...data, id: nextIdRef.current++ }
    setExpenses(prev => {
      const updated = [expense, ...prev]
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      return updated
    })
  }, [])

  const deleteExpense = useCallback((id) => {
    setExpenses(prev => {
      const updated = prev.filter(e => e.id !== id)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      return updated
    })
  }, [])

  return {
    expenses,
    filtered,
    totalSpent,
    remaining,
    budgetPct,
    byCategory,
    filterCategory,
    searchQuery,
    sortBy,
    setFilterCategory,
    setSearchQuery,
    setSortBy,
    addExpense,
    deleteExpense,
    budget: MONTHLY_BUDGET,
  }
}
