import dotenv from 'dotenv'
dotenv.config();

const { NEXT_PUBLIC_PROVIDER_URL, NEXT_PUBLIC_CONTRACT_ADDRESS } = process.env

export const PROVIDER_URL_SEPOLA = 'https://sepolia.infura.io/v3/7a9e6e202a464b599ae545ce148341e9'
export const PROVIDER_URL = 'http://127.0.0.1:8545'
export const CONTRACT_ADDRESS = '0x8D71230D0F72739fA932F53db865867F460E5B83'


