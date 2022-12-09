// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./IVeSeaProfiles.sol";
import "./IWorldOfV.sol";
import "./IVeChainEnergy.sol";

contract Nickname {

    function getNicknameForSource(
        address user,
        uint256 sourceId,
        address contractAddress
    ) public view returns (string memory nickname) {
        if (sourceId == 1) {
            return IVeSeaProfiles(contractAddress).getProfile(user).name;
        } else if (sourceId == 2) {
            (, , , , nickname, , ) = IWorldOfV(contractAddress)
                .getAccountPropertiesByAddress(user);
            return nickname;
        } else if (sourceId == 0) {
            return IVeChainEnergy(contractAddress).getNicknameFor(user);
        }

        return "";
    }

}