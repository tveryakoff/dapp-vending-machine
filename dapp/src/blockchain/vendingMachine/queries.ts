import {
  DefaultError,
  QueryKey,
  UndefinedInitialDataOptions,
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { useAccounts } from '../hooks/useAccounts'
import { useVendingMachine } from '../hooks/useVendingMachine'

export const QUERY_KEYS = {
  MACHINE_DONUT_AMOUNT: 'machineDonutAmount',
  ADDRESS_DONUT_AMOUNT: 'addressDonutAmount',
}

type Options = UndefinedInitialDataOptions<unknown, DefaultError, unknown, QueryKey>

type MutationOptions = UseMutationOptions<{ address: string; amount: number }, DefaultError, void, unknown>

export const useMachineDonatAmount = () => {
  const vendingMachineContract = useVendingMachine()
  return useQuery({
    queryKey: [QUERY_KEYS.MACHINE_DONUT_AMOUNT, vendingMachineContract.enabled],
    queryFn: () => vendingMachineContract.getMachineDonatAmount(),
    enabled: true,
  } as Options)
}

export const useAddressDonutAmount = () => {
  const { accounts } = useAccounts()
  const vendingMachineContract = useVendingMachine()

  return useQuery({
    queryKey: [QUERY_KEYS.ADDRESS_DONUT_AMOUNT, accounts, vendingMachineContract.enabled],
    queryFn: () => vendingMachineContract.getDonutAmountByAddress(accounts?.[0]),
    enabled: true,
  } as Options)
}

export const usePurchase = () => {
  const queryClient = useQueryClient()
  const vendingMachineContract = useVendingMachine()

  return useMutation<{ address: string; amount: number }>({
    mutationFn: ({ address, amount }) => vendingMachineContract?.purchase?.(address, amount),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.MACHINE_DONUT_AMOUNT] })
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ADDRESS_DONUT_AMOUNT] })
    },
  } as MutationOptions)
}
