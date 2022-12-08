// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

import "./IVeSeaProfiles.sol";
import "./IWorldOfV.sol";
import "./IVeChainEnergy.sol";

contract Nickname is Initializable, AccessControlUpgradeable, UUPSUpgradeable {
    /// @custom:oz-upgrades-unsafe-allow constructor

    using AddressUpgradeable for address;
    address public configAddress;

    constructor() {
        _disableInitializers();
    }

    function initialize() public initializer {
        __AccessControl_init();

        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function setConfigAddress(address _configAddress)
        public
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        configAddress = _configAddress;
    }

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

    function getNicknameFor(address user)
        public
        view
        returns (string memory nickname)
    {
        (uint256 sourceId, address contractAddress) = IVeChainEnergy(configAddress)
            .getProfileSourceFor(user);
        return getNicknameForSource(user, sourceId, contractAddress);
    }

    function _authorizeUpgrade(address newImplementation)
        internal
        override
        onlyRole(DEFAULT_ADMIN_ROLE)
    {}
}
