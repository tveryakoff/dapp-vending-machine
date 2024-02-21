'use client'

import { useContext } from 'react'
import { Web3Context } from '../providers/Web3Provider'
import VendingMachineContract from '../blockchain/vendingMachine'

export const useVendingMachineContract = () => {
  const { web3 } = useContext(Web3Context)
  return new VendingMachineContract(web3)
}
