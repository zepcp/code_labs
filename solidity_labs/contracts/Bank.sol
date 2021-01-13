//SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

//The aim of decentralized_bank contract is to provide your wallet the ultimate backup in case of non-activity for a period of time.
contract Bank {

	//Event writes on log file to enable alert to listeners
	event willExecuted(address account);
	event accountCreated(address account, uint nbDays, address heir);

	struct account {
      address payable heir;
      uint lastAction;
      uint nbDays;
    }

	//Mapping is a dictionary, relating (A => B)
	mapping (address => account) addressToAccount;
	mapping (address => uint) balanceOf;

	constructor() {
    }

	function deposit (uint _days, address payable _heir) public payable {
		addressToAccount[msg.sender].lastAction = block.timestamp;
		balanceOf[msg.sender] = balanceOf[msg.sender] + msg.value;
		if (_days > 0) {
			addressToAccount[msg.sender].nbDays = _days * 1 days;
			addressToAccount[msg.sender].heir = _heir;
		}
		//Call Event to inform Listeners of the creation/update of the savings account
		emit accountCreated(msg.sender, _days, _heir);
	}

	//Only owner of the contract can withdraw funds to any address he desires;
	function transfer (uint _amount, address payable _withdraw) public {
		addressToAccount[msg.sender].lastAction = block.timestamp;
		require(balanceOf[msg.sender] >= _amount);
		balanceOf[msg.sender] = balanceOf[msg.sender] - _amount;
		_withdraw.transfer(_amount);
	}

	function checkAccount (address _account) external view returns(uint, uint, address) {
		uint _remainingDays = block.timestamp - addressToAccount[_account].lastAction;
		if (_remainingDays < addressToAccount[_account].nbDays) {
			_remainingDays = (addressToAccount[_account].nbDays - _remainingDays) / (1 days);
		} else {
			_remainingDays = 0;
		}
		return (balanceOf[_account], _remainingDays, addressToAccount[_account].heir);
	}

	//Any person can reclaim the execution of the will if time has passed
	function executeWill (address _account) public {
		require(block.timestamp >= addressToAccount[_account].lastAction + addressToAccount[_account].nbDays);
		uint _amount = balanceOf[_account];
		balanceOf[_account] = 0;
		addressToAccount[_account].heir.transfer(_amount);
		//Call Event to inform Listeners of the Will Execution
		emit willExecuted(_account);
	}

}
