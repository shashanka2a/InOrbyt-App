// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Address.sol";

import "./CreatorToken.sol";

/**
 * @title TokenFactory
 * @notice Deploys CreatorToken instances for creators, tracks registry, and supports fees.
 */
contract TokenFactory is Ownable {
    using Address for address;

    struct TokenInfo {
        address token;
        address creator;
        string name;
        string symbol;
        string metadataURI;
    }

    // creator => token address
    mapping(address => address) public creatorToToken;
    // token => info
    mapping(address => TokenInfo) public tokenInfo;
    // list of tokens
    address[] public allTokens;

    // Optional creation fee (in wei) sent to feeRecipient
    uint256 public creationFee;
    address public feeRecipient;

    event TokenCreated(address indexed creator, address indexed token, string name, string symbol);
    event CreationFeeUpdated(uint256 fee, address recipient);

    constructor(address owner_) Ownable(owner_) {}

    function setCreationFee(uint256 fee, address recipient) external onlyOwner {
        creationFee = fee;
        feeRecipient = recipient;
        emit CreationFeeUpdated(fee, recipient);
    }

    function createToken(
        string calldata name,
        string calldata symbol,
        string calldata creatorName,
        string calldata creatorHandle,
        string calldata metadataURI,
        uint256 initialSupply
    ) external payable returns (address token) {
        require(creatorToToken[msg.sender] == address(0), "ALREADY_CREATED");
        if (creationFee > 0) {
            require(msg.value >= creationFee, "FEE_REQUIRED");
            // forward fee
            (bool ok, ) = feeRecipient.call{value: creationFee}("");
            require(ok, "FEE_TRANSFER_FAILED");
            // refund excess
            uint256 excess = msg.value - creationFee;
            if (excess > 0) {
                (ok, ) = msg.sender.call{value: excess}("");
                require(ok, "REFUND_FAILED");
            }
        }

        CreatorToken t = new CreatorToken(
            name,
            symbol,
            creatorName,
            creatorHandle,
            metadataURI,
            msg.sender,
            address(this),
            initialSupply
        );
        token = address(t);

        creatorToToken[msg.sender] = token;
        tokenInfo[token] = TokenInfo({
            token: token,
            creator: msg.sender,
            name: name,
            symbol: symbol,
            metadataURI: metadataURI
        });
        allTokens.push(token);

        emit TokenCreated(msg.sender, token, name, symbol);
    }

    function getAllTokens() external view returns (address[] memory) {
        return allTokens;
    }
}


