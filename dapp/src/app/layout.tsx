'use client'
import './globals.css'
import 'antd/dist/reset.css'
import { ConfigProvider, Layout } from 'antd'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Header } from '../components/organisms/Header'
import { Web3ContextProvider } from '../providers/Web3Provider'

const { Content } = Layout

const queryClient = new QueryClient()

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
            <QueryClientProvider client={queryClient}>
              <Layout>
                <Header />
                <Content className="min-h-[90vh]"> {children}</Content>
              </Layout>
            </QueryClientProvider>
          </Web3ContextProvider>
        </ConfigProvider>
      </body>
    </html>
  )
}
