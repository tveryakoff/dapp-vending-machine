import { Contract, Web3 } from 'web3'
import { PROVIDER_URL, CONTRACT_ADDRESS } from '../../config'
import vendingMachineAbi from '../../../blockchain/build/contracts/VendingMachine.json'

class VendingMachineContract {
  private readonly contract: Contract<any>
  private readonly web3: Web3
  constructor(web3: Web3) {
    this.web3 = web3
    this.contract = new web3.eth.Contract(vendingMachineAbi.abi, CONTRACT_ADDRESS)
    // this.contract.setProvider(PROVIDER_URL)
  }

  public async getMachineDonatAmount() {
    const amount = await this.contract.methods.getVendingMachineBalance().call()
    return Web3.utils.toNumber(amount)

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

export default VendingMachineContract
