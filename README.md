# BeastChain

## How to run

### Requirements

* [Truffle](https://trufflesuite.com/docs/truffle/how-to/install/)
* [Ganache-cli](https://trufflesuite.com/ganache/)
* [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#debian-stable)

### Backend

1. Compile the contracts with `truffle compile`
2. Start up the cli with `ganache-cli`
3. Deploy the contract with `truffle migrate`
4. (Optional) Interact with the contract with `truffle console`

---

### Frontend

1. Go to `frontend` with `cd frontend`
2. Execute `yarn install`
3. Build the css theme with `npx tailwindcss -i ./src/styles/input.css -o ./dist/output.css --watch`
4. Run the application with `yarn dev`
5. The application will be running on http://localhost:5173/

---
