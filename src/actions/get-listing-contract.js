'use server'
const fs = require('fs');
import path from "path";
import solc from "solc";

export default async function getListingContract() {
    const sources = {
        'listing.sol': {
            content: fs.readFileSync(path.resolve('src/contracts/listing.sol'), 'utf-8')
        },
        '@openzeppelin/contracts/token/ERC20/IERC20.sol': {
                content: fs.readFileSync(path.resolve('src/contracts/openzeppelin/IERC20.sol'), 'utf-8')
            }
    }
    const input =
        {
            language: 'Solidity',
            sources: sources,

            settings: {
                "optimizer": {
                    "enabled": false,
                    "runs": 200
                },
                evmVersion: "paris",
                outputSelection: {
                    '*': {
                        '*': ['*']
                    }
                }
            }
        };

    const output = JSON.parse(solc.compile(JSON.stringify(input)));

    return {
        bytecode: output.contracts["listing.sol"]['Listing'].evm.bytecode.object,
        abi: output.contracts["listing.sol"]['Listing'].abi,
       // source: sources,
    }
}