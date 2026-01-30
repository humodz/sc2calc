import { useReducer } from 'react'
import { dataByRace, type Race, type Resources } from './game-data'
import { createDict, mapValues } from './utils'

export interface AppState {
  race: Race
  expenses: Resources
  workers2: Record<string, Record<string, number>>
  production: Record<string, number>
}

function initialState(race: Race): AppState {
  const units = dataByRace[race].units
  const income2 = dataByRace[race].incomeSourcesV2

  return {
    race,
    expenses: { minerals: 0, gas: 0, larva: 0 },
    workers2: mapValues(income2, (keys) => createDict(keys, 0)),
    production: mapValues(units, () => 0),
  }
}

export const setRace = (race: Race) => () => initialState(race)

export const updateWorkers2 =
  (section: string, counter: string, value: number) =>
  (state: AppState): AppState => {
    const updatedSection = {
      ...state.workers2[section],
      [counter]: value,
    }

    const updatedWorkers = {
      ...state.workers2,
      [section]: updatedSection,
    }

    return {
      ...state,
      workers2: updatedWorkers,
    }
  }

export const updateProduction =
  (key: string, value: number) =>
  (state: AppState): AppState => {
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

// TODO move to economy
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
