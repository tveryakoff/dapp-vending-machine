import { useCallback, useEffect, useState } from 'react'
import { useWeb3 } from './useWeb3'

export const useAccounts = () => {
  const web3 = useWeb3()
  const [accounts, setAccounts] = useState([])
  const [connected, setIsConnected] = useState(false)

  useEffect(() => {
    if (web3?.eth) {
      web3.eth.getAccounts().then((res) => {
        setAccounts(res)
        setIsConnected(!!res?.length)
      })
    }
  }, [web3])

  const handleAccountsChanged = useCallback((accList) => {
    setAccounts(accList)
    setIsConnected(!!accList?.length)
  }, [])

  useEffect(() => {
    window?.ethereum.on('accountsChanged', handleAccountsChanged)

    return () => {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged)
    }
  }, [])

  const connect = useCallback(async () => {
    try {
      if (typeof window?.ethereum !== 'undefined') {
        await window.ethereum.request({ method: 'eth_requestAccounts' })
      } else {
        console.log('Please install metamask')
      }
    } catch (e) {
      alert('Canceled')
    }
  }, [])

  return {
    connected,
    accounts,
    connect,
  }
}
