import {BrowserProvider, FallbackProvider, JsonRpcProvider, JsonRpcSigner} from 'ethers'
import {useMemo} from 'react'
import {useClient, useConnectorClient} from 'wagmi'
import {useAppKitNetwork} from "@reown/appkit/react";

function clientToProvider(client) {
    const {chain, transport} = client
    const network = {
        chainId: chain.id,
        name: chain.name,
        ensAddress: chain.contracts?.ensRegistry?.address,
    }
    if (transport.type === 'fallback') {
        const providers = transport.transports.map(
            ({value}) => new JsonRpcProvider(value?.url, network),
        );
        if (providers.length === 1) return providers[0]
        return new FallbackProvider(providers)
    }
    return new JsonRpcProvider(transport.url, network)
}

export function useEthersProvider() {
    const {chainId} = useAppKitNetwork()
    const client = useClient({chainId})
    return useMemo(() => (client ? clientToProvider(client) : undefined), [client])
}

function clientToSigner(client) {
    const {account, chain, transport} = client
    const network = {
        chainId: chain.id,
        name: chain.name,
        ensAddress: chain.contracts?.ensRegistry?.address,
    }
    const provider = new BrowserProvider(transport, network)
    return new JsonRpcSigner(provider, account.address)
}

export function useEthersSigner() {
    const {chainId} = useAppKitNetwork()
    const {data: client} = useConnectorClient({chainId})
    return useMemo(() => (client ? clientToSigner(client) : undefined), [client])
}