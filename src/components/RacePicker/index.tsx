import { type Race, races } from '../../game-data'
import assets from '../../assets.json'
import styles from './styles.module.css'
import { cssUrl } from '../../utils'
import { Fragment } from 'react/jsx-runtime'

interface RacePickerProps {
  value: Race
  onChange: (value: Race) => void
}

export function RacePicker(props: RacePickerProps) {
  return (
    <form>
      <fieldset className={styles.racePicker}>
        {races.map((value) => (
          <Fragment key={value}>
            <input
              type='radio'
              name='race-picker'
              value={value}
              id={value}
              onChange={() => props.onChange(value)}
              checked={props.value === value}
            />
            <label htmlFor={value} style={{ '--bg': cssUrl(assets[value]) }}>
            </label>
          </Fragment>
        ))}
      </fieldset>
    </form>
  )
}