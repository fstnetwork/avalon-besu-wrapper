const path = require("path");

const Pino = require("pino");
const pino = Pino(
  {
    name: "db-logger",
    level: process.env.LOG_LEVEL || "info",
  },
  Pino.destination({ sync: false })
);

const level = require("level");

module.exports.init_db = async function () {
  return new Promise((res, rej) => {
    level(
      path.resolve(__dirname, "..", "..", "level_db", "wo_db"),
      { valueEncoding: "json" },
      (err, wo_db) => {
        if (err) {
          pino.error({ err }, "level db error");
          return rej(err);
        }

        res({
          wo_db,
        });
      }
    );
  });
};
