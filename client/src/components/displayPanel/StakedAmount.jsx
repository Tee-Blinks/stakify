import { useState, useEffect, useContext } from "react";
import Web3Context from "../../context/Web3Context";
import { ethers } from "ethers";
import StakingContext from "../../context/StakingContext";
import { Card, Heading, Text } from "@chakra-ui/react";

const StakedAmount = () => {
  const { stakingContract, selectedAccount } = useContext(Web3Context);
  const { isReload } = useContext(StakingContext);

  const [stakedAmount, setStakedAmount] = useState("0");

  useEffect(() => {
    const fetchStakedBalance = async () => {
      try {
        const amountStakedWei = await stakingContract.stakedBalance(
          selectedAccount
        );
        const amountStakedEth = ethers.formatUnits(
          amountStakedWei.toString(),
          18
        );
        //     console.log(amountStakedEth)
        setStakedAmount(amountStakedEth);

        //     console.log(amountStaked)
      } catch (error) {
        console.error("Error Fetching data:", error.message);
      }
    };

    stakingContract && fetchStakedBalance();
  }, [stakingContract, selectedAccount, isReload]);

  return (
    <Card padding={5}>
      <Heading> Staked Amount: </Heading>
      <Text padding={2}>{stakedAmount} </Text>
    </Card>
  );
};

export default StakedAmount;
