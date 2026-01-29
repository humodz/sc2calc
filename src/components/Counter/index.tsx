import { type PropsWithChildren, useId } from 'react'
import { cssUrl, parseInteger } from '../../utils'
import styles from './styles.module.css'

interface CounterProps {
  icon: string
  label: string
  count: number
  setCount: (v: number) => void
}

export function Counter(props: PropsWithChildren<CounterProps>) {
  const id = 'counter-' + useId()

  return (
    <div>
      <label htmlFor={id} className={styles.label}>
        {props.label}
      </label>
      <fieldset className={styles.counter}>
        <input
          style={{ '--icon': cssUrl(props.icon) }}
          id={id}
          value={props.count}
          onChange={(e) => props.setCount(parseInteger(e.target.value))}
        />
        <button onClick={() => props.setCount(Math.max(0, props.count - 1))}>
          -
        </button>
        <button onClick={() => props.setCount(props.count + 1)}>+</button>
        <div className={styles.children}>{props.children}</div>
      </fieldset>
    </div>
  )
}
