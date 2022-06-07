import React from 'react'
import Input from '../../../ui/input'
import { Currency } from '../../../../api/interfaces'

import styles from './styles.module.scss'

interface ExchangeProps {
  value: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>, type: 'from' | 'to') => void
  currencies: Currency[]
  type: 'from' | 'to'
  setCurrency: (currency: Currency) => void
}

const Exchange: React.FC<ExchangeProps> = ({
  value,
  onChange,
  setCurrency,
  currencies,
  type,
}) => {
  const [search, setSearch] = React.useState("")

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const handleSetCurrency = (e: React.ChangeEvent<HTMLInputElement>) => {
    const findCurrency = currencies.find((item) => item.legacy_ticker.toLowerCase() === e.target.value.toLowerCase())
    if (findCurrency) {
      setCurrency(findCurrency)
    }
  }

  return (
      <div className={styles.exchangeBlock}>
        {onChange && type === 'from' ? (
          <Input
            value={value}
            onChange={(e) => onChange(e, type)}
            customStyles={{ fontSize: '20px', fontWeight: 600 }}
            pattern="^\d*[.,]?\d*$"
            inputMode="decimal"
            placeHolder="123.312"
          />
        ) : (
          <Input
            value={value}
            readOnly={true}
            customStyles={{ fontSize: '20px', fontWeight: 600 }}
            pattern="^\d*[.,]?\d*$"
            inputMode="decimal"
          />
        )}
        <div className={styles.exchangeBlockHr} />
        <div className={styles.exchangeBlockCurrencies}>
          <input
            type="text"
            list="currencies-list"
            placeholder="Optional"
            onBlur={handleSetCurrency}
            value={search}
            onChange={handleSearchChange}
          />
          <datalist id="currencies-list">
            {currencies.map((item) => (
              <option key={item.id} value={item.legacy_ticker.toUpperCase()}>
                {item.legacy_ticker.toUpperCase()}
              </option>
            ))}
          </datalist>
        </div>
      </div>
  )
}

export default Exchange