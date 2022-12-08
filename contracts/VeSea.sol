// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract VeSea {
    struct Badge {
        string name;
        string set;
        uint256 blockCreated;
    }

    struct ProfileKeyValue {
        string key;
        string value;
    }

    struct Profile {
        address profileAddress;
        string name;
        bool blacklisted;
        bool verified;
        bool payWithVSea;
        uint256 profileTypeId;
        address pfpContract;
        uint256 pfpTokenId;
        uint256 blockCreated;
    }

    function getProfile(address profileAddress)
        external
        view
        returns (Profile memory)
    {
        return
            Profile({
                profileAddress: address(this),
                name: "vesea.nickname",
                blacklisted: false,
                verified: true,
                payWithVSea: false,
                profileTypeId: 0,
                pfpContract: profileAddress,
                pfpTokenId: 0,
                blockCreated: 1
            });
    }
}
