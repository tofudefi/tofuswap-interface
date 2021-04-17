//TODO: rename to USDT
import { ChainId, Currency, currencyEquals, JSBI, Price, WTRX } from '@tofudefi/tofuswap-sdk'
import { useMemo } from 'react'
import { USDT } from '../constants'
import { PairState, usePairs } from '../data/Reserves'
import { useActiveWeb3React } from '../hooks'
import { wrappedCurrency } from './wrappedCurrency'

/**
 * Returns the price in USDC of the input currency
 * @param currency currency to compute the USDC price of
 */
export default function useUSDCPrice(currency?: Currency): Price | undefined {
  const { chainId } = useActiveWeb3React()
  const wrapped = wrappedCurrency(currency, chainId)
  const tokenPairs: [Currency | undefined, Currency | undefined][] = useMemo(
    () => [
      [
        chainId && wrapped && currencyEquals(WTRX[chainId], wrapped) ? undefined : currency,
        chainId ? WTRX[chainId] : undefined
      ],
      [wrapped?.equals(USDT) ? undefined : wrapped, chainId === ChainId.MAINNET ? USDT : undefined],
      [chainId ? WTRX[chainId] : undefined, chainId === ChainId.MAINNET ? USDT : undefined]
    ],
    [chainId, currency, wrapped]
  )
  const [[ethPairState, ethPair], [usdcPairState, usdcPair], [usdcEthPairState, usdcEthPair]] = usePairs(tokenPairs)

  return useMemo(() => {
    if (!currency || !wrapped || !chainId) {
      return undefined
    }
    // handle weth/eth
    if (wrapped.equals(WTRX[chainId])) {
      if (usdcPair) {
        const price = usdcPair.priceOf(WTRX[chainId])
        return new Price(currency, USDT, price.denominator, price.numerator)
      } else {
        return undefined
      }
    }
    // handle usdc
    if (wrapped.equals(USDT)) {
      return new Price(USDT, USDT, '1', '1')
    }

    const ethPairETHAmount = ethPair?.reserveOf(WTRX[chainId])
    const ethPairETHUSDCValue: JSBI =
      ethPairETHAmount && usdcEthPair ? usdcEthPair.priceOf(WTRX[chainId]).quote(ethPairETHAmount).raw : JSBI.BigInt(0)

    // all other tokens
    // first try the usdc pair
    if (usdcPairState === PairState.EXISTS && usdcPair && usdcPair.reserveOf(USDT).greaterThan(ethPairETHUSDCValue)) {
      const price = usdcPair.priceOf(wrapped)
      return new Price(currency, USDT, price.denominator, price.numerator)
    }
    if (ethPairState === PairState.EXISTS && ethPair && usdcEthPairState === PairState.EXISTS && usdcEthPair) {
      if (usdcEthPair.reserveOf(USDT).greaterThan('0') && ethPair.reserveOf(WTRX[chainId]).greaterThan('0')) {
        const ethUsdcPrice = usdcEthPair.priceOf(USDT)
        const currencyEthPrice = ethPair.priceOf(WTRX[chainId])
        const usdcPrice = ethUsdcPrice.multiply(currencyEthPrice).invert()
        return new Price(currency, USDT, usdcPrice.denominator, usdcPrice.numerator)
      }
    }
    return undefined
  }, [chainId, currency, ethPair, ethPairState, usdcEthPair, usdcEthPairState, usdcPair, usdcPairState, wrapped])
}
