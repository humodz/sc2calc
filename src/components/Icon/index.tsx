import styles from './styles.module.css'

interface IconProps {
  src: string
  alt?: string
  scale?: number
  align?: string
}

export function Icon(props: IconProps) {
  return (
    <img
      style={{
        '--scale': String(props.scale ?? 1),
        verticalAlign: props.align ?? 'baseline',
      }}
      className={styles.icon}
      src={props.src}
      alt={props.alt}
      title={props.alt}
    />
  )
}
