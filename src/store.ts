import { useReducer } from 'react'
import type { ExpensesMode } from './economy'
import { dataByRace, type Race } from './game-data'
import { createDict, mapValues } from './utils'

export interface AppState {
  race: Race
  expensesMode: ExpensesMode
  workers: Record<string, Record<string, number>>
  production: Record<string, number>
}

function initialState(race: Race): AppState {
  const units = dataByRace[race].units
  const income = dataByRace[race].incomeSources

  return {
    race,
    expensesMode: race === 'zerg' ? 'units-per-minute' : 'number-of-queues',
    workers: mapValues(income, (keys) => createDict(keys, 0)),
    production: mapValues(units, () => 0),
  }
}

export const setRace = (race: Race) => () => initialState(race)

export const setExpensesMode =
  (expensesMode: ExpensesMode) => (s: AppState) => ({ ...s, expensesMode })

export const updateWorkers =
  (section: string, counter: string, value: number) =>
  (state: AppState): AppState => {
    const updatedSection = {
      ...state.workers[section],
      [counter]: value,
    }

    const updatedWorkers = {
      ...state.workers,
      [section]: updatedSection,
    }

    return {
      ...state,
      workers: updatedWorkers,
    }
  }

export const updateProduction =
  (key: string, value: number) =>
  (state: AppState): AppState => {
    const production = {
      ...state.production,
      [key]: value,
    }

    return {
      ...state,
      production,
    }
  }

function genericReducer<T>(state: T, action: (s: T) => T) {
  return action(state)
}

export function useStore() {
  return useReducer(genericReducer, initialState('terran'))
}
