import { useReducer } from 'react'
import { dataByRace, type Race, type Resources } from './game-data'
import { mapValues } from './utils'

interface AppState {
  race: Race
  income: Resources
  expenses: Resources
  workers: Record<string, number>
  production: Record<string, number>
}

function initialState(race: Race): AppState {
  const income = dataByRace[race].incomeSources
  const units = dataByRace[race].units

  return {
    race,
    income: { minerals: 0, gas: 0, larva: 0 },
    expenses: { minerals: 0, gas: 0, larva: 0 },
    workers: mapValues(income, () => 0),
    production: mapValues(units, () => 0),
  }
}

export const setRace = (race: Race) => () => initialState(race)

export const updateWorkers =
  (key: string, value: number) => (state: AppState) => {
    const incomeSources = dataByRace[state.race].incomeSources

    const workers = {
      ...state.workers,
      [key]: value,
    }

    const income = recalculate(workers, incomeSources)

    return {
      ...state,
      income,
      workers,
    }
  }

export const updateProduction =
  (key: string, value: number) => (state: AppState) => {
    const units = dataByRace[state.race].units

    const production = {
      ...state.production,
      [key]: value,
    }

    const expenses = recalculate(production, units)

    return {
      ...state,
      expenses,
      production,
    }
  }

const recalculate = (
  counters: Record<string, number>,
  values: Record<string, Resources>,
) =>
  Object.keys(counters).reduce(
    (acc, it) => ({
      minerals: acc.minerals + counters[it] * values[it].minerals,
      gas: acc.gas + counters[it] * values[it].gas,
      larva: acc.larva + counters[it] * values[it].larva,
    }),
    {
      minerals: 0,
      gas: 0,
      larva: 0,
    },
  )

function genericReducer<T>(state: T, action: (s: T) => T) {
  return action(state)
}

export function useStore() {
  return useReducer(genericReducer, initialState('terran'))
}
