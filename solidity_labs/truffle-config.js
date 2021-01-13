// http://truffleframework.com/docs/advanced/configuration
module.exports = {
  compilers: {
      solc: {
          version: "^0.8.0", // A version or constraint - Ex. "^0.5.0"
          //docker: <boolean>, // Use a version obtained through docker
          parser: "solcjs",  // Leverages solc-js purely for speedy parsing
          settings: {
              optimizer: {
                  enabled: true,
                  runs: 1   // Optimize for how many times you intend to run the code
              },
              //evmVersion: <version> // Default: "petersburg"
          }
      }
  },
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*"
    },
    test: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*"
    }
  }
};
