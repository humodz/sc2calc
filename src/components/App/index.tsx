import { Fragment, useEffect } from 'react'

import { dataByRace } from '../../game-data'
import { CounterGroup } from '../CounterGroup'

import { setRace, updateProduction, updateWorkers, useStore } from '../../store'
import { RacePicker } from '../RacePicker'
import { ResourceTally } from '../ResourceTally'

export function App() {
  const [state, dispatch] = useStore()
  const { race, income, expenses, workers, production } = state

  useTheme(race)

  const warn = {
    minerals: income.minerals < expenses.minerals,
    gas: income.gas < expenses.gas,
    larva: income.larva < expenses.larva,
  }

  const gameData = dataByRace[race]

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
      <CounterGroup
        data={gameData.incomeSources}
        resources={gameData.resources}
        counters={workers}
        onCounterChange={(k, v) => dispatch(updateWorkers(k, v))}
      />
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
