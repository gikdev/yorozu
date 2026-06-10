import { useState, useEffect, useRef } from "react"
import { createFileRoute, Link } from "@tanstack/react-router"
import {
  PlusIcon,
  MinusIcon,
  DownloadSimpleIcon,
  UploadSimpleIcon,
  TrashIcon,
} from "@phosphor-icons/react"

export const Route = createFileRoute("/apps/expenses")({
  component: Ledger,
})

// ---------- Constants ----------
const CURRENCY_SYMBOL = "💎"
const STORAGE_KEY = "ledger-transactions"

// ---------- Types ----------
interface Transaction {
  id: string
  title: string
  amount: number // always positive, whole number
  type: "income" | "expense"
  date: string // YYYY-MM-DD
}

// ---------- Helpers ----------
function formatAmount(amount: number, type: "income" | "expense"): string {
  const sign = type === "income" ? "+" : "-"
  return `${sign}${amount.toLocaleString()} ${CURRENCY_SYMBOL}`
}

function formatNetAmount(net: number): string {
  const sign = net >= 0 ? "+" : "-"
  return `${sign}${Math.abs(net).toLocaleString()} ${CURRENCY_SYMBOL}`
}

// ---------- Component ----------
function Ledger() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [title, setTitle] = useState("")
  const [amount, setAmount] = useState("")
  const [type, setType] = useState<"income" | "expense">("expense")
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10))
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Load persisted data on mount (only once)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed)) {
          setTransactions(parsed)
        } else {
          localStorage.removeItem(STORAGE_KEY)
        }
      }
    } catch (e) {
      console.error("Failed to load transactions", e)
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [])

  // Helper: save and update state atomically
  const saveTransactions = (newTransactions: Transaction[]) => {
    setTransactions(newTransactions)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newTransactions))
  }

  // Add a new transaction
  const addTransaction = (e: React.FormEvent) => {
    e.preventDefault()
    const parsedAmount = parseInt(amount, 10)
    if (!title.trim() || isNaN(parsedAmount) || parsedAmount <= 0) return

    const newTransaction: Transaction = {
      id: crypto.randomUUID
        ? crypto.randomUUID()
        : Date.now().toString() + Math.random(),
      title: title.trim(),
      amount: parsedAmount,
      type,
      date,
    }

    // Save immediately
    saveTransactions([newTransaction, ...transactions])

    // Reset form fields
    setTitle("")
    setAmount("")
    setType("expense")
    setDate(new Date().toISOString().slice(0, 10))
  }

  // Delete a single transaction
  const deleteTransaction = (id: string) => {
    const updated = transactions.filter(t => t.id !== id)
    saveTransactions(updated)
  }

  // Delete all data with confirmation
  const deleteAllData = () => {
    if (
      window.confirm(
        "Are you sure you want to delete all transactions? This action cannot be undone.",
      )
    ) {
      saveTransactions([])
      localStorage.removeItem(STORAGE_KEY)
    }
  }

  // Export data to JSON file
  const exportData = () => {
    const json = JSON.stringify(transactions, null, 2)
    const blob = new Blob([json], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `gems-ledger-${new Date().toISOString().slice(0, 10)}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  // Import data from JSON file
  const importData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = e => {
      try {
        const text = e.target?.result as string
        const parsed = JSON.parse(text)
        if (!Array.isArray(parsed)) {
          alert("Invalid file format: must be an array of transactions.")
          return
        }

        const isValid = parsed.every(
          (item: any) =>
            typeof item.id === "string" &&
            typeof item.title === "string" &&
            typeof item.amount === "number" &&
            (item.type === "income" || item.type === "expense") &&
            typeof item.date === "string",
        )

        if (!isValid) {
          alert(
            "Invalid transaction data. Each transaction must have id, title, amount, type, and date.",
          )
          return
        }

        if (
          !window.confirm(
            `This will replace all existing data with ${parsed.length} transactions. Continue?`,
          )
        ) {
          return
        }

        saveTransactions(parsed)
        alert("Data imported successfully!")
      } catch (err) {
        alert("Failed to parse JSON file. Please check the file format.")
      }
    }
    reader.readAsText(file)

    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  // Totals
  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0)

  const totalExpenses = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0)

  const netBalance = totalIncome - totalExpenses

  // Newest first (by date descending)
  const sortedTransactions = [...transactions].sort((a, b) =>
    b.date.localeCompare(a.date),
  )

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-4">
      <title>Expenses</title>
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-bold text-cyan-400 mb-6 text-center flex items-center justify-center gap-3">
          <Link to="/apps" className="hover:opacity-80">
            🚪
          </Link>
          <span>💎 Gems Ledger</span>
        </h1>

        {/* Totals */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
            <p className="text-sm text-gray-400">Income</p>
            <p className="text-xl font-semibold text-green-400">
              {formatAmount(totalIncome, "income")}
            </p>
          </div>
          <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
            <p className="text-sm text-gray-400">Expenses</p>
            <p className="text-xl font-semibold text-red-400">
              {formatAmount(totalExpenses, "expense")}
            </p>
          </div>
          <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
            <p className="text-sm text-gray-400">Balance</p>
            <p
              className={`text-xl font-semibold ${
                netBalance >= 0 ? "text-green-400" : "text-red-400"
              }`}
            >
              {formatNetAmount(netBalance)}
            </p>
          </div>
        </div>

        {/* Add Transaction Form */}
        <form
          onSubmit={addTransaction}
          className="bg-gray-900 rounded-lg p-4 border border-gray-800 mb-6 space-y-4"
        >
          <h2 className="text-lg font-semibold text-cyan-300">
            Add Transaction
          </h2>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
              placeholder="e.g., Groceries"
              className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-sm text-gray-400 mb-1">Amount</label>
              <input
                type="number"
                step="1"
                min="1"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                required
                placeholder="0"
                className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm text-gray-400 mb-1">Type</label>
              <div className="flex rounded-md overflow-hidden border border-gray-700">
                <button
                  type="button"
                  onClick={() => setType("income")}
                  className={`flex-1 flex items-center justify-center gap-1 px-2 py-2 text-sm font-medium transition-colors ${
                    type === "income"
                      ? "bg-cyan-600 text-white"
                      : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                  }`}
                >
                  <PlusIcon size={16} weight="bold" />
                  Income
                </button>
                <button
                  type="button"
                  onClick={() => setType("expense")}
                  className={`flex-1 flex items-center justify-center gap-1 px-2 py-2 text-sm font-medium transition-colors ${
                    type === "expense"
                      ? "bg-cyan-600 text-white"
                      : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                  }`}
                >
                  <MinusIcon size={16} weight="bold" />
                  Expense
                </button>
              </div>
            </div>
            <div className="flex-1">
              <label className="block text-sm text-gray-400 mb-1">Date</label>
              <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                required
                className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-semibold py-2 px-4 rounded transition-colors"
          >
            Add Transaction
          </button>
        </form>

        {/* Import / Export Buttons */}
        <div className="flex gap-3 mb-4">
          <button
            type="button"
            onClick={exportData}
            className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-gray-200 px-4 py-2 rounded border border-gray-700 transition-colors text-sm"
          >
            <DownloadSimpleIcon size={18} />
            Export
          </button>
          <label className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-gray-200 px-4 py-2 rounded border border-gray-700 transition-colors text-sm cursor-pointer">
            <UploadSimpleIcon size={18} />
            Import
            <input
              ref={fileInputRef}
              type="file"
              accept=".json,application/json"
              onChange={importData}
              className="hidden"
            />
          </label>
        </div>

        {/* Transactions List */}
        <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
          <h2 className="text-lg font-semibold text-cyan-300 p-4 border-b border-gray-800">
            Transactions
          </h2>

          {sortedTransactions.length === 0 ? (
            <p className="text-gray-500 p-4 text-center">
              No transactions yet.
            </p>
          ) : (
            <ul className="divide-y divide-gray-800">
              {sortedTransactions.map(t => {
                const dateObj = new Date(t.date + "T00:00:00")
                const formattedDate = dateObj.toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })

                return (
                  <li
                    key={t.id}
                    className="flex items-center justify-between p-4 hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-400">{formattedDate}</p>
                      <p className="text-white truncate">{t.title}</p>
                    </div>

                    <div className="flex items-center space-x-4 ml-4">
                      <span
                        className={`font-semibold ${
                          t.type === "income"
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        {formatAmount(t.amount, t.type)}
                      </span>
                      <button
                        onClick={() => deleteTransaction(t.id)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                        aria-label="Delete transaction"
                      >
                        <TrashIcon size={18} />
                      </button>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </div>

        {/* Delete All Data */}
        <div className="mt-8 text-center">
          <button
            onClick={deleteAllData}
            className="text-red-400 hover:text-red-300 underline text-sm transition-colors"
          >
            Delete All Data
          </button>
        </div>
      </div>
    </div>
  )
}
