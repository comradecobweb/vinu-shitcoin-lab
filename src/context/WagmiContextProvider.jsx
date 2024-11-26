'use client'
import {wagmiAdapter, projectId, epheremy_testnet} from '@/config'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {createAppKit} from '@reown/appkit/react'
import {cookieToInitialState, WagmiProvider} from 'wagmi'

const url = process.env.NEXT_PUBLIC_URL;
const queryClient = new QueryClient()

if (!projectId) {
    throw new Error('Project ID is not defined')
}

const metadata = {
    name: 'vinu-shitcoin-lab',
    description: 'ERC-20 token creator on Vinu Chain.',
    url: url,
    icons: [url]
}

const modal = createAppKit({
    adapters: [wagmiAdapter],
    projectId,
    networks: [epheremy_testnet],
    defaultNetwork: epheremy_testnet,
    metadata: metadata,
    features: {
        analytics: true
    }
})

function WagmiContextProvider({children, cookies}) {
    const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig, cookies)

    return (
        <WagmiProvider config={wagmiAdapter.wagmiConfig} initialState={initialState}>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </WagmiProvider>
    )
}

export default WagmiContextProvider