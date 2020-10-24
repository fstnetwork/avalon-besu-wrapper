const Pino = require("pino");
const pino = Pino(
  {
    name: "mark-logger",
    level: process.env.LOG_LEVEL || "info",
  },
  Pino.destination({ sync: false })
);

module.exports.mark_workorder = async function (
  provider,
  wo_obj,
  wo_db,
  wallet
) {
  await wo_db.put(wo_obj.workOrderId, wo_obj);
  pino.info({ workOrderId: wo_obj.workOrderId }, "workOrder written to db");
};
