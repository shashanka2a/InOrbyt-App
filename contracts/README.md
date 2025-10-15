# InOrbyt Smart Contracts (MVP)

This folder contains minimal, MVP-ready Solidity contracts aligned with the MVP Readiness doc.

Contracts:
- `CreatorToken.sol`: ERC-20 for creators (mintable by owner/minter), immutable creator metadata.
- `TokenFactory.sol`: Deploys `CreatorToken` per creator, optional creation fee, registry.
- `PerkContract.sol`: Token-gated perk redemption with off-chain metadata and limits.
- `GasPayment.sol`: Tracks gas sponsorship events for users; funds managed by owner.
- `LiquidityPool.sol`: Minimal constant-product AMM for CreatorToken-ETH swaps (no fees).

Notes:
- Solidity ^0.8.20 with OpenZeppelin. Install deps and a local toolchain (Hardhat or Foundry).
- These contracts are MVP-simple; audit and expand before production.

## Quickstart (Hardhat)

```bash
# From repo root
npm i -D hardhat @nomicfoundation/hardhat-toolbox @openzeppelin/contracts ethers
npx hardhat init --force
```

Add this to `hardhat.config.ts` or `hardhat.config.js`:

```ts
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
    baseSepolia: {
      url: process.env.ALCHEMY_BASE_SEPOLIA_URL || "",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : []
    }
  }
};
export default config;
```

## Deployment sketch

```ts
// Factory deploy
const TokenFactory = await ethers.getContractFactory("TokenFactory");
const factory = await TokenFactory.deploy(ownerAddress);

// Create creator token via factory
const tx = await factory.createToken(
  "Alice Token",
  "ALC",
  "Alice",
  "@alice",
  "ipfs://...",
  ethers.parseUnits("1000000", 18)
);
const receipt = await tx.wait();
const event = receipt!.logs.find(l => (l as any).eventName === "TokenCreated") as any;
const tokenAddress = event?.args?.token;

// Perks for that token
const Perk = await ethers.getContractFactory("PerkContract");
const perk = await Perk.deploy(tokenAddress, ownerAddress);
await perk.createPerk("VIP Access", "Meet & greet", "ipfs://perk", ethers.parseUnits("100", 18), 100, true);

// Gas payment vault
const Gas = await ethers.getContractFactory("GasPayment");
const gas = await Gas.deploy(ownerAddress);
await owner.sendTransaction({ to: await gas.getAddress(), value: ethers.parseEther("0.5") });

// Minimal AMM
const Pool = await ethers.getContractFactory("LiquidityPool");
const pool = await Pool.deploy(tokenAddress, ownerAddress);
await token.approve(await pool.getAddress(), ethers.parseUnits("100000", 18));
await pool.addLiquidity(ethers.parseUnits("100000", 18), { value: ethers.parseEther("10") });
```

## Security and limitations
- No reentrancy guards or fee logic in `LiquidityPool` (MVP only).
- `PerkContract` uses simple balance checks; consider snapshots/allowlists for advanced cases.
- `GasPayment` only accounts; connect to a Paymaster/Biconomy for gasless UX.
- `CreatorToken` is mintable; lock minter or remove minting for fixed supply.

Before mainnet: add tests, audits, access controls, pausability, and upgrade plan.
