import { cookieStorage, createStorage} from '@wagmi/core'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

if (!projectId) {
  throw new Error('Project ID is not defined!')
}

export const epheremy_testnet= {
  id: 39438139,
  name: 'ephemery-testnet',
  nativeCurrency: {
    name: 'Ether', symbol: 'ETH', decimals: 18
  },
  rpcUrls: {
    default: {
      http: ['https://otter.bordel.wtf/erigon']
    },
  },
  blockExplorers: {
    default: {
      name: 'Epheremy Explorer', url: 'https://explorer.ephemery.dev/'
    },
  },
};

export const networks = [epheremy_testnet]

export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage
  }),
  ssr: true,
  projectId,
  networks
})

export const config = wagmiAdapter.wagmiConfig