
import "@nomiclabs/hardhat-waffle";

import "@nomicfoundation/hardhat-verify";

import "hardhat-docgen";

const networks: HardhatUserConfig['networks'] = {};

if (process.env.BASEJUMPDAO_ETHEREUM_DEPLOY_MAINNET_KEY)
	networks['base'] = {
		accounts: [
			process.env.BASEJUMPDAO_ETHEREUM_DEPLOY_MAINNET_KEY
		],
		url: process.env.BASEJUMPDAO_ETHEREUM_DEPLOY_MAINNET_URL,
	};

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
	solidity: {
		version: "0.8.17",
		settings: {
			optimizer: {
				enabled: true,
				runs: 1000
			}
		}
	},
	networks: {
		...networks,
	},
	etherscan: {
		apiKey: {
			base: process.env.BASEJUMPDAO_ETHERSCAN
		},
		customChains: [
			{
				network: "base",
				chainId: 8453,
				urls: {
					apiURL: "https://api.basescan.org/api",
					browserURL: "https://basescan.org/"
				}
			}
		]
	},
	docgen: {
		except: [`Interface`],
	},
	"paths": {
		tests: "./tests"
	}
};
