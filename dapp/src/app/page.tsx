'use client'

import Web3 from 'web3'

import { useCallback, useEffect, useState } from 'react'
import vendingMachineContract from '../../blockchain/vendingMachine'
import Container from '../components/atoms/Container'
import { Button, Card, InputNumber } from 'antd'
import Image from 'next/image'

const { Meta } = Card

export default function VendingMachine() {
  const [web3, setWeb3] = useState<Web3<any>>(null)
  const [amount, setAmount] = useState(0)
  const [vendingMachineDonatBalance, setVendingMachineDonatBalance] = useState(0)

  useEffect(() => {
    handleSetDonatBalance()
  }, [])

  const onChange = useCallback(
    (value: number) => {
      setAmount(value)
    },
    [setAmount],
  )

  const handleSetDonatBalance = useCallback(async () => {
    try {
      const result = await vendingMachineContract.getMachineDonatAmount()
      setVendingMachineDonatBalance(result)
    } catch (e) {
      console.log('e', e)
    }
  }, [setVendingMachineDonatBalance])

  return (
    <Container className="lg:max-w-[50%] mt-16">
      <div className="relative w-full min-h-[400px]">
        <Image src="/13155-removebg-preview.png" alt="donat" objectFit="contain" fill={true} />
      </div>
      <div className="flex flex-col justify-end mx-auto lg:max-w-[50%]">
        <div className="flex items-center">
          <Button className="h-[38px]" disabled={amount === 0} onClick={() => onChange(amount - 1)}>
            -
          </Button>
          <InputNumber
            className="block align-middle w-full mx-2"
            size="large"
            min={1}
            max={vendingMachineDonatBalance || 0}
            defaultValue={3}
            onChange={onChange}
            value={amount}
          />
          <Button
            className="h-[38px]"
            disabled={amount >= vendingMachineDonatBalance}
            onClick={() => onChange(amount + 1)}
          >
            +
          </Button>
        </div>
        <Button className="mt-4" size="large" type="primary">
          Purchase
        </Button>
      </div>
    </Container>
  )
}
