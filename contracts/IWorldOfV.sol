// SPDX-License-Identifier: UNLICENSED
// !! THIS FILE WAS AUTOGENERATED BY abi-to-sol v0.6.6. SEE SOURCE BELOW. !!
pragma solidity >=0.7.0 <0.9.0;

interface IWorldOfV {
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
        );
}
