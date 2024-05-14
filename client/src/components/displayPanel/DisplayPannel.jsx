import EarnedReward from "./EarnedReward"
import RewardRate from "./RewardRate"
import StakedAmount from "./StakedAmount"
import { SimpleGrid, Container } from "@chakra-ui/react"


const DisplayPannel = () => {
  return (
    <Container minW={'900px'} mt={'40px'}>
    <SimpleGrid columns={[2, null, 3]} spacing='40px'>
     <StakedAmount/>
      <RewardRate/>
      <EarnedReward/>
    </SimpleGrid>
      
    </Container>
  )
}

export default DisplayPannel