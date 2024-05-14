const stik = require('hardhat');

async function stook() {
    const Staking = await stik.ethers.getContractFactory("Staking");
    const staking = await Staking.deploy('0x694636D65C33c05264018F8bDDcB315e8470c0C3', '0xf2ADdD935bB0693608Ca91d173D98213403f8344'); //StakeTokenTokenAddress and Reward token address

    // No need to call deployed()

    console.log("Staking deployed at:", staking.target);
}

stook().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});


//0x8cE09687747d443EA4451D2Ad6dd0d719F822E1A
