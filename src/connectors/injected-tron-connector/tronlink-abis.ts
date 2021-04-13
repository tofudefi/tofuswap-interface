// all abis...
import { V1_EXCHANGE_ABI, V1_FACTORY_ABI } from '../../constants/v1'
import { abi as ITofuswapV2PairABI } from '@tofudefi/tofuswap-v2-core/build/ITofuswapV2Pair.json'
import { abi as ITofuswapV2Factory } from '@tofudefi/tofuswap-v2-core/build/ITofuswapV2Factory.json'
import { abi as ITofuswapV2Router02ABI } from '@tofudefi/tofuswap-v2-periphery/build/ITofuswapV2Router02.json'
import ENS_ABI from '../../constants/abis/ens-registrar.json'
import ENS_PUBLIC_RESOLVER_ABI from '../../constants/abis/ens-public-resolver.json'
import UNISOCKS_ABI from '../../constants/abis/unisocks.json'
import WETH_ABI from '../../constants/abis/weth.json'
import { MIGRATOR_ABI } from '../../constants/abis/migrator'
import ERC20_ABI from '../../constants/abis/erc20.json'
import { MULTICALL_ABI } from '../../constants/multicall'

export const abis = [
  ...ERC20_ABI,
  ...ITofuswapV2Factory,
  ...ITofuswapV2Router02ABI,  
  ...ITofuswapV2PairABI,
  ...V1_EXCHANGE_ABI,
  ...V1_FACTORY_ABI,
  ...ENS_ABI,
  ...ENS_PUBLIC_RESOLVER_ABI,
  ...UNISOCKS_ABI,
  ...WETH_ABI,
  ...MIGRATOR_ABI,
  ...MULTICALL_ABI
]
