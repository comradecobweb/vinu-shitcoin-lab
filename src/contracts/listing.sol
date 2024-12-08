// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Listing {
    IERC20 public token;
    uint256 public price;
    uint256 public minimalAmount;
    address public owner;
    bool public isPaused;

    event Purchased(address buyer, uint256 amount, uint256 price);
    event TokenWithdrew(uint256 amount);
    event ETHWithdrew(uint256 amount);
    event MissedTokenWithdrew(address token, uint256 amount);
    event Deposited(uint256 amount);
    event Paused();
    event Unpaused();
    event ChangedPrice(uint256 newPrice);
    event ChangedMinimalAmount(uint256 newMinimalAmount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function!");
        _;
    }

    modifier onlyUnpaused() {
        require(
            !isPaused,
            "You cannot call this function, because buying is paused!"
        );
        _;
    }

    modifier onlyPaused() {
        require(
            isPaused,
            "You cannot call this function, because buying is unpaused!"
        );
        _;
    }

    constructor(address _token, uint256 _price) {
        require(0 < _price, "Price cannot be 0!");
        owner = msg.sender;
        token = IERC20(_token);
        price = _price;
        minimalAmount = 0;
        isPaused = false;

        emit ChangedPrice(price);
        emit ChangedMinimalAmount(minimalAmount);
        emit Unpaused();
    }

    receive() external payable {
        purchase();
    }

    fallback() external payable {
        purchase();
    }

    function getTokenBalance() public view returns (uint256) {
        return token.balanceOf(address(this));
    }

    function getETHBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function pause() public onlyOwner onlyUnpaused {
        isPaused = true;
        emit Paused();
    }

    function unpause() public onlyOwner onlyPaused {
        isPaused = false;
        emit Unpaused();
    }

    function purchase() public payable onlyUnpaused {
        require(0 < msg.value, "You cannot get tokens for free!");

        uint256 amount = msg.value / price;

        require(minimalAmount <= amount, "You can't buy that few tokens!");

        require(amount <= token.balanceOf(address(this)), "Not enough tokens!");

        require(msg.value % price == 0, "Incorrect amount of ETH!");

        token.transfer(msg.sender, amount);
        emit Purchased(msg.sender, amount, price);
    }

    function purchase(uint256 amount) public payable onlyUnpaused {
        require(0 < msg.value, "You cannot get tokens for free!");

        require(minimalAmount <= amount, "You can't buy that few tokens!");

        require(amount <= token.balanceOf(address(this)), "Not enough tokens!");

        require(msg.value % price == 0, "Incorrect amount of ETH!");

        require(amount == msg.value / price, "Amount and ETH don't match!");

        token.transfer(msg.sender, amount);
        emit Purchased(msg.sender, amount, price);
    }

    function changePrice(uint256 _price) public onlyOwner {
        require(0 < _price, "Price cannot be 0!");
        price = _price;
        emit ChangedPrice(price);
    }

    function setMinimalAmount(uint256 value) public onlyOwner {
        minimalAmount = value;
        emit ChangedMinimalAmount(value);
    }

    function deposit(uint256 value) public payable onlyOwner {
        require(
            value <= token.allowance(msg.sender, address(this)),
            "Before you call this function, you must approve this smart contract to spend your tokens!"
        );
        require(0 < value, "You cannot deposit 0 tokens!");
        token.transferFrom(msg.sender, address(this), value);
        emit Deposited(value);
    }

    function withdrawETH() public payable onlyOwner {
        uint256 value = getETHBalance();
        require(0 < value, "You cannot withdraw 0 ETH!");
        payable(msg.sender).transfer(value);
        emit ETHWithdrew(value);
    }

    function withdrawETH(uint256 value) public payable onlyOwner {
        require(
            value <= getETHBalance(),
            "The contract does not have enough ETH!"
        );
        require(0 < value, "You cannot withdraw 0 ETH!");
        payable(msg.sender).transfer(value);
        emit ETHWithdrew(value);
    }

    function withdrawTokens() public onlyOwner {
        uint256 value = token.balanceOf(address(this));
        require(0 < value, "You have no tokens!");
        token.transfer(msg.sender, value);
        emit TokenWithdrew(value);
    }

    function withdrawTokens(uint256 value) public onlyOwner {
        require(
            value <= token.balanceOf(address(this)),
            "Insufficient token balance!"
        );
        token.transfer(msg.sender, value);
        emit TokenWithdrew(value);
    }

    function withdrawMissedTokens(address missed, uint256 value)
        public
        onlyOwner
    {
        require(
            value <= IERC20(missed).balanceOf(address(this)),
            "Insufficient token balance!"
        );
        IERC20(missed).transfer(msg.sender, value);
        emit MissedTokenWithdrew(missed, value);
    }

    function withdrawMissedTokens(address missed) public onlyOwner {
        uint256 value = IERC20(missed).balanceOf(address(this));
        require(0 < value, "You have no tokens!");
        IERC20(missed).transfer(msg.sender, value);
        emit MissedTokenWithdrew(missed, value);
    }
}