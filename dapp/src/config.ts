import dotenv from 'dotenv'
dotenv.config()

export const PROVIDER_URL = process.env.NEXT_PUBLIC_PROVIDER_URL
export const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
export const DONUT_PRICE = parseInt(process.env.NEXT_PUBLIC_DONUT_PRICE, 10)
