import { useWeb3 } from './useWeb3'
import VendingMachineContract from '../vendingMachine'
import { useEffect, useState } from 'react'

export const useVendingMachine = () => {
  const web3 = useWeb3()
  const [contract, setContract] = useState<VendingMachineContract>(new VendingMachineContract(web3))

  useEffect(() => {
    setContract(new VendingMachineContract(web3))
  }, [web3])

  return contract
}
