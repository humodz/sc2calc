import { useMemo, useState, useEffect } from 'react'
import type { ResourceName, Resources, ResourcesToggle } from '../../game-data'
import { getAsset, mapValues, updateRecord } from '../../utils'
import { Counter } from '../Counter'
import { Icon } from '../Icon'
import assets from '../../assets.json'

import styles from './styles.module.css'

interface CounterGroupProps {
  index: number
  title: string
  data: Record<string, Resources>
  resources: ResourcesToggle
  warn: ResourcesToggle
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
        larva: acc.larva + counters[it] * data[it].larva,
      }), {
        minerals: 0,
        gas: 0,
        larva: 0,
      })
    onChange(newValue)
  }, [ dataKeys, counters, data, onChange ])

  const ResourceAmount = (what: ResourceName) => (
    <span hidden={!props.resources[what]} className={props.warn[what] ? styles.warn : ''}>
      {' '}<Icon src={assets[what]} alt={what} /> {props.value[what].toFixed(1)}
    </span>
  )

  return (
    <>
      <p className={styles.header} style={{ '--index': props.index }}>
        <span className={styles.title}>{props.title}</span>
        {ResourceAmount('minerals')}
        {ResourceAmount('gas')}
        {ResourceAmount('larva')}
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
            >
              <DetailedInfo
                fields={props.resources}
                item={data[it]}
              />
            </Counter>
          ))
        }
      </div>
    </>
  )
}

interface DetailedInfoProps {
  fields: ResourcesToggle
  item: Resources
}

const detailedFields = ['minerals', 'gas', 'larva', 'time'] as const

export function DetailedInfo(props: DetailedInfoProps) {
  const values = props.item.real

  if (!values) {
    return null
  }

  return (
    <div style={{ fontSize: '0.5em', lineHeight: 'initial', paddingTop: '1px' }}>
      {detailedFields
        .filter(field => field === 'time' || props.fields[field])
        .map(field => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.2em', minWidth: '28px' }}>
          <Icon scale={0.5} src={assets[field]} alt={field}/>
          {values[field]}
        </div>
      ))}
    </div>
  )
}