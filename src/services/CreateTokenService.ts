import CryptumSdk from "cryptum-sdk"
import sleep from "../utils"

class CreateTokenService {
  async execute(name: string, supply: string, symbol: string, decimals: number) {

    if (!name) {
      throw new Error("Incorrect name!");
    }

    if (!symbol) {
      throw new Error("Incorrect symbol!");
    }

    if (!supply) {
      throw new Error("Incorrect supply!");
    }

    if (!decimals) {
      throw new Error("Incorrect decimals!");
    }

    const sdk = new CryptumSdk({
      environment: process.env.ENVIRONMENT === 'mainnet' ? 'mainnet' : 'testnet',
      apiKey: process.env.API_KEY,
    })

    const wallet = await sdk.getWalletController().generateWalletFromPrivateKey({
      protocol: process.env.PROTOCOL,
      privateKey: process.env.PRIVATE_KEY
    })

    await sleep(500)
    const tx = await sdk.token.create({
      protocol: process.env.PROTOCOL,
      wallet,
      symbol,
      name,
      amount: supply,
      decimals
    })
    await sleep(4000)
    const receipt = await sdk.transaction.getTransactionReceiptByHash({ hash: tx.hash, protocol: process.env.PROTOCOL })
    const token = receipt.contractAddress
    return {
      token,
      link: `https://alfajores-blockscout.celo-testnet.org/token/${token}`
    };
  }
}

export { CreateTokenService };
