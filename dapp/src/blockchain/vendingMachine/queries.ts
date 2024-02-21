import {
  DefaultError,
  QueryKey,
  UndefinedInitialDataOptions,
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { vendingMachineContract } from './index'
import { useContext } from 'react'
import { Web3Context } from '../../providers/Web3Provider'

export const QUERY_KEYS = {
  MACHINE_DONUT_AMOUNT: 'machineDonutAmount',
  ADDRESS_DONUT_AMOUNT: 'addressDonutAmount',
}

type Options = UndefinedInitialDataOptions<unknown, DefaultError, unknown, QueryKey>

type MutationOptions = UseMutationOptions<unknown, DefaultError, void, unknown>

export const useMachineDonatAmount = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.MACHINE_DONUT_AMOUNT],
    queryFn: () => vendingMachineContract.getMachineDonatAmount(),
    enabled: true,
  } as Options)
}

export const useAddressDonutAmount = () => {
  const { accounts } = useContext(Web3Context)
  return useQuery({
    queryKey: [QUERY_KEYS.ADDRESS_DONUT_AMOUNT, accounts?.[0]],
    queryFn: () => vendingMachineContract.getDonutAmountByAddress(accounts?.[0]),
    enabled: true,
  } as Options)
}

export const usePurchase = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ address, amount }) => vendingMachineContract.purchase(address, amount),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.MACHINE_DONUT_AMOUNT] })
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ADDRESS_DONUT_AMOUNT] })
    },
  } as MutationOptions)
}
