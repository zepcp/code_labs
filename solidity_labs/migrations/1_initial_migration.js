const Migrations = artifacts.require("Migrations");

module.exports = function (_deployer) {
  _deployer.deploy(Migrations);
};
