// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title CreatorToken
 * @notice Minimal ERC-20 token with owner-controlled minting and metadata immutability.
 */
contract CreatorToken is ERC20, Ownable {
    // Immutable token metadata for transparency
    string public creatorName;
    string public creatorHandle;
    string public metadataURI; // e.g., IPFS JSON with creator profile

    // Minting guard for factory-only minting if desired
    address public minter;

    event MinterUpdated(address indexed newMinter);

    constructor(
        string memory name_,
        string memory symbol_,
        string memory creatorName_,
        string memory creatorHandle_,
        string memory metadataURI_,
        address owner_,
        address minter_,
        uint256 initialSupply
    ) ERC20(name_, symbol_) Ownable(owner_) {
        creatorName = creatorName_;
        creatorHandle = creatorHandle_;
        metadataURI = metadataURI_;
        minter = minter_;

        if (initialSupply > 0) {
            _mint(owner_, initialSupply);
        }
    }

    modifier onlyMinter() {
        require(msg.sender == minter || msg.sender == owner(), "NOT_MINTER");
        _;
    }

    function setMinter(address newMinter) external onlyOwner {
        minter = newMinter;
        emit MinterUpdated(newMinter);
    }

    function mint(address to, uint256 amount) external onlyMinter {
        _mint(to, amount);
    }
}


