'use client'

import { useCallback, useContext, useEffect, useState } from 'react'
import Container from '../components/atoms/Container'
import { Button, InputNumber } from 'antd'
import Image from 'next/image'
import { useVendingMachineContract } from '../hooks/useVendingMachineContract'
import { Web3Context } from '../providers/Web3Provider'

export default function VendingMachine() {
  const [amount, setAmount] = useState(0)
  const [vendingMachineDonatBalance, setVendingMachineDonatBalance] = useState(0)
  const { accounts } = useContext(Web3Context)
  const [isPurchaseProcessing, setIsPurchaseProcessing] = useState(false)
  const vendingMachineContract = useVendingMachineContract()

  const handleSetDonatBalance = useCallback(async () => {
    try {
      const result = await vendingMachineContract.getMachineDonatAmount()
      setVendingMachineDonatBalance(result as number)
    } catch (e) {
      console.log('e', e)
    }
  }, [setVendingMachineDonatBalance, vendingMachineContract])

  useEffect(() => {
    handleSetDonatBalance()
  }, [handleSetDonatBalance])

  const onChange = useCallback(
    (value: number) => {
      setAmount(value)
    },
    [setAmount],
  )

  const handlePurchase = useCallback(async () => {
    try {
      setIsPurchaseProcessing(true)
      await vendingMachineContract.purchase(accounts[0], amount)
      setIsPurchaseProcessing(false)
    } catch (e) {
      setIsPurchaseProcessing(false)
    }
  }, [accounts, amount])

  return (
    <Container className="lg:max-w-[50%] mt-16">
      <div className="relative w-full min-h-[400px]">
        <Image src="/13155-removebg-preview.png" alt="donat" objectFit="contain" fill={true} />
      </div>
      <div className="flex flex-col justify-end mx-auto lg:max-w-[50%]">
        <h2>
          Donuts supply: <span className="text-pink-500">{vendingMachineDonatBalance}</span>
        </h2>
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
