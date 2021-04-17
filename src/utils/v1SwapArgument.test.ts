import { CurrencyAmount, TRX, Percent, Route, TokenAmount, Trade } from '@tofudefi/tofuswap-sdk'
import { USDT, USDJ } from '../constants'
import { MockV1Pair } from '../data/V1'
import v1SwapArguments from './v1SwapArguments'

describe('v1SwapArguments', () => {
  const USDT_WETH = new MockV1Pair('1000000', new TokenAmount(USDT, '1000000'))
  const USDJ_WETH = new MockV1Pair('1000000', new TokenAmount(USDJ, '1000000'))

  // just some random address
  const TEST_RECIPIENT_ADDRESS = USDT_WETH.liquidityToken.address

  it('exact eth to token', () => {
    const trade = Trade.exactIn(new Route([USDT_WETH], TRX), CurrencyAmount.trx('100'))
    const result = v1SwapArguments(trade, {
      recipient: TEST_RECIPIENT_ADDRESS,
      allowedSlippage: new Percent('1', '100'),
      deadline: 20 * 60
    })
    expect(result.methodName).toEqual('ethToTokenTransferInput')
    expect(result.args).toEqual(['0x62', '0x4b0', TEST_RECIPIENT_ADDRESS])
    expect(result.value).toEqual('0x64')
  })
  it('exact token to eth', () => {
    const trade = Trade.exactIn(new Route([USDT_WETH], USDT, TRX), new TokenAmount(USDT, '100'))
    const result = v1SwapArguments(trade, {
      recipient: TEST_RECIPIENT_ADDRESS,
      allowedSlippage: new Percent('1', '100'),
      deadline: 40 * 60
    })
    expect(result.methodName).toEqual('tokenToEthTransferInput')
    expect(result.args[0]).toEqual('0x64')
    expect(result.args[1]).toEqual('0x62')
    expect(result.args[2]).toEqual('0x960')
    expect(result.args[3]).toEqual(TEST_RECIPIENT_ADDRESS)
    expect(result.value).toEqual('0x0')
  })
  it('exact token to token', () => {
    const trade = Trade.exactIn(new Route([USDT_WETH, USDJ_WETH], USDT), new TokenAmount(USDT, '100'))
    const result = v1SwapArguments(trade, {
      recipient: TEST_RECIPIENT_ADDRESS,
      allowedSlippage: new Percent('1', '100'),
      deadline: 20 * 60
    })
    expect(result.methodName).toEqual('tokenToTokenTransferInput')
    expect(result.args[0]).toEqual('0x64')
    expect(result.args[1]).toEqual('0x61')
    expect(result.args[2]).toEqual('0x1')
    expect(result.args[3]).toEqual('0x4b0')
    expect(result.args[4]).toEqual(TEST_RECIPIENT_ADDRESS)
    expect(result.args[5]).toEqual(USDJ.address)
    expect(result.value).toEqual('0x0')
  })
  it('eth to exact token', () => {
    const trade = Trade.exactOut(new Route([USDT_WETH], TRX), new TokenAmount(USDT, '100'))
    const result = v1SwapArguments(trade, {
      recipient: TEST_RECIPIENT_ADDRESS,
      allowedSlippage: new Percent('1', '100'),
      deadline: 20 * 60
    })
    expect(result.methodName).toEqual('ethToTokenTransferOutput')
    expect(result.args[0]).toEqual('0x64')
    expect(result.args[1]).toEqual('0x4b0')
    expect(result.args[2]).toEqual(TEST_RECIPIENT_ADDRESS)
    expect(result.value).toEqual('0x66')
  })
  it('token to exact eth', () => {
    const trade = Trade.exactOut(new Route([USDT_WETH], USDT, TRX), CurrencyAmount.trx('100'))
    const result = v1SwapArguments(trade, {
      recipient: TEST_RECIPIENT_ADDRESS,
      allowedSlippage: new Percent('1', '100'),
      deadline: 20 * 60
    })
    expect(result.methodName).toEqual('tokenToEthTransferOutput')
    expect(result.args[0]).toEqual('0x64')
    expect(result.args[1]).toEqual('0x66')
    expect(result.args[2]).toEqual('0x4b0')
    expect(result.args[3]).toEqual(TEST_RECIPIENT_ADDRESS)
    expect(result.value).toEqual('0x0')
  })
  it('token to exact token', () => {
    const trade = Trade.exactOut(new Route([USDT_WETH, USDJ_WETH], USDT), new TokenAmount(USDJ, '100'))
    const result = v1SwapArguments(trade, {
      recipient: TEST_RECIPIENT_ADDRESS,
      allowedSlippage: new Percent('1', '100'),
      deadline: 20 * 60
    })
    expect(result.methodName).toEqual('tokenToTokenTransferOutput')
    expect(result.args[0]).toEqual('0x64')
    expect(result.args[1]).toEqual('0x67')
    expect(result.args[2]).toEqual(`0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff`)
    expect(result.args[3]).toEqual('0x4b0')
    expect(result.args[4]).toEqual(TEST_RECIPIENT_ADDRESS)
    expect(result.args[5]).toEqual(USDJ.address)
    expect(result.value).toEqual('0x0')
  })
})
