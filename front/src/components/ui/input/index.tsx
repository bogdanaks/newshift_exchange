import React from 'react'

import styles from './styles.module.scss'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeHolder?: string
  readOnly?: boolean
  customStyles?: React.CSSProperties
}

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  placeHolder,
  readOnly = false,
  customStyles,
  ...props
}) => (
  <input
    {...props}
    style={{ ...customStyles }}
    className={styles.wrapper}
    placeholder={placeHolder}
    onChange={onChange}
    value={value}
    readOnly={readOnly}
  />
)

export default Input