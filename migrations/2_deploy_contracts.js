const fs = require("fs");
const path = require("path");
const Storage = artifacts.require("Storage");

module.exports = function (deployer) {
  deployer.deploy(Storage).then(() => {
    const configPath = path.join(__dirname, "..", "frontend", "src", "service", "network.json");
    const config = {
      storageAddress: Storage.address,
    };
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
  });
};
