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
