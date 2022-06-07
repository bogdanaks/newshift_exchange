export interface Currency {
  id: string
  ticker: string
  name: string
  image: string
  has_external_id: boolean
  is_fiat: boolean
  featured: boolean
  is_stable: boolean
  supports_fixed_rate: boolean
  network: string
  token_contract: string | null
  buy: boolean
  sell: boolean
  legacy_ticker: string
}
