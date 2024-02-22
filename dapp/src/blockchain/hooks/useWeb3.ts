import { useEffect, useState } from 'react'
import { Web3 } from 'web3'

export const useWeb3 = () => {
  const [web3, setWeb3] = useState<Web3>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && window?.ethereum) {
      setWeb3(new Web3(window.ethereum))
    } else if (typeof window !== 'undefined' && window?.web3) {
      setWeb3(new Web3(window.web3.currentProvider))
    }
  }, [])

  return web3
}
