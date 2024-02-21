'use client'

import { createContext, ReactNode, useEffect, useState } from 'react'
import { Web3 } from 'web3'
import web3 from '../../blockchain/provider'

type Props = {
  children: ReactNode
}

type Web3ContextValue = {
  web3: Web3 | null
  connected: boolean
  accounts: Array<any>
  handleConnect?: () => Promise<any>
}

export const Web3Context = createContext<Web3ContextValue>({ web3: null, connected: false, accounts: [] })

const connect = async () => {
  console.log('here', window.ethereum)
  try {
    if (typeof window?.ethereum !== 'undefined') {
      console.log('here')
      await window.ethereum.request({ method: 'eth_requestAccounts' })
    } else {
      console.log('Please install metamask')
    }
  } catch (e) {
    alert('Canceled')
  }
}

export const Web3ContextProvider = ({ children }: Props) => {
  const [accounts, setAccounts] = useState([])
  const [connected, setIsConnected] = useState(false)

  useEffect(() => {
    web3.eth.getAccounts().then((res) => {
      console.log('res', res)
      setAccounts(res)
      setIsConnected(res?.length)
    })
  }, [web3])

  window?.ethereum.on('accountsChanged', (accounts) => {
    console.log('accounts changes', accounts)
    setAccounts(accounts)
    setIsConnected(accounts?.length)
  })

  return (
    <Web3Context.Provider
      value={{
        web3,
        connected,
        accounts,
        handleConnect: connect,
      }}
    >
      {children}
    </Web3Context.Provider>
  )
}
