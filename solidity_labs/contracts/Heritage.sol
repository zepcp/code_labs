//SPDX-License-Identifier: MIT

//Solidity compiler
pragma solidity >=0.4.22 <0.9.0;

//Heritage contract aims to provide an ultimate backup to your wallet in case of inactivity
contract Heritage {

    //Events are logs which can be easily subscribed by an listener

    //An user deposited an amount that can be claimed after nDays by its heir in case of inactivity
    event depositMade(
        address user,
        uint amount,
        uint nDays,
        address heir
    );

    //A heir claimed a deposited amount due to inactivity on this account
    event depositClaimed(
        address user,
        uint amount,
        address heir
    );

    //Structures are custom data types that can have complex data structures

    //Account composed by a heir, lastAction timestamp and nDays of inactivity to claim the deposit
    struct account {
        address payable heir;
        uint lastAction;
        uint nDays;
    }

    //Mappings are key-value pairs

    //Any address can be mapped into an account structure
    mapping (address => account) addressToAccount;

    //Any address can be mapped into their balance in the contract
    mapping (address => uint) balanceOf;

    //Constructor only runs once at deployment runtime
    constructor() {
    }

    //Sender deposits the value that can be retrieved in case of _days of inactivity by the _heir
    function deposit (uint _days, address payable _heir) public payable {
        addressToAccount[msg.sender].lastAction = block.timestamp;
        balanceOf[msg.sender] = balanceOf[msg.sender] + msg.value;
        if (_days > 0) {
            addressToAccount[msg.sender].nDays = _days * 1 days;
            addressToAccount[msg.sender].heir = _heir;
        }
        emit depositMade(msg.sender, balanceOf[msg.sender], _days, _heir);
    }

    //Sender can withdraw deposited funds into any desired address
    function withdraw (uint _amount, address payable _withdraw) public {
        addressToAccount[msg.sender].lastAction = block.timestamp;
        require(balanceOf[msg.sender] >= _amount);
        balanceOf[msg.sender] = balanceOf[msg.sender] - _amount;
        _withdraw.transfer(_amount);
    }

    //Anyone may check an user status (deposited amount, remainingDays, heir)
    function status (address _account) external view returns(uint, uint, address) {
        uint _remainingDays = block.timestamp - addressToAccount[_account].lastAction;
        if (_remainingDays < addressToAccount[_account].nDays) {
            _remainingDays = (addressToAccount[_account].nDays - _remainingDays) / (1 days);
        } else {
            _remainingDays = 0;
        }
        return (balanceOf[_account], _remainingDays, addressToAccount[_account].heir);
    }

    //Anyone may claim a deposit to the rightful heir in case of user inactivity for nDays
    function claim (address _account) public {
        require(block.timestamp >= addressToAccount[_account].lastAction + addressToAccount[_account].nDays);
        uint _amount = balanceOf[_account];
        balanceOf[_account] = 0;
        addressToAccount[_account].heir.transfer(_amount);
        emit depositClaimed(_account, _amount, addressToAccount[_account].heir);
    }

}
