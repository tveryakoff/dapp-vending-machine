'use client'

import { Avatar, Badge, Button } from 'antd'
import { useAccounts } from '../../../../blockchain/hooks/useAccounts'
import { useAddressDonutAmount } from '../../../../blockchain/vendingMachine/queries'
import { memo } from 'react'

export const WalletConnect = memo(() => {
  const { connected, connect } = useAccounts()
  const { data: myDonutsAmount, isLoading } = useAddressDonutAmount()

  return (
    <>
      {connected ? (
        <Badge size="small" color="green" offset={[-2, 8]} showZero count={isLoading ? '...' : myDonutsAmount}>
          <Avatar shape="circle" size="large" src={'/13155-removebg-preview.png'} />
        </Badge>
      ) : (
        <Button type="primary" onClick={connect}>
          Connect wallet
        </Button>
      )}
    </>
  )
})
