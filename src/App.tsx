import { useState } from 'react'

import { incomeSources, terranUnits } from './data'
import { CounterGroup } from './components/CounterGroup'


export function App() {
  const [income, setIncome] = useState({ minerals: 0, gas: 0})
  const [expenses, setExpenses] = useState({ minerals: 0, gas: 0})


  const warn = {
    minerals: income.minerals < expenses.minerals,
    gas: income.gas < expenses.gas,
  }

  return (
    <>
      <CounterGroup
        title='Income'
        data={incomeSources}
        warn={warn}
        value={income}
        onChange={setIncome}
      />
      <CounterGroup
        title='Expenses'
        data={terranUnits}
        warn={warn}
        value={expenses}
        onChange={setExpenses}
      />
    </>
  )
}

