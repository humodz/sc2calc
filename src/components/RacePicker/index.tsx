import { type Race, races } from '../../game-data'
import assets from '../../assets.json'
import styles from './styles.module.css'
import { cssUrl } from '../../utils'

interface RacePickerProps {
  value: Race
  onChange: (value: Race) => void
}

export function RacePicker(props: RacePickerProps) {
  return (
    <form>
      <fieldset className={styles.racePicker}>
        {races.map((value) => (
          <>
            <input
              key={'input' + value}
              type='radio'
              name='race-picker'
              value={value}
              id={value}
              onChange={() => props.onChange(value)}
              checked={props.value === value}
            />
            <label key={'label' + value} htmlFor={value} style={{ '--bg': cssUrl(assets[value]) }}>
            </label>
          </>
        ))}
      </fieldset>
    </form>
  )
}