const Bank = artifacts.require("Bank");
const helper = require("./helpers/truffleTestHelper");
const Web3 = require('web3')
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545")) // Hardcoded development port

var lastAction = 365;
var heir = web3.eth.accounts.create().address;
var amount = 10;
var send = 2;
var startBalance = 0;

contract("Bank", function(accounts) {

  it("Take1 - Deposit", async function() {
    //Create Account / 1st Deposit
    let MyBank = await Bank.deployed();
    await MyBank.deposit(lastAction, heir, {value:amount});
    user_balance = await MyBank.checkAccount(accounts[0]);
    heir_balance = await web3.eth.getBalance(heir);

    assert.equal(await amount, user_balance[0], "KO - User Balance");
    assert.equal(await startBalance, heir_balance, "KO - Heir Balance");
    console.log("Take1 - Deposit from " + accounts[0]);
  });

  it("Take2 - Transfer", async function() {
    //Transfer Funds
    let MyBank = await Bank.deployed();
    await MyBank.transfer(send, heir);
    user_balance = await MyBank.checkAccount(accounts[0]);
    heir_balance = await web3.eth.getBalance(heir);

    assert.equal(await amount - send, user_balance[0], "KO - User Balance");
    assert.equal(await startBalance + send, heir_balance, "KO - Heir Balance");
    console.log("Take2 - Transfer to " + heir);
  });

  it("Take3 - Try Execute Will", async function() {
    //Execute Will
    let MyBank = await Bank.deployed();
    try {
      await MyBank.executeWill(accounts[0]);
    } catch (KO) {
      console.log("Tried to Exec Will -> NOT YET");
    }
    user_balance = await MyBank.checkAccount(accounts[0]);
    heir_balance = await web3.eth.getBalance(heir);

    assert.equal(await amount - send, user_balance[0], "KO - User Balance");
    assert.equal(await startBalance + send, heir_balance, "KO - Heir Balance");
    console.log("Take3 - Try Execute Will from " + accounts[0]);
  });

  it("Take4 - Deposit", async function() {
    //2nd Deposit
    let MyBank = await Bank.deployed();
    await MyBank.deposit(0, heir, {value:amount});
    user_balance = await MyBank.checkAccount(accounts[0]);
    heir_balance = await web3.eth.getBalance(heir);

    assert.equal(await amount * 2 - send, user_balance[0], "KO - User Balance");
    assert.equal(await startBalance + send, heir_balance, "KO - Heir Balance");
    console.log("Take4 - Deposit from " + accounts[0]);
  });

  it("Take5 - Deposit", async function() {
    //3rd Deposit / Update Account
    let MyBank = await Bank.deployed();
    await MyBank.deposit(20, heir, {value:amount});
    user_balance = await MyBank.checkAccount(accounts[0]);
    heir_balance = await web3.eth.getBalance(heir);

    assert.equal(await amount * 3 - send, user_balance[0], "KO - User Balance");
    assert.equal(await startBalance + send, heir_balance, "KO - Heir Balance");
    console.log("Take5 - Deposit from " + accounts[0]);
    user_balance = await MyBank.checkAccount(accounts[0]);
  });

  it("Take6 - Execute Will After timeTravel", async function() {
    //Execute Will
    let MyBank = await Bank.deployed();

    await helper.advanceTimeAndBlock(86400 * 30); //30 days later
    //await helper.advanceBlock();

    try {
      await MyBank.executeWill(accounts[0]);
    } catch (KO) {
      console.log("Tried to Exec Will -> KO");
    }
    user_balance = await MyBank.checkAccount(accounts[0]);
    heir_balance = await web3.eth.getBalance(heir);

    assert.equal(await 0, user_balance[0], "KO - User Balance");
    assert.equal(await startBalance + amount * 3, heir_balance, "KO - Heir Balance");
    console.log("Take6 - Execute Will After timeTravel to " + heir);
  });

});
