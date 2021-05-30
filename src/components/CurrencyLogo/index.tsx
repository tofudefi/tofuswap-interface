import { Currency, TRX, Token } from '@tofudefi/tofuswap-sdk'
import React, { useMemo } from 'react'
import styled from 'styled-components'

// TRON
// import EthereumLogo from '../../assets/images/ethereum-logo.png'
import TronLogo from '../../assets/images/tron-logo.svg'
import useHttpLocations from '../../hooks/useHttpLocations'
import { WrappedTokenInfo } from '../../state/lists/hooks'
import Logo from '../Logo'
import { ethAddress } from '@tofudefi/java-tron-provider'
import { POPULAR_TOKENS_WO_LOGO_BY_ADDR } from '../../constants'

const getTokenLogoURL = (address: string) => {
  const tronAddress = ethAddress.toTron(address)
  
  if (POPULAR_TOKENS_WO_LOGO_BY_ADDR.indexOf(tronAddress) >= 0) {
      return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/tron/assets/${tronAddress}/logo.png`
  } 

  // Dice
  if (tronAddress === 'TKttnV3FSY1iEoAwB4N52WK2DxdV94KpSd') {
      return 'https://coin.top/production/logo/TKttnV3FSY1iEoAwB4N52WK2DxdV94KpSd.jpg';
  }

  return `https://coin.top/production/upload/logo/${tronAddress}.png`
}

const StyledEthereumLogo = styled.img<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
  border-radius: 24px;
`

const StyledLogo = styled(Logo)<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: ${({ size }) => size};
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
`

export default function CurrencyLogo({
  currency,
  size = '24px',
  style
}: {
  currency?: Currency
  size?: string
  style?: React.CSSProperties
}) {
  const uriLocations = useHttpLocations(currency instanceof WrappedTokenInfo ? currency.logoURI : undefined)

  const srcs: string[] = useMemo(() => {
    if (currency === TRX) return []

    if (currency instanceof Token) {
      if (currency instanceof WrappedTokenInfo) {
        return [...uriLocations, getTokenLogoURL(currency.address)]
      }

      return [getTokenLogoURL(currency.address)]
    }
    return []
  }, [currency, uriLocations])

  if (currency === TRX) {
    return <StyledEthereumLogo src={TronLogo} size={size} style={style} />
  }

  return <StyledLogo size={size} srcs={srcs} alt={`${currency?.symbol ?? 'token'} logo`} style={style} />
}
