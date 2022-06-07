import React from 'react'
import Exchange from './components/exchange'

import { Currency } from '../../api/interfaces'

import styles from './styles.module.scss'

interface ExchangeBlockProps {
  error: string | null
  valueFrom: string
  valueTo: string
  currencies: Currency[]
  onValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  setCurrencyFrom: React.Dispatch<React.SetStateAction<Currency | undefined>>
  setCurrencyTo: React.Dispatch<React.SetStateAction<Currency | undefined>>
  onArrowClick: () => void
}

const ExchangeBlock: React.FC<ExchangeBlockProps> = ({
  error,
  valueFrom,
  valueTo,
  currencies,
  onValueChange,
  setCurrencyFrom,
  setCurrencyTo,
  onArrowClick,
}) => {
  return (
    <>
      {error && <span className={styles.errorMsg}>{error}</span>}
      <div className={styles.wrapper}>
        <Exchange
          value={valueFrom}
          onChange={onValueChange}
          setCurrency={setCurrencyFrom}
          currencies={currencies}
          type="from"
        />
        <div className={styles.arrowBlock} onClick={onArrowClick}>
          <img src="/assets/arrow.svg" alt="Arrow" width={20} height={20} />
        </div>
        <Exchange
          value={valueTo}
          setCurrency={setCurrencyTo}
          currencies={currencies}
          type="to"
        />
      </div>
    </>
  )
}

export default ExchangeBlock