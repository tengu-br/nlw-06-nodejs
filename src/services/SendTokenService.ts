import CryptumSdk from "cryptum-sdk"
import sleep from "../utils"

class SendTokenService {
  async execute(token: string, amount: string, destination: string) {

    if (!token) {
      throw new Error("Incorrect token!");
    }

    if (!amount) {
      throw new Error("Incorrect amount!");
    }

    if (!destination) {
      throw new Error("Incorrect destination!");
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

    const tx = await sdk.token.transfer({
      wallet,
      protocol: process.env.PROTOCOL,
      token,
      destination,
      amount,
    })

    return {
      hash: tx.hash,
      link: `https://alfajores-blockscout.celo-testnet.org/tx/${tx.hash}`
    };
  }
}

export { SendTokenService };
