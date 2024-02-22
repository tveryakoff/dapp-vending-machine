import { memo } from 'react'
import { WalletConnect } from './components/WalletConnect'
import { Header as AntdHeader } from 'antd/es/layout/layout'

export const Header = memo(() => {
  return (
    <AntdHeader className="flex justify-between items-center">
      <h2 className="text-xl text-white">Vending machine</h2>
      <WalletConnect />
    </AntdHeader>
  )
})
