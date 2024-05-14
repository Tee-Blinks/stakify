const rew = require('hardhat');

async function rewad() {
    const RewardToken = await rew.ethers.getContractFactory("RewardToken");
    const rewardToken = await RewardToken.deploy(10000000);
    // No need to call deployed()

    console.log("RewardToken deployed at:", rewardToken.target);
}

rewad().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

// 0xf2ADdD935bB0693608Ca91d173D98213403f8344


