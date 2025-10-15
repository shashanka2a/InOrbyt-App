const { ethers } = require("hardhat");

async function main() {
  const factoryAddress = process.env.FACTORY_ADDRESS;
  if (!factoryAddress) throw new Error("FACTORY_ADDRESS env var required");

  const [creator] = await ethers.getSigners();
  console.log("Creator:", creator.address);

  const factory = await ethers.getContractAt("TokenFactory", factoryAddress);
  const tx = await factory.createToken(
    process.env.TOKEN_NAME || "CreatorToken",
    process.env.TOKEN_SYMBOL || "CRT",
    process.env.CREATOR_NAME || "Creator",
    process.env.CREATOR_HANDLE || "@creator",
    process.env.METADATA_URI || "ipfs://metadata",
    ethers.parseUnits(process.env.INITIAL_SUPPLY || "1000000", 18)
  );
  const receipt = await tx.wait();
  const event = receipt.logs.find((l) => l.eventName === "TokenCreated");
  const tokenAddress = event.args.token;
  console.log("Token deployed at:", tokenAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


