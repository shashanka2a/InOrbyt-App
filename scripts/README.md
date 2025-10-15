# Deployment scripts (Hardhat)

## Prereqs
- npm i -D hardhat @nomicfoundation/hardhat-toolbox @openzeppelin/contracts ethers dotenv
- Create a `.env` in project root with:
  - ALCHEMY_BASE_SEPOLIA_URL
  - PRIVATE_KEY (deployer)
  - BASESCAN_API_KEY (optional for verify)

## Useful commands

```bash
# compile
npx hardhat compile

# deploy factory
npx hardhat run scripts/hardhat/deploy-factory.js --network baseSepolia

# create a token via factory
FACTORY_ADDRESS=0x... TOKEN_NAME="MyToken" TOKEN_SYMBOL=MTK npx hardhat run scripts/hardhat/create-token.js --network baseSepolia

# deploy all (factory, token, perk, gas, pool)
SEED_LP=true SEED_TOKEN=100000 SEED_ETH=10 npx hardhat run scripts/hardhat/deploy-all.js --network baseSepolia
```

## Notes
- Add tests and verification (npx hardhat verify ...) before production.
- Keep private keys secure.
