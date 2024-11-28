const rpcUrl =  process.env.NODE_ENV === 'development' ? 'https://otter.bordel.wtf/erigon'
    : 'https://rpc.vinuchain.org'
export default rpcUrl;