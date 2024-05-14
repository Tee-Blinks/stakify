
import './App.css'
import Wallet from './components/wallet/Wallet'
import Navigation from './components/navigation/Navigation'
import DisplayPannel from './components/displayPanel/DisplayPannel'
import TokenApproval from './components/stakeToken/TokenApproval'
import StakeAmount from './components/stakeToken/StakeAmount'
import Withdraw from './components/withdraw/Withdraw'
import ClaimReward from './components/claimReward/ClaimReward'
import { StakingProvider } from './context/StakingContext'
import { Container, Flex } from '@chakra-ui/react'


function App() {
  return (
    <>
      <Wallet>
        <Navigation/>
        <StakingProvider>
          <DisplayPannel/>
          <Container minW={'900px'} mt={14}>
            <Flex direction={'row'} justifyContent={'space-between'} >
              <Flex direction={'column'} gap={4}>
              <StakeAmount/>
              <Withdraw/>
              </Flex>
              <TokenApproval/>
            </Flex>
          </Container>
           
        </StakingProvider>
       
        <Container minW={'900px'} mt={14}>
        <Flex>
          <ClaimReward/>
        </Flex>
          
        </Container>
        
      </Wallet>
    </>
  )
}

export default App
