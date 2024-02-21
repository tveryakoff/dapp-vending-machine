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

export const useAddressDonutAmount = (address: string) => {
  return useQuery({
    queryKey: [address, QUERY_KEYS.ADDRESS_DONUT_AMOUNT],
    queryFn: () => vendingMachineContract.getDonutAmountByAddress(address),
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
