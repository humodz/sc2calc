import { Fragment } from 'react/jsx-runtime'
import assets from '../../assets.json'
import { type Race, races } from '../../game-data'
import { cssUrl } from '../../utils'
import styles from './styles.module.css'

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
              type="radio"
              name="race-picker"
              value={value}
              id={value}
              onChange={() => props.onChange(value)}
              checked={props.value === value}
            />
            <label
              htmlFor={value}
              style={{ '--bg': cssUrl(assets[value]) }}
            ></label>
          </Fragment>
        ))}
      </fieldset>
    </form>
  )
}
