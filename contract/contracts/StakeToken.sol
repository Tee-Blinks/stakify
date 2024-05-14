// contracts/GLDToken.sol

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract StakeToken is ERC20{
    constructor(uint256 initialSupply) ERC20("StakeToken", "STK"){
        _mint(msg.sender, initialSupply*10**18);
    }

    // function decimals() public  pure override returns(uint8){
    //     return 0;
    // } 
}