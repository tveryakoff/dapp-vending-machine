'use client'

import { memo, useCallback, useState } from 'react'
import { Button, InputNumber } from 'antd'
import { useMachineDonatAmount, usePurchase } from '../../../blockchain/vendingMachine/queries'
import { useAccounts } from '../../../blockchain/hooks/useAccounts'

export const DonutPurchaseForm = memo(() => {
  const [amount, setAmount] = useState(0)
  const { mutate: purchase, isPending: isPurchaseProcessing } = usePurchase()
  const { accounts } = useAccounts()
  const { data: machineDonutAmount } = useMachineDonatAmount()

  const handlePurchase = useCallback(() => {
    purchase({ address: accounts[0], amount })
  }, [accounts, amount, purchase])

  return (
    <div className="flex flex-col justify-end mx-auto lg:max-w-[50%]">
      <h2>
        Donuts supply: <span className="text-pink-500">{machineDonutAmount}</span>
      </h2>
      <div className="flex items-center">
        <Button className="!h-[38px]" disabled={amount === 0} onClick={() => setAmount(amount - 1)}>
          -
        </Button>
        <InputNumber
          className="block align-middle !w-full mx-2"
          size="large"
          min={1}
          max={machineDonutAmount || 0}
          onChange={setAmount}
          value={amount}
        />
        <Button className="!h-[38px]" disabled={amount >= machineDonutAmount} onClick={() => setAmount(amount + 1)}>
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
  )
})

DonutPurchaseForm.displayName = 'DonutPurchaseForm'
