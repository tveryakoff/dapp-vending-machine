'use client'

import { Avatar, Badge, Button, Layout } from 'antd'
import { memo, useContext } from 'react'
import { Web3Context } from '../../../providers/Web3Provider'
import {useAddressDonutAmount, useMachineDonatAmount} from '../../../blockchain/vendingMachine/queries'

const { Header: HeaderAntd } = Layout

export const Header = memo(() => {
  const { handleConnect, connected } = useContext(Web3Context)
  const { data: myDonutsAmount, isLoading } = useAddressDonutAmount()

  return (
    <HeaderAntd className="flex justify-between items-center">
      <h2 className="text-xl text-white">Vending machine</h2>
      {connected ? (
        <Badge size="small" color="green" offset={[-2, 8]} showZero count={isLoading ? '...' : myDonutsAmount}>
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
