'use client'

import { useCallback, useEffect, useState } from 'react'
import vendingMachineContract from '../../blockchain/vendingMachine'
import Container from '../components/atoms/Container'
import { Button, InputNumber } from 'antd'
import Image from 'next/image'
import { useWallet } from '../hooks/useWallet'

export default function VendingMachine() {
  const [amount, setAmount] = useState(0)
  const [vendingMachineDonatBalance, setVendingMachineDonatBalance] = useState(0)
  const { accounts } = useWallet()
  const [isPurchaseProcessing, setIsPurchaseProcessing] = useState(false)

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

  const handlePurchase = useCallback(async () => {
    setIsPurchaseProcessing(true)
    await vendingMachineContract.purchase(accounts[0], amount)
    setIsPurchaseProcessing(false)
  }, [accounts, amount])

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
        <Button
          className="mt-4"
          size="large"
          type="primary"
          loading={isPurchaseProcessing}
          disabled={amount === 0}
          onClick={handlePurchase}
        >
          Purchase
        </Button>
      </div>
    </Container>
  )
}
