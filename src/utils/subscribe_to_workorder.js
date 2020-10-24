const Pino = require("pino");
const pino = Pino(
  {
    name: "subcribe2wo-logger",
    level: process.env.LOG_LEVEL || "info",
  },
  Pino.destination({ sync: false })
);

const {
  parse_workorder_log,
  event_wo_submitted,
  event_wo_completed,
  event_calledback,
} = require("./parse_workorder_log");

const filter_wor_submitted = {
  topics: [event_wo_submitted],
};

const filter_wor_completed = {
  topics: [event_wo_completed],
};

const filter_calledback = {
  topics: [event_calledback],
};

const { mark_workorder } = require("./mark_workorder");
const {
  callback_workorder_response,
} = require("./callback_workorder_response");

module.exports.subscribe_to_workorder = function ({ provider, wallet, wo_db }) {
  // WOR submitted
  provider.on(filter_wor_submitted, (log) => {
    const args = parse_workorder_log(log).args;

    pino.trace({ log, args }, "filter_wor_submitted");

    const obj = {
      txHash: log.transactionHash,
      workOrderRegistryAddress: log.address,
      workOrderId: args.workOrderId,
      workerId: args.workerId,
      requesterId: args.requesterId,
      workOrderRequest: args.workOrderRequest,
      errorCode: args.errorCode,
      senderAddress: args.senderAddress,
      version: args.version,
    };

    pino.trace({ obj }, "filter_wor_submitted");

    mark_workorder(provider, obj, wo_db, wallet);
  });

  // WOR completed
  provider.on(filter_wor_completed, (log) => {
    const args = parse_workorder_log(log).args;

    pino.trace({ log, args }, "filter_wor_completed");

    const obj = {
      txHash: log.transactionHash,
      workOrderRegistryAddress: log.address,
      requesterId: args.requesterId,
      workOrderId: args.workOrderId,
      workOrderStatus: args.workOrderStatus,
      workOrderResponse: args.workOrderResponse,
      errorCode: args.errorCode,
      version: args.version,
    };

    pino.trace({ obj }, "filter_wor_completed");

    callback_workorder_response(provider, obj, wo_db, wallet);
  });

  // Calledback
  provider.on(filter_calledback, (log) => {
    const args = parse_workorder_log(log).args;

    pino.trace({ log, args }, "filter_calledback");

    const obj = {
      txHash: log.transactionHash,
      calledbackAddress: log.address,
      requesterId: args.requesterId,
      workOrderId: args.workOrderId,
      workOrderResponse: args.workOrderResponse,
      workerId: args.workerId,
    };

    pino.trace({ obj }, "filter_calledback");
  });
};
