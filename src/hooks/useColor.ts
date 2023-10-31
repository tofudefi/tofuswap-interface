import { useState, useLayoutEffect } from 'react'
import { shade } from 'polished'
import Vibrant from 'node-vibrant'
import { hex } from 'wcag-contrast'
import { Token, ChainId } from '@tofudefi/tofuswap-sdk'
import { ethAddress } from '@tofudefi/java-tron-provider'
import { POPULAR_TOKENS_WO_LOGO_BY_ADDR } from '../constants'

async function getColorFromToken(token: Token): Promise<string | null> {
  if (token.chainId === ChainId.NILE && token.address === '0xc7AD46e0b8a400Bb3C915120d284AafbA8fc4735') {
    return Promise.resolve('#FAAB14')
  }

  const tokenTronAddress = ethAddress.toTron(token.address)

  let path = `https://static.tronscan.org/production/upload/logo/${tokenTronAddress}.png`

  if (POPULAR_TOKENS_WO_LOGO_BY_ADDR.indexOf(tokenTronAddress) >= 0) {
      path = `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/tron/assets/${tokenTronAddress}/logo.png`
  }

  return Vibrant.from(path)
    .getPalette()
    .then(palette => {
      if (palette?.Vibrant) {
        let detectedHex = palette.Vibrant.hex
        let AAscore = hex(detectedHex, '#FFF')
        while (AAscore < 3) {
          detectedHex = shade(0.005, detectedHex)
          AAscore = hex(detectedHex, '#FFF')
        }
        return detectedHex
      }
      return null
    })
    .catch(() => null)
}

export function useColor(token?: Token) {
  const [color, setColor] = useState('#2172E5')

  useLayoutEffect(() => {
    let stale = false

    if (token) {
      getColorFromToken(token).then(tokenColor => {
        if (!stale && tokenColor !== null) {
          setColor(tokenColor)
        }
      })
    }

    return () => {
      stale = true
      setColor('#2172E5')
    }
  }, [token])

  return color
}
