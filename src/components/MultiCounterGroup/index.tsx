import { Counter } from '../Counter'

import styles from './styles.module.css'

interface MultiCounterGroupProps {
  getIcon: (section: string, counter: string) => string
  counters: Record<string, Record<string, number>>
  setCount: (section: string, counter: string, value: number) => void
}

export function MultiCounterGroup(props: MultiCounterGroupProps) {
  return (
    <div className={styles.container}>
      {Object.keys(props.counters).map((key, i) => (
        <MultiCounter
          key={i}
          label={key}
          getIcon={(c) => props.getIcon(key, c)}
          counters={props.counters[key]}
          setCount={(k, v) => props.setCount(key, k, v)}
        />
      ))}
    </div>
  )
}

interface MultiCounterProps {
  label: string
  getIcon: (key: string) => string
  counters: Record<string, number>
  setCount: (key: string, value: number) => void
}

function MultiCounter(props: MultiCounterProps) {
  return (
    <div>
      {Object.keys(props.counters).map((counter, i) => (
        <Counter
          key={i}
          label={i == 0 ? props.label : undefined}
          icon={props.getIcon(counter)}
          count={props.counters[counter]}
          setCount={(c) => props.setCount(counter, c)}
        />
      ))}
    </div>
  )
}
