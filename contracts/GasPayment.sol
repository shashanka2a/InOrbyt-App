// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title GasPayment
 * @notice Minimal gas sponsorship accounting contract. Designed to integrate with paymasters.
 */
contract GasPayment is Ownable {
    struct GasRecord {
        uint256 amountWei; // gas cost paid in native token
        uint64 timestamp;
        bytes32 ref; // off-chain correlation id
    }

    // user => records
    mapping(address => GasRecord[]) public userGasRecords;

    event GasSponsored(address indexed user, uint256 amountWei, bytes32 ref);
    event Sweep(address indexed to, uint256 amount);

    constructor(address owner_) Ownable(owner_) {}

    receive() external payable {}

    function sponsorGas(address user, uint256 amountWei, bytes32 ref) external onlyOwner {
        require(address(this).balance >= amountWei, "INSUFFICIENT_FUNDS");
        userGasRecords[user].push(GasRecord({
            amountWei: amountWei,
            timestamp: uint64(block.timestamp),
            ref: ref
        }));
        emit GasSponsored(user, amountWei, ref);
    }

    function getUserGasRecords(address user) external view returns (GasRecord[] memory) {
        return userGasRecords[user];
    }

    function sweep(address payable to, uint256 amount) external onlyOwner {
        uint256 bal = address(this).balance;
        require(amount <= bal, "INSUFFICIENT_BALANCE");
        (bool ok, ) = to.call{value: amount}("");
        require(ok, "TRANSFER_FAILED");
        emit Sweep(to, amount);
    }
}


