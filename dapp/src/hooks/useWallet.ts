'use client'

import { useCallback, useEffect, useState } from 'react'
import { Web3 } from 'web3'

const handleConnect = async () => {
  try {
    if (typeof window?.ethereum !== 'undefined') {
      await window.ethereum.request({ method: 'eth_requestAccounts' })
      return new Web3(window.ethereum)
    } else {
      console.log('Please install metamask')
    }
  } catch (e) {
    alert('Canceled')
  }
}

const checkConnection = async () => {
  let web3: Web3
  if (window.ethereum) {
    web3 = new Web3(window.ethereum)
  } else if (window.web3) {
    web3 = new Web3(window.web3.currentProvider)
  }

  if (!web3) {
    return {
      connected: false,
    }
  }
  // Check if User is already connected by retrieving the accounts
  const accounts = await web3.eth.getAccounts()

  if (accounts?.length) {
    return {
      connected: true,
      web3,
      accounts,
    }
  }

  return {
    connected: false,
  }
}

export const useWallet = () => {
  const [accounts, setAccounts] = useState([])
  const [connected, setConnected] = useState(false)

  const connect = useCallback(async () => {
    const web3 = await handleConnect()
    setAccounts(await web3.eth.getAccounts())
    setConnected(true)
  }, [setConnected])

  window?.ethereum.on('accountsChanged', (accounts) => {
    setAccounts(accounts)
    setConnected(accounts?.length)
  })

  useEffect(() => {
    checkConnection().then((result) => {
      if (result.connected) {
        setConnected(true)
        setAccounts(result.accounts)
      } else {
        setConnected(false)
      }
    })
  }, [])

  return {
    connected,
    accounts,
    connect,
  }
}
