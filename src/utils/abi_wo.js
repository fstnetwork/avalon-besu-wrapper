const Ethers = require("ethers");

const utils = Ethers.utils;

const ABI = require("../contracts/Sample.json");

module.exports.abi_wo = new utils.Interface(ABI);
