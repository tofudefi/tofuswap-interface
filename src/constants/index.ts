import { ChainId, JSBI, Percent, Token, WTRX } from '@tofudefi/tofuswap-sdk'
import { AbstractConnector } from '@web3-react/abstract-connector'

import { injected } from '../connectors'

export const ROUTER_ADDRESS = '0xBa7b1245cd804aA0844037DcF9c53Ec693033dd0'

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

// a list of tokens by chain
type ChainTokenList = {
  readonly [chainId in ChainId]: Token[]
}

export const USDT = new Token(ChainId.MAINNET, '0xa614f803B6FD780986A42c78Ec9c7f77e6DeD13C', 6, 'USDT', 'Tether USD')
export const USDJ = new Token(ChainId.MAINNET, '0x834295921A488D9d42b4b3021ED1a3C39fB0f03e', 6, 'USDJ', 'JUST Stablecoin')
export const BTC = new Token(ChainId.MAINNET, '0x84716914C0fDf7110A44030d04D0C4923504D9CC', 8, 'BTC', 'Tron BTC')
export const DICE = new Token(ChainId.MAINNET, '0x6cE0632A762689a207b9CCE915e93Aa9596816CA', 6, 'DICE', 'TRONBet Dice')

// USDT, USDJ, WINK, SUN, JST
export const POPULAR_TOKENS_WO_LOGO_BY_ADDR = ['TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t',
                                               'TMwFHYXLJaRUPeW6421aqXL4ZEzPRFGkGT',
                                               'TLa2f6VPqDgRE67v1736s7bJ8Ray5wYjU7', 
                                               'TKkeiboTkxXKJpbmVFbv4a8ov5rAfRDMf9',
                                               'TCFLL5dx5ZJdKnWuesXxi1VPwjLVmWZZy9']


// Block time here is slightly higher (~1s) than average in order to avoid ongoing proposals past the displayed time
export const AVERAGE_BLOCK_TIME_IN_SECS = 14
export const PROPOSAL_LENGTH_IN_BLOCKS = 40_320
export const PROPOSAL_LENGTH_IN_SECS = AVERAGE_BLOCK_TIME_IN_SECS * PROPOSAL_LENGTH_IN_BLOCKS

export const GOVERNANCE_ADDRESS = '0x5e4be8Bc9637f0EAA1A755019e06A68ce081D58F'

export const TIMELOCK_ADDRESS = '0x1a9C8182C09F50C8318d769245beA52c32BE35BC'

const TOFU_ADDRESS_MAINNET = '0xc25753642a59cdd8344ffe2e49bd112bfad26bd3'
const TOFU_ADDRESS = '0xc25753642a59cdd8344ffe2e49bd112bfad26bd3'

export const UNI: { [chainId in ChainId]: Token } = {
  [ChainId.MAINNET]: new Token(ChainId.MAINNET, TOFU_ADDRESS_MAINNET, 6, 'TOFU', 'TofuDeFi Token'),
  [ChainId.SHASTA]: new Token(ChainId.SHASTA, TOFU_ADDRESS, 6, 'TOFU', 'TofuDeFi Token'),
  [ChainId.NILE]: new Token(ChainId.NILE, TOFU_ADDRESS, 6, 'TOFU', 'TofuDeFi Token')
}
export const TOFU = UNI

const TOFU_FREEZER_ADDRESS = '0x4b51442c89d2a87480f29a5470fdc3f9619869e1'
const TOFU_FREEZER_ADDRESS_NILE = '0x4356b8c17fc6476678cd201691b9c678feb531f1'


export const TOFU_FREEZER: { [chainId in ChainId]: Token } = {
  [ChainId.MAINNET]: new Token(ChainId.MAINNET, TOFU_FREEZER_ADDRESS, 6, 'TOFU', 'TofuFreezer'),
  [ChainId.SHASTA]: new Token(ChainId.SHASTA, TOFU_FREEZER_ADDRESS, 6, 'TOFU', 'TofuFreezer'),
  [ChainId.NILE]: new Token(ChainId.NILE, TOFU_FREEZER_ADDRESS_NILE, 6, 'TOFU', 'TofuFreezer')
}

export const COMMON_CONTRACT_NAMES: { [address: string]: string } = {
  [TOFU_ADDRESS]: 'TOFU',
  [GOVERNANCE_ADDRESS]: 'Governance',
  [TIMELOCK_ADDRESS]: 'Timelock'
}

// TODO: specify merkle distributor for mainnet
export const MERKLE_DISTRIBUTOR_ADDRESS: { [chainId in ChainId]?: string } = {
  [ChainId.MAINNET]: '0x090D4613473dEE047c3f2706764f49E0821D256e'
}

const WETH_ONLY: ChainTokenList = {
  [ChainId.MAINNET]: [WTRX[ChainId.MAINNET]],
  [ChainId.SHASTA]: [WTRX[ChainId.SHASTA]],
  [ChainId.NILE]: [WTRX[ChainId.NILE]]
}

// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.MAINNET]: [...WETH_ONLY[ChainId.MAINNET], USDT, USDJ]
}

/**
 * Some tokens can only be swapped via certain pairs, so we override the list of bases that are considered for these
 * tokens.
 */
export const CUSTOM_BASES: { [chainId in ChainId]?: { [tokenAddress: string]: Token[] } } = {
  [ChainId.MAINNET]: {
    //TRON
    //[AMPL.address]: [DAI, WTRX[ChainId.MAINNET]]
  }
}

