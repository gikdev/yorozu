import { createFileRoute, Link } from "@tanstack/react-router"
import { useCallback, useEffect, useState } from "react"

export const Route = createFileRoute("/apps/choice")({
  component: FocusChoiceApp,
})

const STORAGE_KEY = "focus-choice-items"

export default function FocusChoiceApp() {
  // --- Shared state with localStorage ---
  const [items, setItems] = useState<string[]>(() => {
    // Load from localStorage on initial render
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed)) return parsed
      } catch (e) {
        console.error("Failed to load from localStorage", e)
      }
    }
    return []
  })
  const [itemInput, setItemInput] = useState("")
  const [stage, setStage] = useState<
    | "input"
    | "selectMode"
    | "tournament"
    | "tournamentResult"
    | "ranking"
    | "rankingResult"
  >("input")

  // --- Tournament state ---
  const [pairs, setPairs] = useState<[string, string | undefined][]>([])
  const [currentPairIdx, setCurrentPairIdx] = useState(0)
  const [roundWinners, setRoundWinners] = useState<string[]>([])
  const [finalChampion, setFinalChampion] = useState<string | null>(null)

  // --- Ranking state ---
  const [rankingList, setRankingList] = useState<string[] | null>(null)
  const [rankA, setRankA] = useState<string | null>(null)
  const [rankB, setRankB] = useState<string | null>(null)
  const [resolveRanking, setResolveRanking] = useState<
    ((v: boolean) => void) | null
  >(null)

  // --- Save to localStorage whenever items change ---
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  // --- Add / remove items ---
  const addItem = useCallback(() => {
    const t = itemInput.trim()
    if (t && !items.includes(t)) {
      setItems(prev => [...prev, t])
      setItemInput("")
    }
  }, [itemInput, items])

  const removeItem = (i: number) =>
    setItems(prev => prev.filter((_, idx) => idx !== i))

  // --- Start tournament ---
  const startTournament = () => {
    if (items.length < 2) {
      alert("Need at least 2 items.")
      return
    }
    const pairs = makePairs(items)
    setPairs(pairs)
    setCurrentPairIdx(0)
    setRoundWinners([])
    setFinalChampion(null)
    setStage("tournament")
  }

  // Handle tournament match choice
  const handleTournamentPick = (pick: string) => {
    // Copy round winners and add the pick
    const newWinners = [...roundWinners, pick]
    setRoundWinners(newWinners)

    // Move to next pair or finish round
    if (currentPairIdx + 1 < pairs.length) {
      setCurrentPairIdx(prev => prev + 1)
    } else {
      // Round finished. If only one winner left, champion!
      if (newWinners.length === 1) {
        setFinalChampion(newWinners[0])
        setStage("tournamentResult")
      } else {
        // Prepare next round with winners
        const nextPairs = makePairs(newWinners)
        setPairs(nextPairs)
        setCurrentPairIdx(0)
        setRoundWinners([])
      }
    }
  }

  // For byes (single player automatically advances)
  const tournamentPair = pairs[currentPairIdx]
  const isBye = tournamentPair && tournamentPair[1] === undefined

  // --- Start ranking ---
  const startRanking = async () => {
    if (items.length < 2) {
      alert("Need at least 2 items.")
      return
    }
    setStage("ranking")
    // We'll run the merge sort, presenting comparisons as they occur.
    // We need to manage total/completed counts.
    // The number of comparisons in merge sort varies, but we can show progress after sorting finishes.
    const sorted = await mergeSortWithUserChoice(items, (a, b) => {
      return new Promise<boolean>(resolve => {
        setRankA(a)
        setRankB(b)
        setResolveRanking(() => resolve)
      })
    })
    setRankingList(sorted)
    setStage("rankingResult")
  }

  // Handle ranking choice
  const handleRankingChoice = (pickLeft: boolean) => {
    if (resolveRanking) {
      resolveRanking(pickLeft)
      setResolveRanking(null)
      setRankA(null)
      setRankB(null)
    }
  }

  // --- Reset (clears localStorage) ---
  const reset = () => {
    setStage("input")
    setFinalChampion(null)
    setRankingList(null)
    setItems([])
    setPairs([])
    setRoundWinners([])
    localStorage.removeItem(STORAGE_KEY)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center p-4">
      <title>Choice</title>
      <div className="w-full max-w-lg mx-auto space-y-6">
        {/* Heading */}
        <h1 className="text-2xl font-bold text-center text-cyan-300">
          <Link to="/apps">🚪</Link>
          <span>Pairwise Chooser</span>
        </h1>

        {/* Input stage */}
        {stage === "input" && (
          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={itemInput}
                onChange={e => setItemInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && addItem()}
                placeholder="Add an item..."
                className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-gray-400"
              />
              <button
                type="button"
                onClick={addItem}
                className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-lg transition"
              >
                Add
              </button>
            </div>

            {/* Item list */}
            {items.length > 0 && (
              <ul className="space-y-1 max-h-40 overflow-y-auto">
                {items.map((item, i) => (
                  <li
                    // biome-ignore lint/suspicious/noArrayIndexKey: いいんだよ！
                    key={i}
                    className="flex justify-between items-center bg-gray-800 px-3 py-2 rounded"
                  >
                    <span>{item}</span>
                    <button
                      type="button"
                      onClick={() => removeItem(i)}
                      className="text-gray-400 hover:text-red-400 ml-2"
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {/* Mode selection */}
            {items.length >= 2 && (
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Choose mode:</p>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={startTournament}
                    className="flex-1 py-2 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition"
                  >
                    🏆 Winner
                  </button>
                  <button
                    type="button"
                    onClick={startRanking}
                    className="flex-1 py-2 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition"
                  >
                    📋 Full Ranking
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tournament active */}
        {stage === "tournament" && tournamentPair && (
          <div className="text-center space-y-6">
            <p className="text-sm text-gray-400">
              Round{" "}
              {finalChampion
                ? "final"
                : `match ${currentPairIdx + 1} of ${pairs.length}`}
            </p>
            {!isBye ? (
              <>
                <p className="text-gray-300">Which one is better?</p>
                <div className="flex gap-4 justify-center">
                  <button
                    type="button"
                    // biome-ignore lint/style/noNonNullAssertion: いいんだよ！
                    onClick={() => handleTournamentPick(tournamentPair[0]!)}
                    className="w-1/2 py-4 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-lg text-lg transition"
                  >
                    {tournamentPair[0]}
                  </button>
                  <button
                    // biome-ignore lint/style/noNonNullAssertion: いいんだよ！
                    onClick={() => handleTournamentPick(tournamentPair[1]!)}
                    type="button"
                    className="w-1/2 py-4 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-lg text-lg transition"
                  >
                    {tournamentPair[1]}
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="text-gray-300">Bye — automatically advances:</p>
                <button
                  // biome-ignore lint/style/noNonNullAssertion: いいんだよ！
                  onClick={() => handleTournamentPick(tournamentPair[0]!)}
                  className="w-full py-4 bg-gray-700 text-white font-bold rounded-lg text-lg"
                  type="button"
                >
                  {tournamentPair[0]} (auto‑advance)
                </button>
              </>
            )}
          </div>
        )}

        {/* Tournament result */}
        {stage === "tournamentResult" && finalChampion && (
          <div className="text-center space-y-6">
            <p className="text-gray-400 uppercase tracking-wide">Champion</p>
            <h2 className="text-4xl font-extrabold text-cyan-300">
              {finalChampion}
            </h2>
            <button
              onClick={reset}
              type="button"
              className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition"
            >
              Start Over
            </button>
          </div>
        )}

        {/* Ranking in progress */}
        {stage === "ranking" && rankA && rankB && (
          <div className="text-center space-y-6">
            <p className="text-sm text-gray-400">Which is better?</p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => handleRankingChoice(true)}
                type="button"
                className="w-1/2 py-4 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-lg text-lg transition"
              >
                {rankA}
              </button>
              <button
                onClick={() => handleRankingChoice(false)}
                type="button"
                className="w-1/2 py-4 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-lg text-lg transition"
              >
                {rankB}
              </button>
            </div>
          </div>
        )}

        {/* Ranking result */}
        {stage === "rankingResult" && rankingList && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-cyan-300 text-center">
              Ranked List
            </h2>
            <ol className="space-y-1">
              {rankingList.map((item, i) => (
                <li
                  // biome-ignore lint/suspicious/noArrayIndexKey: いいんだよ！
                  key={i}
                  className="flex items-center gap-3 bg-gray-800 px-4 py-2 rounded"
                >
                  <span className="text-cyan-400 font-bold w-6">{i + 1}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
            <button
              onClick={reset}
              type="button"
              className="w-full py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition"
            >
              Start Over
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// Shuffle helper
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// Pair items into matches (with possible bye)
function makePairs(items: string[]): [string, string | undefined][] {
  const shuffled = shuffle(items)
  const pairs: [string, string | undefined][] = []
  for (let i = 0; i < shuffled.length; i += 2) {
    pairs.push([shuffled[i], shuffled[i + 1]])
  }
  return pairs
}

// --- Ranking: asynchronous merge sort using a user-choosing promise ---
async function mergeSortWithUserChoice<T>(
  items: T[],
  askUser: (a: T, b: T) => Promise<boolean>,
): Promise<T[]> {
  if (items.length <= 1) return items
  const mid = Math.floor(items.length / 2)
  const left = await mergeSortWithUserChoice(items.slice(0, mid), askUser)
  const right = await mergeSortWithUserChoice(items.slice(mid), askUser)
  return merge(left, right, askUser)
}

async function merge<T>(
  left: T[],
  right: T[],
  askUser: (a: T, b: T) => Promise<boolean>,
): Promise<T[]> {
  const result: T[] = []
  let i = 0,
    j = 0
  while (i < left.length && j < right.length) {
    const pickLeft = await askUser(left[i], right[j])
    if (pickLeft) {
      result.push(left[i++])
    } else {
      result.push(right[j++])
    }
  }
  return result.concat(left.slice(i)).concat(right.slice(j))
}
