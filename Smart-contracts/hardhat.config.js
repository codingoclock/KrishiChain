require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    // Local development network
    hardhat: {
      chainId: 31337
    },
    localhost: {
      url: "http://127.0.0.1:8545/",
      chainId: 31337,
    },
    mainnet: {
      url: 0x7200A398E8B8148a8942d9Aa0Ae379224F347875,
      accounts: 0xe3121db404c261a0329f4f9e4ba3cf64ffda66c25a6385df932dc0a0d4e594db,
      chainId: 1
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  }
}; 