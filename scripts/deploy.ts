
import * as hre from 'hardhat'

const main = async () => {
	const [deployer, operator] = await hre.ethers.getSigners();

	const BAsejumpDAO = (await hre.ethers.getContractFactory("BAsejumpDAO"))
		.connect(deployer);

	const upgradeableBeacon = await hre.upgrades.deployBeacon(BAsejumpDAO);

	const upgradeableBeaconAddress = upgradeableBeacon.address;

	const deployTransactionHash = upgradeableBeacon.deployTransaction.hash;

	console.log(
		`deployed upgradeable beacon to ${upgradeableBeaconAddress} with transaction ${deployTransactionHash}`
	);

	const operatorAddress = operator.address;

	const transferOwnershipTransaction =
		await upgradeableBeacon.transferOwnership(operatorAddress);

	const transferTransactionHash = transferOwnershipTransaction.hash;

	console.log(
		`changed ownership to ${operatorAddress} with transaction ${transferTransactionHash}`
	);
};

main().catch(err => {
	console.error(err);
	process.exit(1)
});
