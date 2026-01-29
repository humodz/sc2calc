import { useEffect, useState } from 'react'

import { type Race, dataByRace } from '../../game-data'
import { CounterGroup } from '../CounterGroup'

import { RacePicker } from '../RacePicker'

export function App() {
  const [race, setRace] = useState<Race>('terran')
  const [income, setIncome] = useState({ minerals: 0, gas: 0, larva: 0 })
  const [expenses, setExpenses] = useState({ minerals: 0, gas: 0, larva: 0 })

  useTheme(race)

  const warn = {
    minerals: income.minerals < expenses.minerals,
    gas: income.gas < expenses.gas,
    larva: income.larva < expenses.larva,
  }

  const gameData = dataByRace[race]

  return (
    <>
      <RacePicker value={race} onChange={setRace} />
      <CounterGroup
        key={'workers-' + race}
        index={0}
        title="Workers"
        data={gameData.incomeSources}
        resources={gameData.resources}
        warn={warn}
        value={income}
        onChange={setIncome}
      />
      <CounterGroup
        key={'production-' + race}
        index={1}
        title="Production"
        data={gameData.units}
        resources={gameData.resources}
        warn={warn}
        value={expenses}
        onChange={setExpenses}
      />
    </>
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
