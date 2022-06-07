import { Currency } from '../api/interfaces'
import { useState, useEffect } from 'react'

import { getMinimalExchange, getEstimateExchange } from '../api'

interface UseExchangeProps {
  currencyFrom: Currency | undefined
  currencyTo: Currency | undefined
}

const useExchange = ({ currencyFrom, currencyTo }: UseExchangeProps) => {
  const [minimal, setMinimal] = useState<null | number>(null)
  const [error, setError] = useState<null | string>(null)
  const [valueFrom, setValueFrom] = useState("")
  const [valueTo, setValueTo] = useState("")

  useEffect(() => {
    if (!currencyFrom || !currencyTo) return
    (async () => {
      const res = await getMinimalExchange({ from: currencyFrom.legacy_ticker, to: currencyTo.legacy_ticker })
      setMinimal(res.data)

      if (!valueFrom) {
        setValueFrom(String(res.data))
      }
    })()
  }, [currencyFrom, currencyTo])

  useEffect(() => {
    if (!minimal) return
    if (Number(valueFrom) < Number(minimal)) {
      setError("Amount less than minimal exchange")
      setValueTo("---")
      return
    }

    ;(async () => {
      if (!currencyFrom || !currencyTo) return
      const res = await getEstimateExchange({ from: currencyFrom.legacy_ticker, to: currencyTo.legacy_ticker, amount: valueFrom })
      setValueTo(String(res.data))
    })()
  }, [valueFrom, minimal])

  useEffect(() => {
    if (!error) return
    let timer = setTimeout(() => {
      setError(null)
    }, 2000)

    return () => clearTimeout(timer)
  }, [error])

  useEffect(() => {
    if (valueTo === "---") return
    if (!currencyFrom || !currencyTo) return
    
    let timer = setInterval(async () => {
      const res = await getEstimateExchange({ from: currencyFrom.legacy_ticker, to: currencyTo.legacy_ticker, amount: valueFrom })
      setValueTo(String(res.data))
    }, 5000)

    return () => clearInterval(timer)
  }, [valueTo])

  return {
    error,
    minimal,
    valueFrom,
    valueTo,
    setValueFrom,
    setValueTo,
  }
}

export default useExchange