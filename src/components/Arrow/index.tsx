// import styles from '../../styles/pages/arrows.module.css'
import styles from './styles.module.scss'

interface ArrowProps {
  onClick: (e: any) => void
  disabled: boolean
  left?: boolean
}

export function Arrow(props: ArrowProps) {
  const disabled = props.disabled ? styles.arrowDisabled : ''
  return (
    <svg
      onClick={props.onClick}
      className={`${styles.arrow} ${
        props.left ? styles.arrowLeft : styles.arrowRight
      } ${disabled}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {props.left && (
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      )}
      {!props.left && (
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
      )}
    </svg>
  )
}
