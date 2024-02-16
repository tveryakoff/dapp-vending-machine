import { Button, Layout } from 'antd'
import { memo, useCallback } from 'react'
import Web3 from 'web3'

const { Header: HeaderAntd } = Layout

export const Header = memo(({ children }) => {
  const handleWalletConnect = useCallback(async () => {
    try {
      if (typeof window?.ethereum !== 'undefined') {
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        const web3 = new Web3(window.ethereum)
        setWeb3(web3)
      } else {
        console.log('Please install metamask')
      }
    } catch (e) {
      alert('Canceled')
    }
  }, [])
  return (
    <HeaderAntd className="flex justify-between items-center">
      <h2 className="text-xl text-white">Vending machine</h2>
      <Button type="primary" onClick={handleWalletConnect}>
        Connect wallet
      </Button>
    </HeaderAntd>
  )
})
