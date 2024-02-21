'use client'
import './globals.css'
import 'antd/dist/reset.css'
import { ConfigProvider, Layout } from 'antd'
import { Header } from '../components/organisms/Header'
import { Web3ContextProvider } from '../providers/Web3Provider'

const { Content } = Layout

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <ConfigProvider>
          <Web3ContextProvider>
            <Layout>
              <Header />
              <Content className="min-h-[90vh]"> {children}</Content>
            </Layout>
          </Web3ContextProvider>
        </ConfigProvider>
      </body>
    </html>
  )
}
