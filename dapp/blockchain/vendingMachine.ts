import { Contract, Web3 } from 'web3'
import { PROVIDER_URL, CONTRACT_ADDRESS } from '../config'
import vendingMachineAbi from '../../blockchain/build/contracts/VendingMachine.json'
import { DONUT_PRICE } from '../src/constants'

class VendingMachineContract {
  private readonly contract: Contract<any>
  constructor() {
    const web3 = new Web3(PROVIDER_URL)
    this.contract = new web3.eth.Contract(vendingMachineAbi.abi, CONTRACT_ADDRESS)
    this.contract.setProvider(PROVIDER_URL)
  }

  public async getMachineDonatAmount() {
    return this.contract.methods.getVendingMachineBalance().call()
  }

  public async getDonutAmountByAddress(address: string) {
    const amount = await this.contract.methods.dounatBalances(address).call()
    return Web3.utils.toNumber(amount)
  }

  public async purchase(address: string, amount: number) {
    await this.contract.methods.purchase(amount).send({
      from: address,
      value: `${amount * 50}`,
    })
  }
}

const vendingMachineContract = new VendingMachineContract()

export default vendingMachineContract
