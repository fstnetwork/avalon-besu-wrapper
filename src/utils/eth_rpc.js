const Pino = require("pino");
const pino = Pino(
  {
    name: "rpc-logger",
    level: process.env.LOG_LEVEL || "info",
  },
  Pino.destination({ sync: false })
);

const Ethers = require("ethers");

module.exports.init_eth_rpc = async function (ETH_PRIVATE_KEY, ETH_RPC_URL) {
  pino.info({ ETH_PRIVATE_KEY, ETH_RPC_URL }, "ENV");

  const provider = new Ethers.ethers.providers.JsonRpcProvider(ETH_RPC_URL);
  const wallet = new Ethers.Wallet(ETH_PRIVATE_KEY, provider);

  const balance = await wallet.getBalance();
  pino.trace({
    address: wallet.address,
    balance: balance.div("1000000000000000000").toString(),
  });

  if (balance.lt("100000000000000000")) {
    pino.fatal(
      {
        address: wallet.address,
        balance: balance.div("1000000000000000000").toString(),
      },
      "insufficient funds for gas (0.1 ETH)"
    );
  }

  return {
    provider,
    wallet,
  };
};
