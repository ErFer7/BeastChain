import web3 from './api'
import storageContract from '../../../build/contracts/Storage.json';
import storageAddress from './network.json'

const contractABI = storageContract.abi
const contractAddress = storageAddress.storageAddress
const contract = new web3.eth.Contract(contractABI, contractAddress)
const GAS_PRICE = '20000000000';

let account;

export async function getAccount() {
  if (!account) {
    const accounts = await web3.eth.getAccounts();
    account = accounts[0];
  }
  return account;
}

export async function isAdmin() {
  const result = await contract.methods.isAdmin().call({ from: await getAccount(), gasPrice: GAS_PRICE });
  return result;
}

export async function registerUsername(username) {
  const result = await contract.methods.registerUsername(username).send({ from: await getAccount(), gasPrice: GAS_PRICE });
  return result;
}

export async function getUsername() {
  const result = await contract.methods.getUsername().call({ from: await getAccount(), gasPrice: GAS_PRICE });
  return result;
}

export async function getUsersAddressesByUsername(username) {
  const result = await contract.methods.getUsersAddressesByUsername(username).call({ from: await getAccount(), gasPrice: GAS_PRICE });
  return result;
}

export async function registerVeterinarian(address) {
  const result = await contract.methods.registerVeterinarian(address).send({ from: await getAccount(), gasPrice: GAS_PRICE });
  return result;
}

export async function unregisterVeterinarian(address) {
  const result = await contract.methods.unregisterVeterinarian(address).send({ from: await getAccount(), gasPrice: GAS_PRICE });
  return result;
}

export async function isVeterinarian() {
  const result = await contract.methods.isVeterinarian().call({ from: await getAccount(), gasPrice: GAS_PRICE });
  return result;
}

// The gas limit was increased to 5000000 because the default value was not enough
export async function registerBunny(bunny) {
  const result = await contract.methods.registerBunny(bunny).send({ from: await getAccount(), gas: 5000000, gasPrice: GAS_PRICE });
  return result;
}

export async function getUserBunnies() {
  const result = await contract.methods.getUserBunnies().call({ from: await getAccount(), gasPrice: GAS_PRICE });
  return result;
}

export async function registerDisease(bunnyId, disease) {
  const result = await contract.methods.registerDisease(bunnyId, disease).send({ from: await getAccount(), gas: 5000000, gasPrice: GAS_PRICE });
  return result;
}

export async function getDiseases(bunnyId) {
  const result = await contract.methods.getDiseases(bunnyId).call({ from: await getAccount(), gasPrice: GAS_PRICE });
  return result;
}

export async function transferBunny(bunnyId, newOwnerAddress) {
  const result = await contract.methods.transferBunny(bunnyId, newOwnerAddress).send({ from: await getAccount(), gasPrice: GAS_PRICE });
  return result;
}
