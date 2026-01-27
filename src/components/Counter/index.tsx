import { parseInteger } from '../../utils'
import styles from './styles.module.css'

interface CounterProps {
  icon: string
  label: string
  count: number
  setCount: (v: number) => void
}

export function Counter(props: CounterProps) {
  return (
    <fieldset className={styles.counter}>
      <input
        style={{ '--icon': `url(${props.icon})` }}
        title={props.label}
        value={props.count}
        onChange={e => props.setCount(parseInteger(e.target.value))}
      />
      <button onClick={() => props.setCount(Math.max(0, props.count - 1))}>-</button>
      <button onClick={() => props.setCount(props.count + 1)}>+</button>
    </fieldset>
  )
}
