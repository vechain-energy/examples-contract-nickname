# Reading User Profiles from VeSea and World of V

When users are authenticated on a dApp, the only personal information available is their address, which isn't very personal.

Greeting a user by their name would be a more personalized experience.

This is where major NFT marketplaces like VeSea and World of V come into play, as they create and manage user profiles in contracts.

Because of the public nature of blockchain, these contracts can be used in other applications or accessed from any contract.

# Interfaces

o interact with these contracts, the correct interface is required, similar to having the right plug for your electronic devices when traveling. Below are the interfaces for VeSea and World of V:

**VeSea**

```solidity
interface IVeSeaProfiles {
    function getProfile(address profileAddress)
        external
        view
        returns (VeSeaProfiles.Profile memory);
}

interface VeSeaProfiles {
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
}
```

**World of V**

```solidity
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
```

Both contracts have the user address as the only required argument, and they return more information than just the user's name.

## Reading from VeSea

VeSea uses the `struct` data type to return a custom type as a result, which is called `Profile` and contains different attributes with their own names.

These attributes can be accessed by using their names, as shown in the following example:

```solidity
IVeSeaProfiles(contractAddress).getProfile(userAddress).name;
```

Using the `Connex`, the struct data type adds an extra level of complexity to the decoded data set, making it more difficult to handle:

```js
  const {
    decoded: {
      0: { 1: nicknameVeSea }
    }
  } = await connex.thor
    .account("0xdaeda865296CeE66dc6863f9e93751f00B3606Fb")
    .method(ABIVeSeaGetProfile)
    .call(userAddress);
```

## Reading from World of V

World of V returns a `tuple`, which is an array with a fixed size and data types.

The user's name can be found in the fifth element of this array, as shown in the following example:

```solidity
(, , , , nickname, , ) = IWorldOfV(contractAddress).getAccountPropertiesByAddress(userAddress);
```

Or with connex:

```js
  const {
    decoded: { 4: nicknameWoV }
  } = await connex.thor
    .account("0xc7592f90A6746E5D55e4a1543b6caE6D5b11d258")
    .method(ABIWoVGetAccountProperties)
    .call(userAddress);
```

# Sandbox

A sample contract that demonstrates how to read from multiple sources is available on GitLab at the following link:  
https://gitlab.com/vechain.energy/examples/contract-nickname/-/tree/master/

You can also try out the Connex examples using the online sandbox available at the following link:  
https://codesandbox.io/embed/read-nickname-from-different-platforms-l3j7st?fontsize=14&hidenavigation=1&theme=dark

nickname.png
