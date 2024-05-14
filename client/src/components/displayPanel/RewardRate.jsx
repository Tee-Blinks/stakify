import { useState, useContext , useEffect} from "react"
import Web3Context from "../../context/Web3Context"
import {ethers} from 'ethers'
import { Card, Heading, Text } from "@chakra-ui/react";


const RewardRate = () => {
  const {stakingContract, selectedAccount} = useContext(Web3Context)

  const [rewardRate, setRewardRate] = useState("0")

  useEffect(() => {
    const fetchRewardRate = async () => {
          try {
              const rewardRateWei = await stakingContract.REWARD_RATE ()
              
              //  console.log(rewardRateI)
           const rewardRateEth = ethers.formatUnits(rewardRateWei.toString(),18)
          //     console.log(amountStakedEth)
          setRewardRate(rewardRateEth)

          //     console.log(amountStaked)
          } catch (error) {
                console.error("Error Fetching data:", error.message)
          }
    }

    stakingContract && fetchRewardRate()
}, [stakingContract,selectedAccount])

return(
 
    <Card padding={5}>
      <Heading fontSize={20}>Reward Rate: </Heading>
      <Text padding={2}>{rewardRate} </Text>
    </Card>
  
)


}

export default RewardRate