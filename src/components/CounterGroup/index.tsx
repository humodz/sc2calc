import { useMemo, useState, useEffect } from 'react'
import type { Resources } from '../../data'
import { getAsset, mapValues, updateRecord } from '../../utils'
import { Counter } from '../Counter'
import { Icon } from '../Icon'
import assets from '../../assets.json'

import styles from './styles.module.css'

interface CounterGroupProps {
  title: string
  data: Record<string, Resources>
  warn: { minerals: boolean, gas: boolean }
  value: Resources
  onChange: (value: Resources) => void
}

export function CounterGroup(props: CounterGroupProps) {
  const { data, onChange } = props

  const dataKeys = useMemo(() => Object.keys(data), [data])

  const [counters, setCounters] = useState(() => mapValues(data, () => 0))

  useEffect(() => {
    const newValue = dataKeys
      .reduce((acc, it) => ({
        minerals: acc.minerals + counters[it] * data[it].minerals,
        gas: acc.gas + counters[it] * data[it].gas,
      }), {
        minerals: 0,
        gas: 0,
      })
    onChange(newValue)
  }, [ dataKeys, counters, data, onChange ])

  return (
    <section className={styles.group} >
      <p className={styles.header}>
        <div className={styles.title}>{props.title}</div>
        <span className={props.warn.minerals ? styles.warn : ''}>
          <Icon src={assets.minerals} /> {props.value.minerals.toFixed(1)}
        </span>
        <span className={props.warn.gas ? styles.warn : ''}>
          <Icon src={assets.gas} /> {props.value.gas.toFixed(1)}
        </span>
        {' '}/ min
      </p>
      <div className={styles.items}>
        {
          dataKeys.map(it => (
            <Counter
              icon={getAsset(it)}
              label={it}
              count={counters[it]}
              setCount={c => setCounters(updateRecord(it, c))}
            />
          ))
        }
      </div>
    </section>
  )
}


