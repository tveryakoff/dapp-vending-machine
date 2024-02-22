import Container from '../components/atoms/Container'
import Image from 'next/image'
import { DonutPurchaseForm } from '../components/organisms/DonutPurchaseForm'
export default function VendingMachine() {
  return (
    <Container className="lg:max-w-[50%] mt-16">
      <div className="relative w-full min-h-[400px]">
        <Image src="/13155-removebg-preview.png" alt="donat" objectFit="contain" fill={true} />
      </div>
      <DonutPurchaseForm />
    </Container>
  )
}
