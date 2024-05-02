import { ReactNode } from "react"
import styles from './styles/Alert.module.css'

export const Alert = ({children} : {children : ReactNode}) => {
  return (
    <div className={styles.alert}>{children}</div>
  )
}
