const hre = require('hardhat');

async function main() {
    const StakeToken = await hre.ethers.getContractFactory("StakeToken");
    const stakeToken = await StakeToken.deploy(1000);
    // No need to call deployed()

    console.log("StakeToken deployed at:", stakeToken.target);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});


//0x694636D65C33c05264018F8bDDcB315e8470c0C3
