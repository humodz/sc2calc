import { type Race, races } from '../../game-data'
import assets from '../../assets.json'
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
            <label key={'label' + value} htmlFor={value} style={{ '--bg': `url(${assets[value]})` }}>
            </label>
          </>
        ))}
      </fieldset>
    </form>
  )
}