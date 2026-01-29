import { useMemo } from 'react'
import type { Resources, ResourcesToggle } from '../../game-data'
import { getAsset } from '../../utils'
import { Counter } from '../Counter'
import { DetailedInfo } from '../DetailedInfo'
import styles from './styles.module.css'

interface CounterGroupProps {
  resources: ResourcesToggle
  data: Record<string, Resources>
  counters: Record<string, number>
  onCounterChange: (key: string, value: number) => void
}

export function CounterGroup(props: CounterGroupProps) {
  const counterKeys = useMemo(
    () => Object.keys(props.counters),
    [props.counters],
  )

  return (
    <div className={styles.items}>
      {counterKeys.map((it) => (
        <Counter
          key={it}
          icon={getAsset(it)}
          label={it}
          count={props.counters[it]}
          setCount={(c) => props.onCounterChange(it, c)}
        >
          <DetailedInfo fields={props.resources} item={props.data[it]} />
        </Counter>
      ))}
    </div>
  )
}
