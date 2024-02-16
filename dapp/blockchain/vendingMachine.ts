import { Contract } from 'web3'
import { PROVIDER_URL, CONTRACT_ADDRESS } from '../config'
import vendingMachineAbi from '../../blockchain/build/contracts/VendingMachine.json'

const vendingMachineContract = new Contract(vendingMachineAbi.abi, CONTRACT_ADDRESS)

vendingMachineContract.setProvider(PROVIDER_URL)

export default vendingMachineContract
