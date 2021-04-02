import { Currency, TRX, Token } from '@tofudefi/tofuswap-sdk'

export function currencyId(currency: Currency): string {
  if (currency === TRX) return 'TRX'
  if (currency instanceof Token) return currency.address
  throw new Error('invalid currency')
}
