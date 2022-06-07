import React from 'react'

import styles from './styles.module.scss'

interface ButtonProps {
  children: React.ReactNode,
}

const Button: React.FC<ButtonProps> = ({
  children,
}) => {
  return (
    <button className={styles.wrapper}>{children}</button>
  )
}

export default Button