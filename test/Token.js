const chai = require('chai');
const {expect} = chai;
const { ethers } = require('hardhat');
const { solidity } = require("ethereum-waffle");
chai.use(solidity);

describe('Token Contract', ()=>{
    let Token, token, owner, addr1, addr2;
    beforeEach(async() =>{
        Token = await ethers.getContractFactory('Token');
        token = await Token.deploy();
        [owner, addr1, addr2, _] = await ethers.getSigners();
    });
    describe('Deployment', () =>{
        it('Should set the right owner',async() =>{
            expect(await token.owner()).to.equal(owner.address);
        });
        it('should assign total suuply to owner', async()=>{
            const ownerbalance = await token.balanceOf(owner.address);
            expect(await token.totalSupply()).to.equal(ownerbalance);
        })
    })

    describe('Transactions', ()=>{
        it('should transfer tokens between accounts', async()=>{
            await token.transferToken(addr1.address, 50);
            const addr1Balance = await token.balanceOf(addr1.address);
            expect(addr1Balance).to.equal(50);

            await token.connect(addr1).transferToken(addr2.address, 50);
            const addr2Balance = await token.balanceOf(addr2.address);
            expect(addr2Balance).to.equal(50);

        })

        it('should fail if sender dosent have enough funds', async()=>{
            const initialBalanceOwner = await token.balanceOf(owner.address);
            await expect( 
                token
                .connect(addr2)
                .transferToken(owner.address, 1000)
            )
                .to
                .be
                .revertedWith("Not enough tokens");
            
            expect (
                await token.balanceOf(owner.address)
            )
            .to
            .equal(initialBalanceOwner);

        });
    })
})