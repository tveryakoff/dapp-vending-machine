'use client'

import Web3 from 'web3'

import { Navbar, Typography, Button } from '@material-tailwind/react'
import Container from '../../components/atoms/Container'
import { useCallback, useState } from 'react'

export default function VendingMachine() {
  const [web3, setWeb3] = useState<Web3<any>>(null)
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
    <>
      <div>
        <Navbar className="mx-auto max-w-screen-xl px-4 py-2 lg:px-8 lg:py-4">
          <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
            <Typography as="a" className="mr-4 cursor-pointer py-1.5 font-medium">
              Vending Machine
            </Typography>
            <div className="flex items-center gap-x-1">
              <Button variant="gradient" size="sm" color="blue" onClick={handleWalletConnect}>
                <span>Connect wallet</span>
              </Button>
            </div>
          </div>
        </Navbar>
        <Container>HELLO</Container>
      </div>
    </>
  )
}
