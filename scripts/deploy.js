const { ethers } = require("hardhat");
const fs = require("fs");
async function main(){
    const [deployer] = await ethers.getSigners();
    console.log(`Deploying contracts with account : ${deployer.address}`);

    const getBalance = await deployer.getBalance();
    console.log(`Token balance : ${getBalance.toString()}`);

    const Token = await ethers.getContractFactory('Token');
    const token = await Token.deploy();
    console.log(`Token address : '${token.address}`);

    const data = {
        address : token.address,
        abi : JSON.parse(token.interface.format('json'))
    };
    fs.writeFileSync('frontend/src/Token.json', JSON.stringify(data));

}

main()
    .then(() => process.exit(0))
    .catch(error =>{
        console.error(error);
        process.exit(1);
    });