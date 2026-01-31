import { Fragment, useMemo } from 'react'

import { dataByRace } from '../../game-data'
import { CounterGroup } from '../CounterGroup'

import {
  setExpensesMode,
  setRace,
  updateProduction,
  updateWorkers,
  useStore,
} from '../../store'
import { MultiCounterGroup } from '../MultiCounterGroup'
import { RacePicker } from '../RacePicker'
import { ResourceTally } from '../ResourceTally'

import assets from '../../assets.json'
import {
  calculateIncome,
  calculteExpenses,
  type ExpensesMode,
} from '../../economy'
import { useTheme } from '../../useTheme'
import { getAsset } from '../../utils'
import { Radio, type RadioOption } from '../Radio'

const workerIcon = {
  terran: assets.scv,
  zerg: assets.drone,
  protoss: assets.probe,
}

const modes: RadioOption<ExpensesMode>[] = [
  { value: 'number-of-queues', label: 'number of queues' },
  { value: 'units-per-minute', label: 'units per minute (best for zerg)' },
]

export function App() {
  const [state, dispatch] = useStore()
  const { race, workers, production, expensesMode } = state

  useTheme(race)

  const income = useMemo(() => calculateIncome(workers), [workers])
  const expenses = useMemo(
    () => calculteExpenses(production, dataByRace[race].units, expensesMode),
    [production, race, expensesMode],
  )

  const warn = {
    minerals: income.minerals < expenses.minerals,
    gas: income.gas < expenses.gas,
    larva: income.larva < expenses.larva,
  }

  const gameData = dataByRace[race]

  const getIcon = (k1: string, k2: string) => {
    if (k2 === 'nodes') {
      return getAsset(k1)
    } else if (k2 === 'workers') {
      return workerIcon[race]
    }
    return getAsset(k2)
  }

  return (
    <Fragment key={race}>
      <RacePicker value={race} onChange={(race) => dispatch(setRace(race))} />
      {/* <fieldset className="grid" style={{ display: 'flex', gap: '0.25rem' }}>
        <button style={{height: '2.5rem', lineHeight: '0'}}>+1 base</button>
        <button style={{height: '2.5rem', lineHeight: '0' }}>-1 base</button>
      </fieldset> */}
      <ResourceTally
        index={0}
        title="Income"
        resources={gameData.resources}
        warn={warn}
        value={income}
      />
      <MultiCounterGroup
        getIcon={getIcon}
        counters={state.workers}
        setCount={(k1, k2, v) => dispatch(updateWorkers(k1, k2, v))}
      />
      <ResourceTally
        index={1}
        title="Production"
        resources={gameData.resources}
        warn={warn}
        value={expenses}
      />
      <Radio
        options={modes}
        value={expensesMode}
        onChange={(v) => dispatch(setExpensesMode(v))}
      />
      <CounterGroup
        data={gameData.units}
        resources={gameData.resources}
        counters={production}
        onCounterChange={(k, v) => dispatch(updateProduction(k, v))}
      />
    </Fragment>
  )
}