// used for display in the default list when adding liquidity
export const SUGGESTED_BASES: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.MAINNET]: [...WETH_ONLY[ChainId.MAINNET], USDT, USDJ, TOFU[ChainId.MAINNET]]
  // @TRON
  // [ChainId.MAINNET]: [...WETH_ONLY[ChainId.MAINNET], DAI, USDC, USDT]
}

// used to construct the list of all pairs we consider by default in the frontend
export const BASES_TO_TRACK_LIQUIDITY_FOR: ChainTokenList = {
  ...WETH_ONLY,
  // TODO(tron): USDT, JST, USDJ?
  [ChainId.MAINNET]: [...WETH_ONLY[ChainId.MAINNET], USDT, USDJ]
}

export const PINNED_PAIRS: { readonly [chainId in ChainId]?: [Token, Token][] } = {
  [ChainId.MAINNET]: [
    // @TRON
    /*
    [
      new Token(ChainId.MAINNET, '0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643', 8, 'cDAI', 'Compound Dai'),
      new Token(ChainId.MAINNET, '0x39AA39c021dfbaE8faC545936693aC917d5E7563', 8, 'cUSDC', 'Compound USD Coin')
    ],
    [USDC, USDT],
		*/
    [USDJ, USDT]
  ]
}

export interface WalletInfo {
  connector?: AbstractConnector
  name: string
  iconName: string
  description: string
  href: string | null
  color: string
  primary?: true
  mobile?: true
  mobileOnly?: true
}

export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
  INJECTED: {
    connector: injected,
    name: 'Injected',
    iconName: 'arrow-right.svg',
    description: 'Injected provider.',
    href: null,
    color: '#010101',
    primary: true
  },
  /*
  METAMASK: {
    connector: injected,
    name: 'MetaMask',
    iconName: 'metamask.png',
    description: 'Easy-to-use browser extension.',
    href: null,
    color: '#E8831D'
  },
	*/
  TRONLINK: {
    connector: injected,
    name: 'TronLink',
    iconName: 'tronlink.svg',
    description: 'Easy-to-use browser extension.',
    href: null,
    color: '#48489b'
  }
  // TRON
  /*
  WALLET_CONNECT: {
    connector: walletconnect,
    name: 'WalletConnect',
    iconName: 'walletConnectIcon.svg',
    description: 'Connect to Trust Wallet, Rainbow Wallet and more...',
    href: null,
    color: '#4196FC',
    mobile: true
  },
  WALLET_LINK: {
    connector: walletlink,
    name: 'Coinbase Wallet',
    iconName: 'coinbaseWalletIcon.svg',
    description: 'Use Coinbase Wallet app on mobile device',
    href: null,
    color: '#315CF5'
  },
  COINBASE_LINK: {
    name: 'Open in Coinbase Wallet',
    iconName: 'coinbaseWalletIcon.svg',
    description: 'Open in Coinbase Wallet app.',
    href: 'https://go.cb-w.com/mtUDhEZPy1',
    color: '#315CF5',
    mobile: true,
    mobileOnly: true
  },
  FORTMATIC: {
    connector: fortmatic,
    name: 'Fortmatic',
    iconName: 'fortmaticIcon.png',
    description: 'Login using Fortmatic hosted wallet',
    href: null,
    color: '#6748FF',
    mobile: true
  },
  Portis: {
    connector: portis,
    name: 'Portis',
    iconName: 'portisIcon.png',
    description: 'Login using Portis hosted wallet',
    href: null,
    color: '#4A6C9B',
    mobile: true
  }
  */
}

export const NetworkContextName = 'NETWORK'

// default allowed slippage, in bips
export const INITIAL_ALLOWED_SLIPPAGE = 50
// 20 minutes, denominated in seconds
export const DEFAULT_DEADLINE_FROM_NOW = 60 * 20

// used for rewards deadlines
export const BIG_INT_SECONDS_IN_WEEK = JSBI.BigInt(60 * 60 * 24 * 7)

export const BIG_INT_ZERO = JSBI.BigInt(0)

// one basis point
export const ONE_BIPS = new Percent(JSBI.BigInt(1), JSBI.BigInt(10000))
export const BIPS_BASE = JSBI.BigInt(10000)
// used for warning states
export const ALLOWED_PRICE_IMPACT_LOW: Percent = new Percent(JSBI.BigInt(100), BIPS_BASE) // 1%
export const ALLOWED_PRICE_IMPACT_MEDIUM: Percent = new Percent(JSBI.BigInt(500), BIPS_BASE) // 5%
export const ALLOWED_PRICE_IMPACT_HIGH: Percent = new Percent(JSBI.BigInt(700), BIPS_BASE) // 7%
// if the price slippage exceeds this number, force the user to type 'confirm' to execute
export const PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN: Percent = new Percent(JSBI.BigInt(2000), BIPS_BASE) // 20%
// for non expert mode disable swaps above this
export const BLOCKED_PRICE_IMPACT_NON_EXPERT: Percent = new Percent(JSBI.BigInt(5000), BIPS_BASE) // 50%

// used to ensure the user doesn't send so much TRX so they end up with <1.0
export const MIN_ETH: JSBI = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(6)) // 1 TRX
export const BETTER_TRADE_LINK_THRESHOLD = new Percent(JSBI.BigInt(75), JSBI.BigInt(10000))

// SDN OFAC addresses
export const BLOCKED_ADDRESSES: string[] = [
  '0x7F367cC41522cE07553e823bf3be79A889DEbe1B',
  '0xd882cFc20F52f2599D84b8e8D58C7FB62cfE344b',
  '0x901bb9583b24D97e995513C6778dc6888AB6870e',
  '0xA7e5d5A720f06526557c513402f2e6B5fA20b008'
]
