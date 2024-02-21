import { Contract, Web3 } from 'web3'
import { CONTRACT_ADDRESS } from '../../../config'
import vendingMachineAbi from '../../../../blockchain/build/contracts/VendingMachine.json'
import web3 from '../provider'

class VendingMachineContract {
  public readonly contract: Contract<any>
  constructor() {
    this.contract = new web3.eth.Contract(vendingMachineAbi.abi, CONTRACT_ADDRESS)

    this.getMachineDonatAmount.bind(this)
    this.getDonutAmountByAddress.bind(this)
    this.purchase.bind(this)
  }

  public async getMachineDonatAmount() {
    try {
      const amount = await this.contract.methods.getVendingMachineBalance().call()
      return Web3.utils.toNumber(amount)
    } catch (e) {
      console.log('e', e)
    }
  }

  public async getDonutAmountByAddress(address: string) {
    const amount = await this.contract.methods.dounatBalances(address).call()
    return Web3.utils.toNumber(amount)
  }

  public async purchase(address: string, amount: number) {
    try {
      console.log('ad', address, amount)
      return this.contract.methods.purchase(amount).send({
        from: address,
        value: `${amount * 50}`,
      })
    } catch (e) {
      console.error('Purchase error!', e)
    }
  }
}

export const vendingMachineContract = new VendingMachineContract()
