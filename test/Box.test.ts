import { ethers, upgrades } from "hardhat";
import chai from "chai";
import { Box__factory, Box, BoxV2__factory, BoxV2 } from "../typechain";

const { expect } = chai;

describe("MyToken", () => {
    describe("Upgrade", async () => {
        it("should upgrade box", async () => {
            let owner = (await ethers.getSigners())[0];

            let BoxFactory = (await ethers.getContractFactory(
                'Box',
                owner
            )) as Box__factory;

            let boxV1 = (await upgrades.deployProxy(BoxFactory)) as Box;

            await boxV1.deployed();
            expect(boxV1.address).to.properAddress;
                
            let value = 1000;
            await boxV1.store(value);
            expect((await boxV1.retrieve()).toString()).be.equal(value.toString());

            // upgrade 

            let BoxV2Factory = (await ethers.getContractFactory(
                'BoxV2',
                owner
            )) as BoxV2__factory;

            let boxV2 = (await upgrades.upgradeProxy(boxV1.address, BoxV2Factory)) as BoxV2;

            
        });
    });
});

