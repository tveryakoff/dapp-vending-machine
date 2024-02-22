import './globals.css'
import 'antd/dist/reset.css'
import { ConfigProvider, Layout } from 'antd'
import { Header } from '../components/organisms/Header'
import { ReactQueryClientProvider } from '../components/providers/ReactQueryProvider'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { Content } from 'antd/es/layout/layout'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <ConfigProvider>
          <ReactQueryClientProvider>
            <AntdRegistry>
              <Layout>
                <Header />
                <Content className="min-h-[90vh]"> {children}</Content>
              </Layout>
            </AntdRegistry>
          </ReactQueryClientProvider>
        </ConfigProvider>
      </body>
    </html>
  )
}
