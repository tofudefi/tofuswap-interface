import { Currency, TRX, Token } from '@tofudefi/tofuswap-sdk'
import { ethAddress } from '@tofudefi/java-tron-provider'

export function currencyId(currency: Currency): string {
  if (currency === TRX) return 'TRX'
  if (currency instanceof Token) return ethAddress.toTron(currency.address)
  throw new Error('invalid currency')
}
