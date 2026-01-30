import { Fragment, useEffect, useMemo } from 'react'

import { dataByRace } from '../../game-data'
import { CounterGroup } from '../CounterGroup'

import {
  setRace,
  updateProduction,
  updateWorkers2,
  useStore,
} from '../../store'
import { MultiCounterGroup } from '../MultiCounterGroup'
import { RacePicker } from '../RacePicker'
import { ResourceTally } from '../ResourceTally'

import assets from '../../assets.json'
import { calculateIncome } from '../../economy'
import { getAsset } from '../../utils'

const workerIcon = {
  terran: assets.scv,
  zerg: assets.drone,
  protoss: assets.probe,
}

export function App() {
  const [state, dispatch] = useStore()
  const { race, expenses, workers2, production } = state

  useTheme(race)

  const income = useMemo(() => calculateIncome(workers2), [workers2])

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
      <ResourceTally
        index={0}
        title="Workers"
        resources={gameData.resources}
        warn={warn}
        value={income}
      />
      <MultiCounterGroup
        getIcon={getIcon}
        counters={state.workers2}
        setCount={(k1, k2, v) => dispatch(updateWorkers2(k1, k2, v))}
      />
      {/* <CounterGroup
        data={gameData.incomeSources}
        resources={gameData.resources}
        counters={workers}
        onCounterChange={(k, v) => dispatch(updateWorkers(k, v))}
      /> */}
      <ResourceTally
        index={1}
        title="Production"
        resources={gameData.resources}
        warn={warn}
        value={expenses}
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

// TO-DO do it in a less stupid way
function useTheme(race: string) {
  const themeSelector = 'link[data-theme-for]'

  useEffect(() => {
    document.head.querySelectorAll(themeSelector).forEach((el: Element) => {
      const link = el as HTMLLinkElement

      if (link.dataset.themeFor === race) {
        link.parentElement?.appendChild(link)
      }
    })
  }, [race])
}
