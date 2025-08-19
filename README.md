> ⚠️ Archived: This repository is an earlier experiment.
> Please see the finalized case study here: https://github.com/laleh-nour/ens-poc-test

# ENS ETHRegistrarController PoC

## 🧩 Overview
Proof-of-concept demonstrating a missing access control in the `withdraw()` function of the ETHRegistrarController contract (address: `0x253553366Da8546fC250F225fe3d25d0C782303b`).

## ⚙️ Environment & Setup
- Node.js (v20.x) and npm
- Hardhat local network
- Test executed using sample Hardhat project in this repository

```bash
npm install
npx hardhat node
```

In another terminal window:

```bash
npx hardhat run scripts/poc-withdraw.js --network localhost
```

## 🎯 Expected Output
```text
✅ Potentially vulnerable! TX Hash: 0x1d4e2a694fb3e1de58e9a83516c0c2e6f20a090739034e128fdcb7c08c5888ef
```

## 📂 Evidence
Terminal screenshots and logs are located in the `screen/` directory.

## 📥 ABI
This PoC uses the ABI from the `ETHRegistrarController` contract, captured from the verified contract on Etherscan and saved in `abi/ETHRegistrarController.json`.

## 💡 Recommended Fix
Restrict access to `withdraw()` by adding `onlyOwner` or other appropriate access control.

---

### 🔗 References
- Official contract source: [Ens GitHub Contracts](https://github.com/ensdomains/ens-contracts)
- Contract on Etherscan: [0x253553366Da8546fC250F225fe3d25d0C782303b](https://etherscan.io/address/0x253553366Da8546fC250F225fe3d25d0C782303b)

