import React from 'react'
import ExchangeBlock from '../../components/exchange-block'
import Button from '../../components/ui/button'
import Input from '../../components/ui/input'

import { getCurrencies } from '../../api'
import { Currency } from '../../api/interfaces'

import useExchange from '../../hooks/exchange.hook'

import styles from './styles.module.scss'

const App: React.FC = () => {
  const [address, setAddress] = React.useState("")
  const [currencyFrom, setCurrencyFrom] = React.useState<Currency>()
  const [currencyTo, setCurrencyTo] = React.useState<Currency>()
  const [currencies, setCurrencies] = React.useState<Currency[]>([])

  const {
    error,
    setValueFrom,
    valueFrom,
    valueTo,
  } = useExchange({ currencyFrom, currencyTo })
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // VALIDATE Token regexp by address

    setAddress(e.target.value)
  }
  
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const floatRegExp = /^[0-9]*[.]?[0-9]{0,7}$/
    let inputValue = e.target.value

    if (inputValue[inputValue.length - 1] === ',') {
      inputValue = inputValue.substring(0, inputValue.length - 1) + '.'
    }

    if (floatRegExp.test(inputValue)) {
      setValueFrom(inputValue)
    }
  }

  const handleArrowClick = () => {
    setValueFrom(valueTo)

    setCurrencyTo(currencyFrom)
    setCurrencyFrom(currencyTo)
  }

  React.useEffect(() => {
    (async () => {
      const res = await getCurrencies()
      setCurrencies(res.data)
    })()
  }, [])

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.containerExchange}>
          <ExchangeBlock
            currencies={currencies}
            error={error}
            onArrowClick={handleArrowClick}
            onValueChange={handleValueChange}
            setCurrencyFrom={setCurrencyFrom}
            setCurrencyTo={setCurrencyTo}
            valueFrom={valueFrom}
            valueTo={valueTo}
          />
        </div>
        <div className={styles.containerSubmit}>
          <div className={styles.containerSubmitInput}>
            <Input placeHolder={`${currencyFrom?.legacy_ticker.toUpperCase()} address`} onChange={handleChange} value={address} />
          </div>
          <div className={styles.containerSubmitButton}>
            <Button>
              NEXT
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
