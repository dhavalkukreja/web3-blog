require("@nomiclabs/hardhat-waffle");

const fs = require("fs")
const privateKey = fs.readFileSync(".secret").toString().trim() || "01234567890123456789";

module.exports = {
  solidity: "0.8.4",
  networks: {
    hardhat: {
      chainId: 1337 //we will be using metamask and its localhost has this chainId
    },
    mumbai: {
      url: "https://rpc-mumbai.maticvigil.com/v1/0c4335732784d5e51a54a927e67e4e0bf6aa9895",
      accounts: [privateKey]
    },
    // polygon: {
    //   url: "https://polygon-rpc.com/",
    //   accounts: [process.env.pk]
    // }
  }
};