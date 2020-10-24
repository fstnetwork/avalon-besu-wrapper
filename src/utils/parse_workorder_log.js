const interface = require("./abi_wo").abi_wo;

module.exports.events = interface.events;

module.exports.event_wo_submitted = interface.getEventTopic(
  "workOrderSubmitted"
);

module.exports.event_wo_completed = interface.getEventTopic(
  "workOrderCompleted"
);

module.exports.event_calledback = interface.getEventTopic("calledback");

module.exports.parse_workorder_log = function (log) {
  return interface.parseLog(log);
};
