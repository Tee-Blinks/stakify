import { useState, useContext, useEffect } from "react";
import Web3Context from "../../context/Web3Context";
import { ethers } from "ethers";
import { Card, Heading, Text } from "@chakra-ui/react";

const EarnedReward = () => {
  const { stakingContract, selectedAccount } = useContext(Web3Context);

  const [rewardVal, setRewardVal] = useState("0");

  useEffect(() => {
    const fetchStakeRewardInfo = async () => {
      try {
        const rewardValueWei = await stakingContract.earned(selectedAccount);

        //  console.log(rewardRateI)
        const rewardValueEth = ethers.formatUnits(
          rewardValueWei.toString(),
          18
        );
        const roundedReward = parseFloat(rewardValueEth).toFixed(2);
        //     console.log(amountStakedEth)
        // console.log(roundedReward)
        setRewardVal(roundedReward);

        //     console.log(amountStaked)
      } catch (error) {
        console.error("Error Fetching data:", error.message);
      }
    };
    const interval = setInterval(() => {
      console.log("hi");
      stakingContract && fetchStakeRewardInfo();
    }, 20000);
    return () => clearInterval(interval);
  }, [stakingContract, selectedAccount]);

  return (
    <Card padding={5}>
      <Heading>Earned Reward:</Heading>
      <Text padding={2}>{rewardVal}</Text>
    </Card>
  );
};

export default EarnedReward;
