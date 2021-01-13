const Bank = artifacts.require("Bank");

module.exports = function(_deployer) {
  _deployer.deploy(Bank);
};
