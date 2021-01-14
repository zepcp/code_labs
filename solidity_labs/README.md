# Code Labs

Build ethereum smart contracts using [Truffle Suite](https://www.trufflesuite.com/)

An overview on ethereum [here](https://www.trufflesuite.com/tutorials/ethereum-overview)

For small projects one may use the online IDE [Remix](https://remix.ethereum.org/) instead

Requirements
----------
    brew install node
    brew install npm
    npm install -g truffle
    npm install -g ganache-cli
    npm install web3

- Due to an [ongoing bug](https://github.com/trufflesuite/ganache-cli/issues/732) on truffle node version should be <= 12.x.x

Check out of the box solutions [here](https://www.trufflesuite.com/boxes)
----------

    truffle unbox <box name>

Development
----------
Initialize new project

    truffle init

Create new contract

    truffle create contract <name>

Create migration file

    truffle create migration <name>

Create new test file

    truffle create test <name>

Testing Locally
----------
Setup truffle configuration file. [More info](http://truffleframework.com/docs/advanced/configuration)

    vi truffle-config.js

Run local blockchain
    
    ganache-cli

Migrate contracts (compile + deploy)

    truffle migrate

Run tests

    truffle test

- More [truffle commands](https://www.trufflesuite.com/docs/truffle/reference/truffle-commands)
