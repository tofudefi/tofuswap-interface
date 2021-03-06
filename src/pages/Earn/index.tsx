import React/*, { useContext }*/ from 'react'
import { AutoColumn } from '../../components/Column'
import styled/*, { ThemeContext }*/ from 'styled-components'
import { STAKING_REWARDS_INFO, useStakingInfo } from '../../state/stake/hooks'
import { TYPE, ExternalLink } from '../../theme'
import PoolCard from '../../components/earn/PoolCard'
import { RowBetween } from '../../components/Row'
import { CardSection, DataCard, CardNoise/*, CardBGImage*/ } from '../../components/earn/styled'
import { Countdown } from './Countdown'
import Loader from '../../components/Loader'
import { useActiveWeb3React } from '../../hooks'
//import { JSBI } from '@tofudefi/tofuswap-sdk'
//import { BIG_INT_ZERO } from '../../constants'
import { OutlineCard } from '../../components/Card'

const PageWrapper = styled(AutoColumn)`
  max-width: 640px;
  width: 100%;
`

const TopSection = styled(AutoColumn)`
  max-width: 720px;
  width: 100%;
`

const PoolSection = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  column-gap: 10px;
  row-gap: 15px;
  width: 100%;
  justify-self: center;
`


const DataRow = styled(RowBetween)`
  ${({ theme }) => theme.mediaWidth.upToSmall`
flex-direction: column;
`};
`

export default function Earn() {
  const { chainId } = useActiveWeb3React()

  // staking info for connected account
  const stakingInfos = useStakingInfo()

  /**
   * only show staking cards with balance
   * @todo only account for this if rewards are inactive
   */
  //const stakingInfosWithBalance = stakingInfos?.filter(s => JSBI.greaterThan(s.stakedAmount.raw, BIG_INT_ZERO))

  // toggle copy if rewards are inactive
  const stakingRewardsExist = Boolean(typeof chainId === 'number' && (STAKING_REWARDS_INFO[chainId]?.length ?? 0) > 0)

  //const theme = useContext(ThemeContext)

  return (
    <PageWrapper gap="lg" justify="center">
      <TopSection gap="md">
        <DataCard>
          {/*<CardBGImage />*/}
          <CardNoise />
          <CardSection>
            <AutoColumn gap="md">
              <RowBetween>
                <TYPE.white fontWeight={600} color="black">Tofuswap liquidity mining</TYPE.white>
              </RowBetween>
              <RowBetween>
                <TYPE.white fontSize={14} color="black">
                  Deposit your Liquidity Provider tokens to receive TOFU, the TofuDefi protocol governance token.
                </TYPE.white>
              </RowBetween>{' '}
              <RowBetween>
              <ExternalLink
                style={{ color: 'black', textDecoration: 'underline' }}
                href="https://tofudefi.com/"
                target="_blank"
              >
                <TYPE.white fontSize={14} color="black">Read more about TOFU</TYPE.white>
              </ExternalLink>
              {/*<ExternalLink href={`https://tofudefi.com/freezer.php`} style={{color:theme.blue1, textDecoration: 'underline'}}>
                <TYPE.black fontSize={14} style={{color:theme.blue1}}>Freeze TOFU</TYPE.black>
              </ExternalLink>*/}
              </RowBetween>
            </AutoColumn>
          </CardSection>
          {/*<CardBGImage />*/}
          <CardNoise />
        </DataCard>
      </TopSection>

{/*
      <AutoColumn gap="lg" style={{ width: '100%', maxWidth: '720px' }}>
        <DataRow style={{ alignItems: 'center', justifyContent: 'center' }}>
          <TYPE.mediumHeader style={{ marginTop: '0.5rem' }}>Coming soon...</TYPE.mediumHeader>
        </DataRow>
      </AutoColumn>
*/}

      <AutoColumn gap="lg" style={{ width: '100%', maxWidth: '720px' }}>
        <DataRow style={{ alignItems: 'baseline' }}>
          <TYPE.mediumHeader style={{ marginTop: '0.5rem' }}>Participating pools</TYPE.mediumHeader>
          <Countdown exactEnd={stakingInfos?.[0]?.periodFinish} />
        </DataRow>

        <PoolSection>
          {stakingRewardsExist && stakingInfos?.length === 0 ? (
            <Loader style={{ margin: 'auto' }} />
          ) : !stakingRewardsExist ? (
            <OutlineCard>No active pools</OutlineCard>
          ) : /*stakingInfos?.length !== 0 && stakingInfosWithBalance.length === 0 ? (
            <OutlineCard>No active pools</OutlineCard>
          ) :*/ (
            stakingInfos?.map(stakingInfo => {
              // need to sort by added liquidity here
              return <PoolCard key={stakingInfo.stakingRewardAddress} stakingInfo={stakingInfo} />
            })
          )}
        </PoolSection>
      </AutoColumn>
    </PageWrapper>
  )
}
