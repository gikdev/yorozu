import { ArrowCounterClockwiseIcon, ClipboardIcon } from "@phosphor-icons/react"
import { createFileRoute, linkOptions } from "@tanstack/react-router"
import { useState } from "react"
import { btn } from "#/common/atoms/btn"
import { AppBar } from "#/common/molecules/page-header"

const TITLE = "Password Generator"

export const Route = createFileRoute("/apps/password-generator")({
  head: () => ({ meta: [{ title: TITLE }] }),
  component: RouteComponent,
})

function generatePassword(
  length: number,
  options: {
    uppercase: boolean
    lowercase: boolean
    numbers: boolean
    symbols: boolean
  },
): string {
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const lower = "abcdefghijklmnopqrstuvwxyz"
  const num = "0123456789"
  const sym = "!@#$%^&*()_+-=[]{}|;:,.<>?"

  let pool = ""
  if (options.uppercase) pool += upper
  if (options.lowercase) pool += lower
  if (options.numbers) pool += num
  if (options.symbols) pool += sym

  if (pool === "") pool = lower // fallback

  let result = ""
  const poolSize = pool.length
  for (let i = 0; i < length; i++) {
    result += pool.charAt(Math.floor(Math.random() * poolSize))
  }
  return result
}

function RouteComponent() {
  const [length, setLength] = useState(16)
  const [uppercase, setUppercase] = useState(true)
  const [lowercase, setLowercase] = useState(true)
  const [numbers, setNumbers] = useState(true)
  const [symbols, setSymbols] = useState(true)
  const [password, setPassword] = useState("")

  function generate() {
    setPassword(
      generatePassword(length, { uppercase, lowercase, numbers, symbols }),
    )
  }

  function copyPassword() {
    navigator.clipboard.writeText(password)
  }

  return (
    <div className="h-dvh flex flex-col overflow-hidden bg-mist-950 text-mist-400 max-w-240 mx-auto w-full">
      <AppBar title={TITLE} parentPath={linkOptions({ to: "/apps" })}>
        <button
          className={btn({ isIcon: true })}
          onClick={copyPassword}
          type="button"
          disabled={!password}
          aria-label="Copy password"
        >
          <ClipboardIcon size={24} />
        </button>
        <button
          className={btn({ isIcon: true })}
          onClick={generate}
          type="button"
          aria-label="Generate new password"
        >
          <ArrowCounterClockwiseIcon size={24} />
        </button>
      </AppBar>

      <main className="flex-1 flex flex-col gap-6 p-4 overflow-y-auto min-h-0">
        {/* Display password */}
        {password && (
          <div className="bg-mist-900 rounded p-3 text-xl font-mono break-all text-center">
            {password}
          </div>
        )}

        {/* Generate button (if no password yet) */}
        {!password && (
          <button
            type="button"
            className={btn({ theme: "primary" })}
            onClick={generate}
          >
            Generate password
          </button>
        )}

        {/* Length slider */}
        <div>
          {/** biome-ignore lint/a11y/noLabelWithoutControl: 大丈夫！ */}
          <label className="block text-sm text-mist-500 mb-1">
            Length: {length}
          </label>
          <input
            type="range"
            min="4"
            max="64"
            value={length}
            onChange={e => setLength(parseInt(e.target.value, 10))}
            className="w-full accent-deep-sky-500"
          />
        </div>

        {/* Character type checkboxes */}
        <div className="grid grid-cols-2 gap-2">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={uppercase}
              onChange={e => setUppercase(e.target.checked)}
              className="accent-deep-sky-500"
            />
            Uppercase (A–Z)
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={lowercase}
              onChange={e => setLowercase(e.target.checked)}
              className="accent-deep-sky-500"
            />
            Lowercase (a–z)
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={numbers}
              onChange={e => setNumbers(e.target.checked)}
              className="accent-deep-sky-500"
            />
            Numbers (0–9)
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={symbols}
              onChange={e => setSymbols(e.target.checked)}
              className="accent-deep-sky-500"
            />
            Symbols (!@#...)
          </label>
        </div>

        {/* Regenerate button (if password exists) */}
        {password && (
          <button
            type="button"
            className={btn({ theme: "glass" })}
            onClick={generate}
          >
            <ArrowCounterClockwiseIcon size={20} /> Regenerate
          </button>
        )}

        {/* Password strength indicator (optional) */}
        {password && (
          <div className="text-xs text-mist-500">
            Strength:{" "}
            {password.length >= 16 &&
            uppercase &&
            lowercase &&
            numbers &&
            symbols
              ? "Strong"
              : "Good"}
          </div>
        )}
      </main>
    </div>
  )
}
