'use client'

import { Avatar, Badge, Button, Layout } from 'antd'
import { memo, useCallback, useContext, useEffect, useState } from 'react'
import { Web3Context } from '../../../providers/Web3Provider'
import { useVendingMachineContract } from '../../../hooks/useVendingMachineContract'

const { Header: HeaderAntd } = Layout

export const Header = memo(() => {
  const { accounts, handleConnect, connected } = useContext(Web3Context)
  const vendingMachineContract = useVendingMachineContract()

  const [myDonutsAmount, setMyDonutsAmount] = useState(0)

  const handleSetMyDonutsAmount = useCallback(async (accounts) => {
    const amount = await vendingMachineContract.getDonutAmountByAddress(accounts[0])
    setMyDonutsAmount(amount)
  }, [])

  useEffect(() => {
    if (connected) {
      handleSetMyDonutsAmount(accounts)
    }
  }, [connected, accounts])

  return (
    <HeaderAntd className="flex justify-between items-center">
      <h2 className="text-xl text-white">Vending machine</h2>
      {connected ? (
        <Badge size="small" color="green" offset={[-2, 8]} showZero count={myDonutsAmount}>
          <Avatar shape="circle" size="large" src={'/13155-removebg-preview.png'} />
        </Badge>
      ) : (
        <Button type="primary" onClick={handleConnect}>
          Connect wallet
        </Button>
      )}
    </HeaderAntd>
  )
})
