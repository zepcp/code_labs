const Heritage = artifacts.require("Heritage");
const helper = require("./helpers/truffleTestHelper");
const Web3 = require('web3')
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545")) // Hardcoded development port

var lastAction = 365;
var heir = web3.eth.accounts.create().address;
var amount = 10;
var send = 2;
var startBalance = 0;

contract("Heritage", function(accounts) {

  it("Take1 - 1st deposit", async function() {
    let MyHeritage = await Heritage.deployed();
    await MyHeritage.deposit(lastAction, heir, {value:amount});
    user_balance = await MyHeritage.status(accounts[0]);
    heir_balance = await web3.eth.getBalance(heir);

    assert.equal(await amount, user_balance[0], "KO - User Balance");
    assert.equal(await startBalance, heir_balance, "KO - Heir Balance");
    console.log("Take1 - 1st deposit from " + accounts[0]);
  });

  it("Take2 - withdraw", async function() {
    let MyHeritage = await Heritage.deployed();
    await MyHeritage.withdraw(send, heir);
    user_balance = await MyHeritage.status(accounts[0]);
    heir_balance = await web3.eth.getBalance(heir);

    assert.equal(await amount - send, user_balance[0], "KO - User Balance");
    assert.equal(await startBalance + send, heir_balance, "KO - Heir Balance");
    console.log("Take2 - withdraw to " + heir);
  });

  it("Take3 - claim before timeTravel", async function() {
    let MyHeritage = await Heritage.deployed();
    try {
      await MyHeritage.claim(accounts[0]);
    } catch (KO) {
      console.log("Tried to claim -> NOT YET");
    }
    user_balance = await MyHeritage.status(accounts[0]);
    heir_balance = await web3.eth.getBalance(heir);

    assert.equal(await amount - send, user_balance[0], "KO - User Balance");
    assert.equal(await startBalance + send, heir_balance, "KO - Heir Balance");
    console.log("Take3 - claim before timeTravel from " + accounts[0]);
  });

  it("Take4 - 2nd deposit", async function() {
    let MyHeritage = await Heritage.deployed();
    await MyHeritage.deposit(0, heir, {value:amount});
    user_balance = await MyHeritage.status(accounts[0]);
    heir_balance = await web3.eth.getBalance(heir);

    assert.equal(await amount * 2 - send, user_balance[0], "KO - User Balance");
    assert.equal(await startBalance + send, heir_balance, "KO - Heir Balance");
    console.log("Take4 - 2nd deposit from " + accounts[0]);
  });

  it("Take5 - 3rd deposit", async function() {
    let MyHeritage = await Heritage.deployed();
    await MyHeritage.deposit(20, heir, {value:amount});
    user_balance = await MyHeritage.status(accounts[0]);
    heir_balance = await web3.eth.getBalance(heir);

    assert.equal(await amount * 3 - send, user_balance[0], "KO - User Balance");
    assert.equal(await startBalance + send, heir_balance, "KO - Heir Balance");
    console.log("Take5 - 3rd deposit from " + accounts[0]);
    user_balance = await MyHeritage.status(accounts[0]);
  });

  it("Take6 - claim after timeTravel", async function() {
    let MyHeritage = await Heritage.deployed();

    await helper.advanceTimeAndBlock(86400 * 30); //30 days later

    try {
      await MyHeritage.claim(accounts[0]);
    } catch (KO) {
      console.log("Tried to claim deposit -> KO");
    }
    user_balance = await MyHeritage.status(accounts[0]);
    heir_balance = await web3.eth.getBalance(heir);

    assert.equal(await 0, user_balance[0], "KO - User Balance");
    assert.equal(await startBalance + amount * 3, heir_balance, "KO - Heir Balance");
    console.log("Take6 - claim after timeTravel to " + heir);
  });

});
