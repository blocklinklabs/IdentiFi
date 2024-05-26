// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/vrf/VRFConsumerBase.sol";

interface IBatch {
    function batchAll(
        address[] calldata to,
        uint256[] calldata value,
        bytes[] calldata callData,
        uint64[] calldata gasLimit
    ) external returns (bool success);
}

contract IdentiFi is VRFConsumerBase {
    bytes32 internal keyHash;
    uint256 internal fee;
    mapping(bytes32 => address) public requestIdToSender;
    mapping(address => uint256) public addressToDID;

    IBatch public batch;

    struct User {
        string firstName;
        string lastName;
        string username;
        string email;
        string homeAddress;
        string dateOfBirth;
        string education;
        string workHistory;
        string phoneNumber;
        string jobTitle;
        string x;
        string instagram;
        string tiktok;
        string youtube;
        string linkedin;
        string info;
        string[] skills;
        string imageURL;
        bool exists;
        uint[] appliedJobs; // Array to store applied job IDs
        Visibility visibility;
    }

    struct Visibility {
        bool education;
        bool workHistory;
        bool phoneNumber;
        bool homeAddress;
        bool dateOfBirth;
    }

    struct BasicInfo {
        string firstName;
        string lastName;
        string email;
        string homeAddress;
        string dateOfBirth;
        string phoneNumber;
    }

    struct SocialLinks {
        string x;
        string instagram;
        string tiktok;
        string youtube;
        string linkedin;
    }

    struct ProfessionalInfo {
        string education;
        string workHistory;
        string jobTitle;
        string info;
        string[] skills;
        string imageURL;
    }

    mapping(string => User) private users;
    mapping(address => string) private addressToUsername;
    mapping(string => bool) private usernames; // To check uniqueness of username

    modifier onlyUniqueUsername(string memory username) {
        require(!usernames[username], "Username already exists.");
        _;
    }

    constructor(
        address _vrfCoordinator,
        address _linkToken,
        bytes32 _keyHash,
        uint256 _fee,
        address _batch
    ) VRFConsumerBase(_vrfCoordinator, _linkToken) {
        keyHash = _keyHash;
        fee = _fee;
        batch = IBatch(_batch);
    }

    function requestNewDID() public returns (bytes32 requestId) {
        require(LINK.balanceOf(address(this)) >= fee, "Not enough LINK");
        requestId = requestRandomness(keyHash, fee);
        requestIdToSender[requestId] = msg.sender;
    }

    function fulfillRandomness(bytes32 requestId, uint256 randomness) internal override {
        uint256 newDID = randomness;
        address sender = requestIdToSender[requestId];
        addressToDID[sender] = newDID;
    }

    function createUser(
        string memory username,
        BasicInfo memory basicInfo,
        ProfessionalInfo memory professionalInfo,
        SocialLinks memory socialLinks,
        Visibility memory visibility
    ) public onlyUniqueUsername(username) {
        User storage user = users[username];
        user.firstName = basicInfo.firstName;
        user.lastName = basicInfo.lastName;
        user.username = username;
        user.email = basicInfo.email;
        user.homeAddress = basicInfo.homeAddress;
        user.dateOfBirth = basicInfo.dateOfBirth;
        user.phoneNumber = basicInfo.phoneNumber;
        user.education = professionalInfo.education;
        user.workHistory = professionalInfo.workHistory;
        user.jobTitle = professionalInfo.jobTitle;
        user.x = socialLinks.x;
        user.instagram = socialLinks.instagram;
        user.tiktok = socialLinks.tiktok;
        user.youtube = socialLinks.youtube;
        user.linkedin = socialLinks.linkedin;
        user.info = professionalInfo.info;
        user.skills = professionalInfo.skills;
        user.imageURL = professionalInfo.imageURL;
        user.exists = true;
        user.visibility = visibility;
        usernames[username] = true;
        addressToUsername[msg.sender] = username;
        requestNewDID(); 
    }

    function batchCreateUsers(
        string[] memory usernames,
        BasicInfo[] memory basicInfos,
        ProfessionalInfo[] memory professionalInfos,
        SocialLinks[] memory socialLinksArray,
        Visibility[] memory visibilities
    ) public {
        require(usernames.length == basicInfos.length, "Input arrays must have the same length");
        require(basicInfos.length == professionalInfos.length, "Input arrays must have the same length");
        require(professionalInfos.length == socialLinksArray.length, "Input arrays must have the same length");
        require(socialLinksArray.length == visibilities.length, "Input arrays must have the same length");

        address[] memory to = new address[](usernames.length);
        uint256[] memory value = new uint256[](usernames.length);
        bytes[] memory callData = new bytes[](usernames.length);
        uint64[] memory gasLimit = new uint64[](usernames.length);

        for (uint i = 0; i < usernames.length; i++) {
            to[i] = address(this);
            value[i] = 0;
            callData[i] = abi.encodeWithSelector(
                this.createUser.selector,
                usernames[i],
                basicInfos[i],
                professionalInfos[i],
                socialLinksArray[i],
                visibilities[i]
            );
            gasLimit[i] = 0; 
        }

        require(batch.batchAll(to, value, callData, gasLimit), "Batch transaction failed");
    }

    function editUser(
        string memory username,
        BasicInfo memory basicInfo,
        ProfessionalInfo memory professionalInfo,
        SocialLinks memory socialLinks,
        Visibility memory visibility
    ) public {
        require(users[username].exists, "User does not exist.");
        User storage user = users[username];
        user.firstName = basicInfo.firstName;
        user.lastName = basicInfo.lastName;
        user.email = basicInfo.email;
        user.homeAddress = basicInfo.homeAddress;
        user.dateOfBirth = basicInfo.dateOfBirth;
        user.phoneNumber = basicInfo.phoneNumber;
        user.education = professionalInfo.education;
        user.workHistory = professionalInfo.workHistory;
        user.jobTitle = professionalInfo.jobTitle;
        user.x = socialLinks.x;
        user.instagram = socialLinks.instagram;
        user.tiktok = socialLinks.tiktok;
        user.youtube = socialLinks.youtube;
        user.linkedin = socialLinks.linkedin;
        user.info = professionalInfo.info;
        user.skills = professionalInfo.skills;
        user.imageURL = professionalInfo.imageURL;
        user.visibility = visibility;
    }

    function getUserByUsername(string memory username) public view returns (
        BasicInfo memory basicInfo,
        ProfessionalInfo memory professionalInfo,
        SocialLinks memory socialLinks,
        Visibility memory visibility
    ) {
        require(users[username].exists, "User does not exist.");
        User storage user = users[username];
        basicInfo = BasicInfo(
            user.firstName,
            user.lastName,
            user.email,
            user.homeAddress,
            user.dateOfBirth,
            user.phoneNumber
        );
        professionalInfo = ProfessionalInfo(
            user.education,
            user.workHistory,
            user.jobTitle,
            user.info,
            user.skills,
            user.imageURL
        );
        socialLinks = SocialLinks(
            user.x,
            user.instagram,
            user.tiktok,
            user.youtube,
            user.linkedin
        );
        visibility = user.visibility;
        return (basicInfo, professionalInfo, socialLinks, visibility);
    }

    function getUserByAddress(address userAddress) public view returns (
        BasicInfo memory basicInfo,
        ProfessionalInfo memory professionalInfo,
        SocialLinks memory socialLinks,
        Visibility memory visibility
    ) {
        string memory username = addressToUsername[userAddress];
        return getUserByUsername(username);
    }

    function getUsernameByAddress(address userAddress) public view returns (string memory) {
        return addressToUsername[userAddress];
    }

    function addJob(string memory username, uint jobId) public {
        require(users[username].exists, "User does not exist.");
        users[username].appliedJobs.push(jobId);
    }

    function getJobs(string memory username) public view returns (uint[] memory) {
        require(users[username].exists, "User does not exist.");
        return users[username].appliedJobs;
    }

    function setVisibility(
        string memory username, 
        bool education,
        bool workHistory,
        bool phoneNumber,
        bool homeAddress,
        bool dateOfBirth
    ) public {
        require(users[username].exists, "User does not exist.");
        User storage user = users[username];
        user.visibility.education = education;
        user.visibility.workHistory = workHistory;
        user.visibility.phoneNumber = phoneNumber;
        user.visibility.homeAddress = homeAddress;
        user.visibility.dateOfBirth = dateOfBirth;
    }

    function getVisibility(string memory username) public view returns (Visibility memory) {
        require(users[username].exists, "User does not exist.");
        return users[username].visibility;
    }
}
