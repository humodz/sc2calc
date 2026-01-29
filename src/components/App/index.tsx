import { useEffect, useState } from 'react'

import {
  type Race,
  incomeSourcesByRace,
  resourceTypesByRace,
  unitsByRace,
} from '../../game-data'
import { CounterGroup } from '../CounterGroup'

import { RacePicker } from '../RacePicker'

export function App() {
  const [race, setRace] = useState<Race>('terran')
  const [income, setIncome] = useState({ minerals: 0, gas: 0, larva: 0 })
  const [expenses, setExpenses] = useState({ minerals: 0, gas: 0, larva: 0 })

  const themeSelector = 'link[data-theme-for]'

  useEffect(() => {
    document.head
      .querySelectorAll(themeSelector)
      .forEach((el) => el.parentElement?.appendChild(el))
  }, [])

  useEffect(() => {
    document.head.querySelectorAll(themeSelector).forEach((el: Element) => {
      const link = el as HTMLLinkElement
      link.disabled = link.dataset.themeFor !== race
    })
  }, [race])

  const warn = {
    minerals: income.minerals < expenses.minerals,
    gas: income.gas < expenses.gas,
    larva: income.larva < expenses.larva,
  }

  return (
    <>
      <RacePicker value={race} onChange={setRace} />
      <CounterGroup
        key={'workers-' + race}
        index={0}
        title="Workers"
        data={incomeSourcesByRace[race]}
        resources={resourceTypesByRace[race]}
        warn={warn}
        value={income}
        onChange={setIncome}
      />
      <CounterGroup
        key={'production-' + race}
        index={1}
        title="Production"
        data={unitsByRace[race]}
        resources={resourceTypesByRace[race]}
        warn={warn}
        value={expenses}
        onChange={setExpenses}
      />
    </>
  )
}
