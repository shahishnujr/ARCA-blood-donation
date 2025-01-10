import { BrowserProvider, Contract, parseEther, formatEther } from "ethers";

// Your contract's ABI with the new methods
const abi = 
[
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "claimant",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Claimed",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "claimReward",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "donate",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "donor",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Donated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "balances",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getContractBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "getUserBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

// Replace with your deployed contract address
const contractAddress = "0xbde2226A763C24D5A210Ca2cA6a902A2B8722a16";

export const getContract = async () => {
  if (typeof window.ethereum === "undefined") {
    throw new Error("MetaMask is not installed");
  }

  const provider = new BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  return new Contract(contractAddress, abi, signer);
};

// Donate Ether to the contract
export const donateEther = async (amount) => {
  const contract = await getContract();
  const value = parseEther(amount.toString());

  const tx = await contract.donate({ value });
  await tx.wait(); // Wait for the transaction to be mined
  return tx;
};

// Claim rewards from the contract
export const claimReward = async () => {
  const contract = await getContract();
  const tx = await contract.claimReward();
  await tx.wait(); // Wait for the transaction to be mined
  return tx;
};

// Get the balance of the contract
export const getBalance = async () => {
  const contract = await getContract();
  const balance = await contract.getBalance();

  return formatEther(balance);
};

// Get the user's balance in the contract
export const getUserBalance = async (address) => {
  const contract = await getContract();
  const balance = await contract.getUserBalance(address);

  return formatEther(balance);
};