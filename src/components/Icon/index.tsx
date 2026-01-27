import styles from './styles.module.css'

interface IconProps {
  src: string
}

export function Icon(props: IconProps) {
  return <img className={styles.icon} src={props.src}/>
}