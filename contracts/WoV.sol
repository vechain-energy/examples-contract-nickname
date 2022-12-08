// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract WoV {
    function getAccountPropertiesByAddress(address owner)
        external
        view
        returns (
            uint256 tokenId,
            uint8 accountType,
            string memory metadataCid,
            string memory imageCid,
            string memory accountName,
            bool verified,
            bool banned
        )
    {
        return (uint256(0), uint8(0), "metadata", "image", "wov.nickname", true, true);
    }
}
