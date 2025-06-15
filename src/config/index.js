import {cookieStorage, createStorage} from '@wagmi/core'
import {WagmiAdapter} from '@reown/appkit-adapter-wagmi'
import {isDev} from "@/lib/lib";

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

if (!projectId) {
    throw new Error('Project ID is not defined!')
}

export const epheremyTestnet = {
    id: 39438146,
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

export const vinuChain = {
    id: 207,
    name: 'VinuChain',
    nativeCurrency: {
        decimals: 18,
        name: 'VinuChain',
        symbol: 'VC'
    },
    rpcUrls: {
        default: {
            http: ['https://rpc.vinuchain.org']
        }
    },
    blockExplorers: {
        default: {
            name: 'VinuScan',
            url: 'https://vinuscan.com'
        }
    },
    contracts: {
        sfc: {
            address: '0xFC00FACE00000000000000000000000000000000'
        },
        stake: {
            address: '0xb914a0b16111BaB228ae6214e6E1FD4a5EaE877C'
        },
        payback: {
            address: '0x1c4269fbbd4a8254f69383eef6af720bcd0acda6'
        }
    }
}

export const networks = isDev ? [epheremyTestnet] : [vinuChain]

export const wagmiAdapter = new WagmiAdapter({
    storage: createStorage({
        storage: cookieStorage
    }),
    ssr: true,
    projectId,
    networks
})

export const config = wagmiAdapter.wagmiConfig