'use client';
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react'

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
const url = process.env.NEXT_PUBLIC_URL;
const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL;


const mainnet = {
    chainId: 207,
    name: 'VinuChain',
    currency: 'VC',
    explorerUrl: 'https://vinuexplorer.org',
    rpcUrl: rpcUrl //https://vinuchain-rpc.com
}
const testnet = {
    chainId: 39438136,
    name: 'Ephemery Testnet',
    currency: 'ETH',
    explorerUrl: 'https://explorer.ephemery.dev/',
    rpcUrl: rpcUrl //https://otter.bordel.wtf/erigon
}


const metadata = {
    name: 'Vinu Shitcoin Lab',
    description: 'The best token creation tool in Vinu Chain!',
    url: url,
    icons: [url]
}

const ethersConfig = defaultConfig({
    metadata,
    enableEIP6963: true,
    enableInjected: true,
    enableCoinbase: true,
    rpcUrl: rpcUrl,
    defaultChainId: 1
})

createWeb3Modal({
    ethersConfig,
    chains: [mainnet],
    projectId,
    enableAnalytics: true
})

export function Web3Modal({ children }) {
    return children;
}