
import * as hre from "hardhat";

import { ethers } from "ethers";

import { expect } from "chai";

export let deployer: ethers.Signer;
export let operator: ethers.Signer;

let BasejumpDAO: ethers.Contract;

before(async () => {
	[deployer, operator] = await hre.ethers.getSigners();

	const BAsejumpDAO = await hre.ethers.getContractFactory("BAsejumpDAO");

	BasejumpDAO = await BAsejumpDAO.connect(deployer).deploy();

	BasejumpDAO.initialise(operator.getAddress());
});

describe("preliminary structure tests", () => {
	it("disable the contract, then enable it?", async () => {
		const test = BasejumpDAO.connect(operator);

		await test.disableContract();

		expect(await test.enabled_()).to.equal(false);

		await test.enableContract();

		expect(await test.enabled_()).to.equal(true);
	});
});
