'use client'

import { useCallback, useContext, useState } from 'react'
import Container from '../components/atoms/Container'
import { Button, InputNumber } from 'antd'
import Image from 'next/image'
import { useMachineDonatAmount, usePurchase } from '../blockchain/vendingMachine/queries'
import { Web3Context } from '../providers/Web3Provider'

export default function VendingMachine() {
  const [amount, setAmount] = useState(0)
  const { mutate: purchase, isPending: isPurchaseProcessing } = usePurchase()
  const { accounts } = useContext(Web3Context)
  const { data } = useMachineDonatAmount()

  const onChange = useCallback(
    (value: number) => {
      setAmount(value)
    },
    [setAmount],
  )

  const handlePurchase = useCallback(() => {
    purchase({ address: accounts[0], amount })
  }, [accounts, amount, purchase])

  return (
    <Container className="lg:max-w-[50%] mt-16">
      <div className="relative w-full min-h-[400px]">
        <Image src="/13155-removebg-preview.png" alt="donat" objectFit="contain" fill={true} />
      </div>
      <div className="flex flex-col justify-end mx-auto lg:max-w-[50%]">
        <h2>
          Donuts supply: <span className="text-pink-500">{data}</span>
        </h2>
        <div className="flex items-center">
          <Button className="h-[38px]" disabled={amount === 0} onClick={() => onChange(amount - 1)}>
            -
          </Button>
          <InputNumber
            className="block align-middle w-full mx-2"
            size="large"
            min={1}
            max={data || 0}
            onChange={onChange}
            value={amount}
          />
          <Button className="h-[38px]" disabled={amount >= data} onClick={() => onChange(amount + 1)}>
            +
          </Button>
        </div>
        <Button
          className="mt-4"
          size="large"
          type="primary"
          loading={isPurchaseProcessing}
          // disabled={amount === 0}
          onClick={handlePurchase}
        >
          Purchase
        </Button>
      </div>
    </Container>
  )
}
