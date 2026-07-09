// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Storage {
    address admin;
    uint64 public idCounter;

    struct Bunny {
        uint64 id;
        string name;
        uint64 birthday;
        bool hasLopEars;
        string color;
        uint64 fatherId;
        uint64 motherId;
        address ownerId;
    }

    struct User {
        string username;
        bool isVeterinarian;
    }

    struct Disease {
        string name;
        uint64 date;
        address veterinarian;
    }

    uint64[] public bunniesIds;

    mapping(string => address[]) usernamesAddresses;
    mapping(address => User) users;
    mapping(uint64 => Bunny) bunnies;
    mapping(uint64 => Disease[]) bunnyDiseases;

    constructor() {
        admin = msg.sender;
        idCounter = 0;
        bunniesIds = new uint64[](0);
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    modifier onlyVeterinarian() {
        require(
            users[msg.sender].isVeterinarian,
            "Only veterinarians can register new bunnies"
        );
        _;
    }

    modifier onlyOwner(uint64 id) {
        require(
            bunnies[id].ownerId == msg.sender,
            "Only the owner can transfer a bunny"
        );
        _;
    }

    modifier onlyRegistered() {
        require(
            keccak256(bytes(users[msg.sender].username)) !=
                keccak256(bytes("")),
            "User not registered"
        );
        _;
    }

    function isAdmin() public view returns (bool) {
        return msg.sender == admin;
    }

    function registerUsername(string memory username) public {
        require(bytes(username).length > 0, "Empty access code");
        usernamesAddresses[username].push(msg.sender);
        users[msg.sender] = User(username, false);
    }

    function getUsername() public view returns (string memory) {
        return users[msg.sender].username;
    }

    function getUsersAddressesByUsername(
        string memory username
    ) public view returns (address[] memory) {
        return usernamesAddresses[username];
    }

    function registerVeterinarian(address user) public onlyAdmin {
        users[user].isVeterinarian = true;
    }

    function unregisterVeterinarian(address user) public onlyAdmin {
        users[user].isVeterinarian = false;
    }

    function isVeterinarian() public view returns (bool) {
        return users[msg.sender].isVeterinarian;
    }

    function registerBunny(
        Bunny memory bunny
    ) public onlyVeterinarian onlyRegistered {
        bunny.id = idCounter;
        bunnies[idCounter] = bunny;
        bunniesIds.push(idCounter);
        idCounter++;
    }

    function getUserBunnies() public view returns (Bunny[] memory) {
        // This is not efficient, so improvements are needed
        uint64 count = 0;
        for (uint64 i = 0; i < bunniesIds.length; i++) {
            if (bunnies[i].ownerId == msg.sender) {
                count++;
            }
        }

        Bunny[] memory result = new Bunny[](count);
        uint64 index = 0;
        for (uint64 i = 0; i < bunniesIds.length; i++) {
            if (bunnies[i].ownerId == msg.sender) {
                result[index] = bunnies[i];
                index++;
            }
        }

        return result;
    }

    function registerDisease(
        uint64 bunnyId,
        string memory diseaseName
    ) public onlyVeterinarian onlyRegistered {
        Disease memory disease;
        disease.name = diseaseName;
        disease.date = uint64(block.timestamp);
        disease.veterinarian = msg.sender;

        bunnyDiseases[bunnyId].push(disease);
    }

    function getDiseases(
        uint64 bunnyId
    ) public view returns (Disease[] memory) {
        return bunnyDiseases[bunnyId];
    }

    function transferBunny(
        uint64 id,
        address newOwnerId
    ) public onlyOwner(id) onlyRegistered {
        bunnies[id].ownerId = newOwnerId;
    }
}
