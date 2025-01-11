// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/// @title A Wallet Contract with Ether-to-Token Conversion
/// @dev Keeps all original functionality and ensures claimReward sends exactly 1 MTK token
contract Wallet {
    /// @dev Emitted when Ether is donated
    /// @param donor The address donating Ether
    /// @param amount The amount of Ether donated
    event Donated(address indexed donor, uint amount);

    /// @dev Emitted when ERC20 tokens are claimed
    /// @param claimant The address claiming the tokens
    /// @param tokenAmount The amount of tokens claimed
    event Claimed(address indexed claimant, uint tokenAmount);

    /// @notice Address of the ERC20 token used for rewards
    IERC20 public rewardToken;

    /// @notice Mapping to track user balances
    mapping(address => uint) public balances;

    /// @notice Constructor to initialize the ERC20 token address
    /// @param tokenAddress The address of the ERC20 token contract
    constructor(address tokenAddress) {
        rewardToken = IERC20(tokenAddress);
    }

    /// @notice Donate Ether to the contract
    /// @dev Increases the sender's balance and emits a Donated event
    function donate() external payable {
        require(msg.value > 0, "You must send some Ether");
        balances[msg.sender] += msg.value;
        emit Donated(msg.sender, msg.value);
    }

    /// @notice Claim exactly 1 MTK token
    /// @dev Sends 1 MTK token from the contract to the caller
    function claimReward() external {
        uint tokenAmount = 1 * 10 ** 18; // 1 token (assuming 18 decimals)
        require(
            rewardToken.balanceOf(address(this)) >= tokenAmount,
            "Not enough tokens in the contract"
        );

        // Transfer 1 MTK token to the user
        bool success = rewardToken.transfer(msg.sender, tokenAmount);
        require(success, "Token transfer failed");

        emit Claimed(msg.sender, tokenAmount);
    }

    /// @notice Retrieves the Ether balance of the contract
    /// @return The balance of Ether in the contract
    function getContractBalance() public view returns (uint) {
        return address(this).balance;
    }

    /// @notice Retrieves the balance of a specific user
    /// @param user The user's address
    /// @return The Ether balance associated with the user
    function getUserBalance(address user) public view returns (uint) {
        return balances[user];
    }
}