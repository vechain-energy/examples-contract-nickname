// SPDX-License-Identifier: UNLICENSED
// !! THIS FILE WAS AUTOGENERATED BY abi-to-sol v0.6.6. SEE SOURCE BELOW. !!
pragma solidity >=0.7.0 <0.9.0;

interface IVeChainEnergy {
    function balanceOf(address owner) external view returns (uint256);

    function createIdentity() external;

    function getNicknameFor(address user)
        external
        view
        returns (string memory nickname);

    function getProfileSourceFor(address user)
        external
        view
        returns (uint256 sourceId, address contractAddress);

    function isValidNickname(string memory nickname)
        external
        view
        returns (bool valid);

    function ownerOf(uint256 tokenId) external view returns (address);

    function setNickname(string memory nickname) external;

    function setProfileSource(uint256 sourceId, address contractAddress)
        external;

    function tokenByIndex(uint256 index) external view returns (uint256);

    function tokenOfOwnerByIndex(address owner, uint256 index)
        external
        view
        returns (uint256);
}
