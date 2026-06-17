import { CATEGORY_MAP } from '../data/expenses'

export function exportToCSV(expenses) {
  const headers = ['Date', 'Description', 'Category', 'Amount']

  const rows = expenses
    .slice()
    .sort((a, b) => a.date.localeCompare(b.date))
    .map(e => [
      e.date,
      `"${e.description.replace(/"/g, '""')}"`,
      CATEGORY_MAP[e.category]?.label || e.category,
      e.amount.toFixed(2),
    ])

  const csv = [headers, ...rows].map(r => r.join(',')).join('\n')

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url  = URL.createObjectURL(blob)
  const link = document.createElement('a')

  link.href     = url
  link.download = `spendwise-expenses-${new Date().toISOString().slice(0, 10)}.csv`
  link.click()

  URL.revokeObjectURL(url)
}