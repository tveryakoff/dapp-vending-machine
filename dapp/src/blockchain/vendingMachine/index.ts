'use client'
import { Contract, Web3 } from 'web3'
import { CONTRACT_ADDRESS } from '../../../config'
import vendingMachineAbi from '../../../../blockchain/build/contracts/VendingMachine.json'

class VendingMachineContract {
  public readonly contract: Contract<any>
  public readonly enabled: boolean = false
  constructor(web3: Web3) {
    if (web3) {
      this.enabled = true
      this.contract = new web3.eth.Contract(vendingMachineAbi.abi, CONTRACT_ADDRESS)
    } else {
      this.enabled = false
    }

    this.getMachineDonatAmount.bind(this)
    this.getDonutAmountByAddress.bind(this)
    this.purchase.bind(this)
  }

  public async getMachineDonatAmount() {
    if (!this.contract) {
      return null
    }
    try {
      const amount = await this.contract.methods.getVendingMachineBalance().call()
      return Web3.utils.toNumber(amount)
    } catch (e) {
      console.log('e', e)
    }
  }

  public async getDonutAmountByAddress(address: string) {
    if (!this.contract) {
      return null
    }
    const amount = await this.contract.methods.dounatBalances(address).call()
    return Web3.utils.toNumber(amount)
  }

  public async purchase(address: string, amount: number) {
    if (!this.contract) {
      return null
    }
    try {
      return this.contract.methods.purchase(amount).send({
        from: address,
        value: `${amount * 50}`,
      })
    } catch (e) {
      console.error('Purchase error!', e)
    }
  }
}

export default VendingMachineContract
