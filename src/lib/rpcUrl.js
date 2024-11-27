import {isDev} from "@/lib/lib";
import {epheremyTestnet, vinuChain} from "@/config";

const rpcUrl = isDev ? epheremyTestnet.rpcUrls.default.http[0] : vinuChain.rpcUrls.default.http[0];
export default rpcUrl;