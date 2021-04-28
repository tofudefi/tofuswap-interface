import { /*ChainId,*/ TokenAmount } from '@tofudefi/tofuswap-sdk'
import React/*, { useMemo }*/ from 'react'
import { X } from 'react-feather'
import styled from 'styled-components'
import tokenLogo from '../../assets/images/token-logo.png'
import { TOFU, BIG_INT_ZERO } from '../../constants'
import { useTotalSupply } from '../../data/TotalSupply'
import { useActiveWeb3React } from '../../hooks'
//import { useMerkleDistributorContract } from '../../hooks/useContract'
//import useCurrentBlockTimestamp from '../../hooks/useCurrentBlockTimestamp'
//import { useTotalUniEarned } from '../../state/stake/hooks'
import { useAggregateTofuBalance, useTokenBalance, useTofuFreezedBalance } from '../../state/wallet/hooks'
import { /*ExternalLink, StyledInternalLink,*/ TYPE, UniTokenAnimated } from '../../theme'
//import { computeUniCirculation } from '../../utils/computeUniCirculation'
import useUSDCPrice from '../../utils/useUSDCPrice'
import { AutoColumn } from '../Column'
import { RowBetween } from '../Row'
import { Break, CardBGImage, CardNoise, CardSection, DataCard } from '../earn/styled'

const ContentWrapper = styled(AutoColumn)`
  width: 100%;
`

const ModalUpper = styled(DataCard)`
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  background: radial-gradient(76.02% 75.41% at 1.84% 0%, #ff007a 0%, #021d43 100%);
  padding: 0.5rem;
`

const StyledClose = styled(X)`
  position: absolute;
  right: 16px;
  top: 16px;

  :hover {
    cursor: pointer;
  }
`

/**
 * Content for balance stats modal
 */
export default function UniBalanceContent({ setShowUniBalanceModal }: { setShowUniBalanceModal: any }) {
  const { account, chainId } = useActiveWeb3React()
  const tofu = chainId ? TOFU[chainId] : undefined
  const zero = BIG_INT_ZERO

  const zeroAmount = tofu ? new TokenAmount(tofu, zero) : undefined;

  const total = useAggregateTofuBalance()
  let tofuBalance: TokenAmount | undefined = useTokenBalance(account ?? undefined, tofu)
  let freezedBalance: TokenAmount | undefined = useTofuFreezedBalance()
  
  if (!account){
    tofuBalance = zeroAmount
    freezedBalance = zeroAmount
  }
  
//  const uniToClaim: TokenAmount | undefined = useTotalUniEarned()

  const totalSupply: TokenAmount | undefined = useTotalSupply(tofu)
  const uniPrice = useUSDCPrice(tofu)
//  const blockTimestamp = useCurrentBlockTimestamp()
//  const unclaimedUni = useTokenBalance(useMerkleDistributorContract()?.address, tofu)
  
/*  
  const circulation: TokenAmount | undefined = useMemo(
    () =>
      blockTimestamp && tofu && chainId === ChainId.MAINNET
        ? computeUniCirculation(tofu, blockTimestamp, unclaimedUni)
        : totalSupply,
    [blockTimestamp, chainId, totalSupply, unclaimedUni, tofu]
  )
*/

  return (
    <ContentWrapper gap="lg">
      <ModalUpper>
        <CardBGImage />
        <CardNoise />
        <CardSection gap="md">
          <RowBetween>
            <TYPE.white color="white">Your TOFU</TYPE.white>
            <StyledClose stroke="white" onClick={() => setShowUniBalanceModal(false)} />
          </RowBetween>
        </CardSection>
        <Break />
        {/*account &&*/ (
          <>
            <CardSection gap="sm">
              <AutoColumn gap="md" justify="center">
                <UniTokenAnimated width="100px" src={tokenLogo} />{' '}
                <TYPE.white fontSize={48} fontWeight={600} color="white">
                  {total?.toFixed(2, { groupSeparator: ',' })}
                </TYPE.white>
              </AutoColumn>
              <AutoColumn gap="md">
                <RowBetween>
                  <TYPE.white color="white">Balance:</TYPE.white>
                  <TYPE.white color="white">{tofuBalance?.toFixed(2, { groupSeparator: ',' })}</TYPE.white>
                </RowBetween>
                <RowBetween>
                  <TYPE.white color="white">Freezed:</TYPE.white>
                  <TYPE.white color="white">{freezedBalance?.toFixed(2, { groupSeparator: ',' })}</TYPE.white>
                </RowBetween>
                {/*
                <RowBetween>
                  <TYPE.white color="white">Unclaimed:</TYPE.white>
                  <TYPE.white color="white">
                    {uniToClaim?.toFixed(4, { groupSeparator: ',' })}{' '}
                    {uniToClaim && uniToClaim.greaterThan('0') && (
                      <StyledInternalLink onClick={() => setShowUniBalanceModal(false)} to="/uni">
                        (claim)
                      </StyledInternalLink>
                    )}
                  </TYPE.white>
                </RowBetween>
                */}
              </AutoColumn>
            </CardSection>
            <Break />
          </>
        )}
        <CardSection gap="sm">
          <AutoColumn gap="md">
            <RowBetween>
              <TYPE.white color="white">TOFU price:</TYPE.white>
              <TYPE.white color="white">${uniPrice?.toFixed(2) ?? '-'}</TYPE.white>
            </RowBetween>
            {/*
            <RowBetween>
              <TYPE.white color="white">TOFU in circulation:</TYPE.white>
              <TYPE.white color="white">{circulation?.toFixed(0, { groupSeparator: ',' })}</TYPE.white>
            </RowBetween>
            */}
            <RowBetween>
              <TYPE.white color="white">Total Supply</TYPE.white>
              <TYPE.white color="white">{totalSupply?.toFixed(0, { groupSeparator: ',' })}</TYPE.white>
            </RowBetween>
            {/* tofu && tofu.chainId === ChainId.MAINNET ? (
              <ExternalLink href={`https://uniswap.info/token/${uni.address}`}>View TOFU Analytics</ExternalLink>
            ) : null */}
          </AutoColumn>
        </CardSection>
      </ModalUpper>
    </ContentWrapper>
  )
}
