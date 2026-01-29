import assets from '../../assets.json'
import type { ResourceName, Resources, ResourcesToggle } from '../../game-data'
import { Icon } from '../Icon'
import styles from './styles.module.css'

interface ResourceTallyProps {
  index: number
  title: string
  resources: ResourcesToggle
  warn: ResourcesToggle
  value: Resources
}

export function ResourceTally(props: ResourceTallyProps) {
  const ResourceAmount = (what: ResourceName) => (
    <span
      hidden={!props.resources[what]}
      className={props.warn[what] ? styles.warn : ''}
    >
      {' '}
      <Icon src={assets[what]} alt={what} /> {props.value[what].toFixed(1)}
    </span>
  )

  return (
    <p className={styles.header} style={{ '--index': props.index }}>
      <span className={styles.title}>{props.title}</span>
      {ResourceAmount('minerals')}
      {ResourceAmount('gas')}
      {ResourceAmount('larva')} / min
    </p>
  )
}
