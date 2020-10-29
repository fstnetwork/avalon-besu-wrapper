# avalon-besu-wrapper

## Environment Values Example

```sh
ETH_PRIVATE_KEY=0xbaa0904920d95b7c2e36beb216b1c9c3fd8efcdcdb05c036f7834215afb01c17
ETH_RPC_URL=http://127.0.0.1:8545
LOG_LEVEL=info
```

> `ETH_PRIVATE_KEY` should be from the account wallet which is not frequently used by avalon besu blockchain connector, in order to avoid tx-nonce-racing

> **PLEASE MAKE SURE THE ACCOUNT WALLET HAS SUFFICIENT ETHER FOR GAS** (> 0.1 ETH is recommended)

## Build Docker image for K8s

```sh
yarn build
```

> If no yarn installed, please run `npm i -g yarn`

## Development with Smart Contract

### Architecture

- Customised contract
  - A smart contract which will invoke the function **`workOrderSubmit`** in the Workorder Registry
- Workorder Registry
  - The smart contract provided by Avalon, which receives workorder requests and notifies the blockchain with the workorder status after the workorder is completed by offchain workloads
  - Please refer to `./src/contracts/WOR.sol`, the default smart contract used by avalon besu blockchain connector

### Code example

> Please also refer to `./src/contracts/Sample.sol`

```solidity
// this event must be implemented in customised contract
event calledback (
    bytes32 indexed workOrderId,
    bytes32 indexed workerId,
    bytes32 indexed requesterId,
    string workOrderResponse
);

// this function must be implemented in customised contract for callback
// (the result of workorder will be filled into this function after the workorder is completed)
function __callback__ (
    bytes32 workOrderId,
    bytes32 workerId,
    bytes32 requesterId,
    string memory workOrderResponse
) public {
    //
    // process the workOrderResponse
    //

    emit calledback(workOrderId, workerId, requesterId, workOrderResponse);
}
```
