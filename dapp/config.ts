import dotenv from 'dotenv'
dotenv.config();

const { NEXT_PUBLIC_PROVIDER_URL, NEXT_PUBLIC_CONTRACT_ADDRESS } = process.env

export const PROVIDER_URL = 'http://127.0.0.1:8545'
export const CONTRACT_ADDRESS = '0xE619550ccDAC95b978A01a98DE116DD3993Ad0F8'


