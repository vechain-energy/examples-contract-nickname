require("@nomiclabs/hardhat-waffle");
require('@vechain.energy/hardhat-thor')
require('hardhat-contract-sizer');
require("hardhat-jest-plugin")

module.exports = {
  solidity: {
    version: '0.8.13',
    settings: {
      optimizer: {
        enabled: true,
        runs: 1
      }
    }
  },
  networks: {
    vechain: {
      url: 'https://node-testnet.vechain.energy',
      privateKey: "0x1846e1649d8b15508ad7d2ec614e9061a42c64786c20af5e77fe4afb1ed358f6",
      delegateUrl: 'https://sponsor-testnet.vechain.energy/by/90',
      gasPrice: 25000000,
      gas: 25000000
    },
    main: {
      url: 'https://node-mainnet.vechain.energy',
      // @TODO: configure account and optionally delegator:
      // privateKey: '0x',
      // delegateUrl: 'https://sponsor.vechain.energy/by/…',
      gasPrice: 25000000,
      gas: 25000000
    }
  },
  contractSizer: {
    alphaSort: true,
    disambiguatePaths: false,
    runOnCompile: true,
    strict: true
  }
};
