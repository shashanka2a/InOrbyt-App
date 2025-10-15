const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deployer:", deployer.address);

  // Factory
  const TokenFactory = await ethers.getContractFactory("TokenFactory");
  const factory = await TokenFactory.deploy(deployer.address);
  await factory.waitForDeployment();
  const factoryAddr = await factory.getAddress();
  console.log("TokenFactory:", factoryAddr);

  // Create token
  const tx = await factory.createToken(
    process.env.TOKEN_NAME || "CreatorToken",
    process.env.TOKEN_SYMBOL || "CRT",
    process.env.CREATOR_NAME || "Creator",
    process.env.CREATOR_HANDLE || "@creator",
    process.env.METADATA_URI || "ipfs://metadata",
    ethers.parseUnits(process.env.INITIAL_SUPPLY || "1000000", 18)
  );
  const receipt = await tx.wait();
  const created = receipt.logs.find((l) => l.eventName === "TokenCreated");
  const tokenAddr = created.args.token;
  console.log("CreatorToken:", tokenAddr);

  // Perk
  const Perk = await ethers.getContractFactory("PerkContract");
  const perk = await Perk.deploy(tokenAddr, deployer.address);
  await perk.waitForDeployment();
  const perkAddr = await perk.getAddress();
  console.log("PerkContract:", perkAddr);

  // Gas vault
  const Gas = await ethers.getContractFactory("GasPayment");
  const gas = await Gas.deploy(deployer.address);
  await gas.waitForDeployment();
  const gasAddr = await gas.getAddress();
  console.log("GasPayment:", gasAddr);

  // Pool
  const Pool = await ethers.getContractFactory("LiquidityPool");
  const pool = await Pool.deploy(tokenAddr, deployer.address);
  await pool.waitForDeployment();
  const poolAddr = await pool.getAddress();
  console.log("LiquidityPool:", poolAddr);

  // Approve + seed liquidity if desired (optional)
  if (process.env.SEED_LP === "true") {
    const token = await ethers.getContractAt("ERC20", tokenAddr);
    const tokenAmount = ethers.parseUnits(process.env.SEED_TOKEN || "100000", 18);
    const ethAmount = ethers.parseEther(process.env.SEED_ETH || "10");
    await token.approve(poolAddr, tokenAmount);
    await (await pool.addLiquidity(tokenAmount, { value: ethAmount })).wait();
    console.log("Seeded LP with", tokenAmount.toString(), "tokens and", ethAmount.toString(), "wei");
  }

  console.log("Deployed:", { factory: factoryAddr, token: tokenAddr, perk: perkAddr, gas: gasAddr, pool: poolAddr });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


