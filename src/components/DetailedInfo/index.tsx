import assets from '../../assets.json'
import type { ResourcesToggle, Unit } from '../../game-data'
import { Icon } from '../Icon'
import styles from './styles.module.css'

interface DetailedInfoProps {
  fields: ResourcesToggle
  item: Unit
}

const detailedFields = ['minerals', 'gas', 'larva', 'time'] as const

export function DetailedInfo(props: DetailedInfoProps) {
  const values = props.item.real

  if (!values) {
    return null
  }

  return (
    <div className={styles.root}>
      {detailedFields
        .filter((field) => field === 'time' || props.fields[field])
        .map((field) => (
          <div key={field} className={styles.item}>
            <Icon scale={0.5} src={assets[field]} alt={field} />
            {values[field].toFixed(0)}
          </div>
        ))}
    </div>
  )
}
