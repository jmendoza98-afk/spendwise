# SpendWise

A personal finance dashboard built with React, JavaScript, and Vite.

## Getting started

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).

## Features

- Add, delete, and filter expenses
- Budget progress bar with color indicators
- Spending breakdown pie chart by category
- Search and sort expenses
- Persistent storage via localStorage

## Project structure

```
src/
├── data/
│   └── expenses.js         # Categories, seed data, budget constant
├── hooks/
│   └── useExpenses.js      # All expense state, filtering, localStorage
├── utils/
│   └── format.js           # Currency + date formatting helpers
├── components/
│   ├── StatCard.jsx         # Summary metric card
│   ├── BudgetBar.jsx        # Budget progress bar
│   ├── SpendingChart.jsx    # Recharts pie chart
│   ├── ExpenseList.jsx      # Filterable, sortable expense list
│   └── AddExpenseForm.jsx   # Modal form to add expenses
├── App.jsx                  # Root layout
├── App.module.css
├── main.jsx                 # React entry point
└── index.css                # Global reset
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
