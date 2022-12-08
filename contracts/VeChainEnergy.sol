// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract VeChainEnergy {
    function getNicknameFor(address user)
        external
        view
        returns (string memory nickname)
    {
        return "energy.nickname";
    }

    function getProfileSourceFor(address user)
        external
        view
        returns (uint256 sourceId, address contractAddress)
    {
        return (0, address(this));
    }
}
