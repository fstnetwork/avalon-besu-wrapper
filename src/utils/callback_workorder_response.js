const Pino = require("pino");
const pino = Pino(
  {
    name: "callback-logger",
    level: process.env.LOG_LEVEL || "info",
  },
  Pino.destination({ sync: false })
);

const interface = require("./abi_wo").abi_wo;

module.exports.callback_workorder_response = async function (
  provider,
  wo_obj,
  wo_db,
  wallet
) {
  try {
    const db_wo_obj = await wo_db.get(wo_obj.workOrderId);

    if (db_wo_obj === null || db_wo_obj === undefined) {
      throw `workOrder ${wo_obj.workOrderId} is not found in db`;
    }

    const tx_to = db_wo_obj.senderAddress;
    const tx_data = interface.encodeFunctionData(
      "__callback__(bytes32,bytes32,bytes32,string)",
      [
        db_wo_obj.workOrderId,
        db_wo_obj.workerId,
        db_wo_obj.requesterId,
        wo_obj.workOrderResponse,
      ]
    );

    const tx = await wallet.sendTransaction({
      to: tx_to,
      data: tx_data,
    });

    pino.info({ tx }, "callback is fired");

    await wo_db.del(wo_obj.workOrderId);
    pino.info({ workOrderId: wo_obj.workOrderId }, "workOrder removed from db");
  } catch (err) {
    pino.error({ err });
  }
};
