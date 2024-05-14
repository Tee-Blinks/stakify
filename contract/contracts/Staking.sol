// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract Staking is ReentrancyGuard{
  IERC20 public s_stakingToken;
  IERC20 public s_rewardToken;

  uint public constant REWARD_RATE=1e18; // uint public constant REWARD_RATE=10;
  uint private totalStakedTokens;
  uint public rewardPerTokenStored;
  uint public lastUpdateTime;

  mapping(address=>uint) public stakedBalance;
  mapping(address=>uint) public rewards;
  mapping(address=>uint) public userRewardPerTokenPaid;

  event Staked(address indexed user, uint256 indexed amount);
  event Withdrawn(address indexed user, uint256 indexed amount);
  event RewardsClaimed(address indexed user, uint256 indexed amount);
  
  constructor(address stakingToken,address rewardToken){
    s_stakingToken=IERC20(stakingToken);
    s_rewardToken=IERC20(rewardToken);
  }

  function rewardPerToken() public view returns(uint){
    if(totalStakedTokens==0){
        return rewardPerTokenStored;
    }
    uint totalTime = block.timestamp - lastUpdateTime;
    uint totalRewards = REWARD_RATE * totalTime; 
    return rewardPerTokenStored + totalRewards / totalStakedTokens;
  }

  function earned(address account) public view returns(uint){
    return stakedBalance[account] * (rewardPerToken() - userRewardPerTokenPaid[account]) + rewards[account];
  }

  modifier updateReward(address account){
    rewardPerTokenStored=rewardPerToken();
    lastUpdateTime=block.timestamp;
    rewards[account]=earned(account);
    userRewardPerTokenPaid[account]=rewardPerTokenStored;
    _;
  }

  function stake(uint amount) external nonReentrant updateReward(msg.sender){
    require(amount>0,"Amount must be greater than zero");
    totalStakedTokens+=amount;
    stakedBalance[msg.sender]+=amount;
    emit Staked(msg.sender,amount);
    bool success = s_stakingToken.transferFrom(msg.sender,address(this),amount);
    require(success,"Transfer Failed");
  }


    function withdraw(uint amount) external nonReentrant updateReward(msg.sender) {
        require(amount> 0, "Amount must be greater than zero");
        totalStakedTokens-=amount;
        stakedBalance[msg.sender]-=amount;
        emit Withdrawn(msg.sender, amount);

        bool success = s_stakingToken.transfer(msg.sender, amount);
        require(success, "Transfer Failed");
    }

   function getReward() external nonReentrant updateReward(msg.sender){
     uint reward = rewards[msg.sender];
     require(reward>0,"No rewards to claim");
     rewards[msg.sender]=0;
     emit RewardsClaimed(msg.sender, reward);
     bool success = s_rewardToken.transfer(msg.sender,reward);
     require(success,"Transfer Failed");
  }
}
