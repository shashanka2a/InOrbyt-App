// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title PerkContract
 * @notice Simple token-gated perk redemption with off-chain metadata.
 */
contract PerkContract is Ownable {
    struct Perk {
        // requirements
        uint256 minTokenBalance; // minimum CreatorToken balance required
        bool active;
        // metadata
        string name;
        string description;
        string metadataURI; // points to perk details, terms, redemption instructions
        // supply/limits
        uint256 maxRedemptions; // 0 means unlimited
        uint256 redeemedCount;
    }

    IERC20 public immutable creatorToken;
    mapping(uint256 => Perk) public perks; // perkId => Perk
    mapping(uint256 => mapping(address => uint256)) public userRedemptions; // perkId => user => count

    event PerkCreated(uint256 indexed perkId, string name);
    event PerkUpdated(uint256 indexed perkId);
    event PerkRedeemed(uint256 indexed perkId, address indexed user, uint256 newCount);

    uint256 public nextPerkId;

    constructor(address creatorToken_, address owner_) Ownable(owner_) {
        require(creatorToken_ != address(0), "TOKEN_REQUIRED");
        creatorToken = IERC20(creatorToken_);
    }

    function createPerk(
        string calldata name,
        string calldata description,
        string calldata metadataURI,
        uint256 minTokenBalance,
        uint256 maxRedemptions,
        bool active
    ) external onlyOwner returns (uint256 perkId) {
        perkId = nextPerkId++;
        perks[perkId] = Perk({
            minTokenBalance: minTokenBalance,
            active: active,
            name: name,
            description: description,
            metadataURI: metadataURI,
            maxRedemptions: maxRedemptions,
            redeemedCount: 0
        });
        emit PerkCreated(perkId, name);
    }

    function updatePerk(
        uint256 perkId,
        string calldata name,
        string calldata description,
        string calldata metadataURI,
        uint256 minTokenBalance,
        uint256 maxRedemptions,
        bool active
    ) external onlyOwner {
        Perk storage p = perks[perkId];
        p.name = name;
        p.description = description;
        p.metadataURI = metadataURI;
        p.minTokenBalance = minTokenBalance;
        p.maxRedemptions = maxRedemptions;
        p.active = active;
        emit PerkUpdated(perkId);
    }

    function canRedeem(address user, uint256 perkId) public view returns (bool) {
        Perk storage p = perks[perkId];
        if (!p.active) return false;
        if (p.maxRedemptions != 0 && p.redeemedCount >= p.maxRedemptions) return false;
        if (creatorToken.balanceOf(user) < p.minTokenBalance) return false;
        return true;
    }

    function redeem(uint256 perkId) external {
        require(canRedeem(msg.sender, perkId), "NOT_ELIGIBLE");
        Perk storage p = perks[perkId];
        p.redeemedCount += 1;
        userRedemptions[perkId][msg.sender] += 1;
        emit PerkRedeemed(perkId, msg.sender, userRedemptions[perkId][msg.sender]);
    }
}


