import { ChainId, JSBI, Pair, Route, Token, TokenAmount, Trade, TradeType, TOFU_FREEZER_ADDRESS } from '@tofudefi/tofuswap-sdk'
import { computeTradePriceBreakdown } from './prices'

describe('prices', () => {
  const token1 = new Token(ChainId.MAINNET, '0x0000000000000000000000000000000000000001', 18)
  const token2 = new Token(ChainId.MAINNET, '0x0000000000000000000000000000000000000002', 18)
  const token3 = new Token(ChainId.MAINNET, '0x0000000000000000000000000000000000000003', 18)

  const tofuFreezer = new Token(ChainId.MAINNET, TOFU_FREEZER_ADDRESS, 6)

  const pair12 = new Pair(new TokenAmount(token1, JSBI.BigInt(10000)), new TokenAmount(token2, JSBI.BigInt(20000)))
  const pair23 = new Pair(new TokenAmount(token2, JSBI.BigInt(20000)), new TokenAmount(token3, JSBI.BigInt(30000)))
  const pair13 = new Pair(new TokenAmount(token1, JSBI.BigInt(100000)), new TokenAmount(token3, JSBI.BigInt(100000)))

  describe('computeTradePriceBreakdown', () => {
    it('returns undefined for undefined', () => {
      expect(computeTradePriceBreakdown(undefined)).toEqual({
        priceImpactWithoutFee: undefined,
        realizedLPFee: undefined
      })
    })

    it('correct realized lp fee for single hop', () => {
      expect(
        computeTradePriceBreakdown(
          new Trade(new Route([pair12], token1), new TokenAmount(token1, JSBI.BigInt(1000)), TradeType.EXACT_INPUT)
        ).realizedLPFee
      ).toEqual(new TokenAmount(token1, JSBI.BigInt(3)))
    })

    it('correct realized lp fee for single hop with freezed tofu', () => {
      const tofuFreezed100 = new TokenAmount(tofuFreezer, JSBI.BigInt(100000000))
      expect(
        computeTradePriceBreakdown(
          new Trade(new Route([pair13], token1), new TokenAmount(token1, JSBI.BigInt(10000)), TradeType.EXACT_INPUT, tofuFreezed100)
        ).realizedLPFee
      ).toEqual(new TokenAmount(token1, JSBI.BigInt(25)))
    })

    it('correct realized lp fee for double hop', () => {
      expect(
        computeTradePriceBreakdown(
          new Trade(
            new Route([pair12, pair23], token1),
            new TokenAmount(token1, JSBI.BigInt(1000)),
            TradeType.EXACT_INPUT
          )
        ).realizedLPFee
      ).toEqual(new TokenAmount(token1, JSBI.BigInt(5)))
    })

    it('correct realized lp fee for double hop with freezed tofu', () => {
      const tofuFreezed1000 = new TokenAmount(tofuFreezer, JSBI.BigInt(1000000000))
      expect(
        computeTradePriceBreakdown(
          new Trade(
            new Route([pair13, pair13], token1),
            new TokenAmount(token1, JSBI.BigInt(10000)),
            TradeType.EXACT_INPUT,
            tofuFreezed1000
          )
        ).realizedLPFee
      ).toEqual(new TokenAmount(token1, JSBI.BigInt(39)))
    })
  })
})
