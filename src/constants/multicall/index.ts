import { ChainId } from '@tofudefi/tofuswap-sdk'
import MULTICALL_ABI from './abi.json'

const MULTICALL_NETWORKS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0xeefBa1e63905eF1D7ACbA5a8513c70307C1cE441',
  [ChainId.SHASTA]: '0x53C43764255c17BD724F74c4eF150724AC50a3ed',
  [ChainId.NILE]: '0x77dCa2C955b15e9dE4dbBCf1246B4B85b651e50e'
}

export { MULTICALL_ABI, MULTICALL_NETWORKS }
