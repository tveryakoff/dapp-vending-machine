'use client'
import './globals.css'
import 'antd/dist/reset.css'
import { ConfigProvider, Layout } from 'antd'
import { Header } from '../components/organisms/Header'

const { Footer, Content } = Layout

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <ConfigProvider>
          <Layout>
            <Header />
            <Content className="min-h-[90vh]"> {children}</Content>
          </Layout>
        </ConfigProvider>
      </body>
    </html>
  )
}
