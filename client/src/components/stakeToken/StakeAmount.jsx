import { useRef, useContext } from "react"
import { ethers } from "ethers"
import Web3Context from "../../context/Web3Context"
import WebButton from "../button/Button"
import StakingContext from "../../context/StakingContext"
import { Card, Input, FormControl, FormLabel } from "@chakra-ui/react";
import toast from "react-hot-toast"


const StakeAmount = () => {
    const {stakingContract} = useContext(Web3Context)
    const {isReload, setIsReload} = useContext(StakingContext)
    const stakeAmountRef = useRef();
    // const [transactionStatus, setTransactionStatus] = useState('')
    const stakeToken = async (e) => {
        e.preventDefault();
        const amount = stakeAmountRef.current.value.trim();
        if(isNaN(amount) || amount <= 0){
            toast.error("Please enter a valid positive number")
            return;
        }

        const amountToStake = ethers.parseUnits(amount,18).toString();
        // console.log(amountToSend)
        try {
            const transaction = await stakingContract.stake(amountToStake)
            // console.log(transaction)
            await toast.promise(transaction.wait(), {
                loading: "Transaction is pending...",
                success: "Transaction Successful",
                error: "Transaction failed",
            })
            
            // setTransactionStatus('Transaction is in pending...')
            stakeAmountRef.current.value =''
            setIsReload(!isReload)
            
            // const receipt = await transaction.wait();
            // if(receipt.status === 1){
            //     setTransactionStatus('Transaction is succesful');
            //     setIsReload(!isReload)
            //     setTimeout(() => {
            //         setTransactionStatus("")
            //     },5000)
            //     stakeAmountRef.current.value = ''
            // }else{
            //     setTransactionStatus('Transaction failed')
            // }

        } catch (error) {
            console.error("Staking  failed", error.message)
        }
    }
    return (
        <Card padding={5}>
            <FormControl onSubmit={stakeToken} display={'flex'} flexDirection={'column'}>
                <FormLabel >Amount to stake</FormLabel>
                <Input mb={4} type="text" ref={stakeAmountRef}></Input>
                <WebButton onClick={stakeToken} type='submit' label='Stake'/>
    

            </FormControl>
            
        </Card>
      )
}

export default StakeAmount