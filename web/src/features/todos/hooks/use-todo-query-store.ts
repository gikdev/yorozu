import {
  TodoBucketFilter,
  TodoSortBy,
  EnergyLevelFilter,
  TodoSortOrder,
} from "#/common/api/client"
import { create } from "zustand"

export type TodoQueryState = {
  bucket: TodoBucketFilter
  sortBy: TodoSortBy
  sortOrder: TodoSortOrder
  q: string | null
  excludeQuery: string | null
  availableEnergyLevel: EnergyLevelFilter
  availablePomodoros: number | null

  setBucket: (bucket: TodoBucketFilter) => void
  setSortBy: (sort: TodoSortBy) => void
  setSortOrder: (order: TodoSortOrder) => void
  setQuery: (q: string | null) => void
  setExcludeQuery: (q: string | null) => void
  setEnergyLevel: (level: EnergyLevelFilter) => void
  setPomodoros: (n: number | null) => void

  hasFilter: () => boolean

  reset: () => void
}

const defaultState = {
  bucket: TodoBucketFilter.ALL,
  sortBy: TodoSortBy.NONE,
  sortOrder: TodoSortOrder.ASC,
  q: null,
  excludeQuery: null,
  availableEnergyLevel: EnergyLevelFilter.ALL,
  availablePomodoros: null,
}

export const useTodoQueryStore = create<TodoQueryState>((set, get) => ({
  ...defaultState,

  setBucket: bucket => set({ bucket }),
  setSortBy: sortBy => set({ sortBy }),
  setSortOrder: sortOrder => set({ sortOrder }),
  setQuery: q => set({ q }),
  setExcludeQuery: excludeQuery => set({ excludeQuery }),
  setEnergyLevel: availableEnergyLevel => set({ availableEnergyLevel }),
  setPomodoros: availablePomodoros => set({ availablePomodoros }),

  hasFilter: () => {
    const currentState = get()

    const hasBucketChanged = currentState.bucket !== defaultState.bucket
    const hasSortByChanged = currentState.sortBy !== defaultState.sortBy
    const hasSortOrderChanged =
      currentState.sortOrder !== defaultState.sortOrder
    const hasQueryChanged = currentState.q !== defaultState.q
    const hasExcludeQueryChanged =
      currentState.excludeQuery !== defaultState.excludeQuery
    const hasAvailableEnergyLevelChanged =
      currentState.availableEnergyLevel !== defaultState.availableEnergyLevel
    const hasAvailablePomodorosChanged =
      currentState.availablePomodoros !== defaultState.availablePomodoros

    const hasFilter =
      hasBucketChanged ||
      hasSortByChanged ||
      hasSortOrderChanged ||
      hasQueryChanged ||
      hasExcludeQueryChanged ||
      hasAvailableEnergyLevelChanged ||
      hasAvailablePomodorosChanged

    return hasFilter
  },

  reset: () => set(defaultState),
}))
