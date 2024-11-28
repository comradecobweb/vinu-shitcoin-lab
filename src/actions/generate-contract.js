'use server';
const solc = require('solc');
const fs = require('fs');
const path = require('path');

async function generateContractCode(values) {
    const header = '// SPDX-License-Identifier: MIT\npragma solidity >=0.8.0;\n\n';

    const imports = await generateImports(values);
    const body = await generateBody(values);

    return header + imports + body;
}

async function generateBody(values) {
    let source = '\ncontract Token is ERC20';

    if (values.burnable) {
        source += ', ERC20Burnable';
    }
    if (values.pausable) {
        source += ', ERC20Pausable';
    }
    if (values.ownable) {
        source += ', Ownable';
    }

    source += '\n{\n';

    if (!values.ownable && (values.pausable || values.mintable)) {
        source += 'address owner;\n';
    }

    source +=
        `    constructor() ERC20(unicode"${values.name}", unicode"${values.symbol}")`;

    if (values.ownable) {
        source += 'Ownable(msg.sender)';
    }

    source += `\n` + '    {\n';

    if (!values.ownable && (values.pausable || values.mintable)) {
        source += 'owner = msg.sender;\n';
    }

    source += `        _mint(msg.sender, ${values.initial_supply} * (10 ** decimals()));` + '    }\n\n';

    if (values.pausable) {
        source += ' function _update(address from, address to, uint256 value)\n' +
            '        internal\n' +
            '        override(ERC20, ERC20Pausable)\n' +
            '    {\n' +
            '        super._update(from, to, value);\n' +
            '    }\n' +
            '\n';

        if (values.ownable) {
            source +=
                '     function pause() public onlyOwner{\n' +
                '        _pause();\n' +
                '    }\n' +
                '\n' +
                '    function unpause() public onlyOwner{\n' +
                '        _unpause();\n' +
                '    }\n';
        } else {
            source +=
                '     function pause() public{\n' +
                '        require(msg.sender==owner, "Only the owner can pause the smart contract!");\n' +
                '        _pause();\n' +
                '    }\n' +
                '\n' +
                '    function unpause() public{\n' +
                '        require(msg.sender==owner, "Only the owner can unpause the smart contract!");\n' +
                '        _unpause();\n' +
                '    }\n';
        }
    }

    if (values.mintable) {
        if (values.ownable) {
            source += 'function mint(address to, uint256 amount) public onlyOwner{\n' +
                '    _mint(to, amount);\n' +
                '}\n';

        } else {
            source += 'function mint(address to, uint256 amount) public {\n' +
                '    require(msg.sender==owner, "Only the owner can mint coins!");\n' +
                '    _mint(to, amount);\n' +
                '}\n';
        }
    }

    if (values.decimals !== 18) {
        source +=
            'function decimals() public view virtual override returns (uint8) {\n' +
            `  return ${values.decimals};\n` +
            '}\n';
    }

    source += '}';
    return source;
}

async function generateImports(values) {
    let imports = 'import "@openzeppelin/contracts/token/ERC20/ERC20.sol";\n';

    if (values.burnable) {
        imports += 'import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";\n';
    }

    if (values.pausable) {
        imports += 'import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";\n';
    }

    if (values.ownable) {
        imports += 'import "@openzeppelin/contracts/access/Ownable.sol";';
    }

    return imports;
}

async function getSources(values) {
    let sources = {
        'contract.sol': {
            content: await generateContractCode(values)
        },
    };

    function read(label) {
        const file = label.slice(label.lastIndexOf('/') + 1);
        sources[label] = {content: fs.readFileSync(path.resolve('src/openzeppelin', file), 'utf-8')};
    }

    read("@openzeppelin/contracts/token/ERC20/ERC20.sol");

    read("@openzeppelin/contracts/interfaces/draft-IERC6093.sol");

    read("@openzeppelin/contracts/utils/Context.sol");

    read("@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol");

    read("@openzeppelin/contracts/token/ERC20/IERC20.sol");

    if (values.burnable) {
        read("@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol");
    }

    if (values.pausable) {
        read("@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol");
        read("@openzeppelin/contracts/utils/Pausable.sol");
        read("@openzeppelin/contracts/GSN/Context.sol")
    }

    if (values.ownable) {
        read("@openzeppelin/contracts/access/Ownable.sol");
    }

    return sources;
}

export default async function generateContract(values) {
    const sources = await getSources(values);

    let input =
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
        bytecode: output.contracts["contract.sol"]['Token'].evm.bytecode.object,
        abi: output.contracts["contract.sol"]['Token'].abi,
        source: sources,
    }
}