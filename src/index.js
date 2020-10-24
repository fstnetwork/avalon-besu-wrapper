require("dotenv").config();

const ETH_PRIVATE_KEY = process.env.ETH_PRIVATE_KEY || "";
const ETH_RPC_URL = process.env.ETH_RPC_URL || "";

const Pino = require("pino");
const pino = Pino(
  {
    name: "root-logger",
    level: process.env.LOG_LEVEL || "info",
  },
  Pino.destination({ sync: false })
);

const { init_db } = require("./utils/db");
const { init_eth_rpc } = require("./utils/eth_rpc");

const { subscribe_to_workorder } = require("./utils/subscribe_to_workorder");

async function start() {
  const { wo_db } = await init_db();
  const { provider, wallet } = await init_eth_rpc(ETH_PRIVATE_KEY, ETH_RPC_URL);

  pino.info("DB initiated");
  pino.info("ETH RPC initiated");

  subscribe_to_workorder({ provider, wallet, wo_db });

  pino.info("Subscription initiated");
}

start();
