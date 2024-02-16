import { Contract, Web3 } from 'web3'
import { PROVIDER_URL, CONTRACT_ADDRESS } from '../config'
import vendingMachineAbi from '../../blockchain/build/contracts/VendingMachine.json'

class VendingMachineContract {
  private readonly contract: Contract<any>
  constructor() {
    this.contract = new Contract(vendingMachineAbi.abi, CONTRACT_ADDRESS)
    this.contract.setProvider(PROVIDER_URL)
  }

  public async getMachineDonatAmount() {
    return this.contract.methods.getVendingMachineBalance().call()
  }

  public async getDonutAmountByAddress(address: string) {
    const amount = await this.contract.methods.dounatBalances(address).call()
    return Web3.utils.toNumber(amount)
  }
}

const vendingMachineContract = new VendingMachineContract()

export default vendingMachineContract
