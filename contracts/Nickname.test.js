const { ethers } = require('hardhat')
const Web3EthAbi = require('web3-eth-abi')
const ERC1967Proxy = require('@openzeppelin/contracts/build/contracts/ERC1967Proxy.json')

const contracts = {}
const users = {}

beforeEach(async function () {
  [users.owner, users.admin, users.minter, users.anon, users.user1, users.user2] = await ethers.getSigners()

  const VeChainEnergy = await ethers.getContractFactory("VeChainEnergy")
  contracts.VeChainEnergy = await VeChainEnergy.deploy()
  
  const VeSea = await ethers.getContractFactory("VeSea")
  contracts.VeSea = await VeSea.deploy()

  const WoV = await ethers.getContractFactory("WoV")
  contracts.WoV = await WoV.deploy()


  contracts.Nickname = await getContractWithProxy('Nickname')
  const adminRoleNickname = await contracts.Nickname.DEFAULT_ADMIN_ROLE()
  await contracts.Nickname.grantRole(adminRoleNickname, users.admin.address)
  await contracts.Nickname.connect(users.admin).setConfigAddress(contracts.VeChainEnergy.address)

})

describe('Nickname', () => {
  describe('setConfigAddress(address)', () => {
    it('rejects for non DEFAULT_ADMIN_ROLE', async () => {
      const adminRole = await contracts.Nickname.DEFAULT_ADMIN_ROLE()
      expect(contracts.Nickname.connect(users.user1).setConfigAddress(contracts.VeChainEnergy.address)).rejects.toThrow(`is missing role ${adminRole}`)
    })

    it('can set config address', async () => {
      await contracts.Nickname.connect(users.admin).setConfigAddress(users.user1.address)
      const configAddress = await contracts.Nickname.configAddress()

      expect(configAddress).toEqual(users.user1.address)
    })
  })

  describe('getNicknameForSource(address user, uint256 sourceId, address contractAddress)', () => {
    it('supports sourceId = 1, VeSea', async () => {
      const nickname = await contracts.Nickname.getNicknameForSource(users.user1.address, 1, contracts.VeSea.address)
      expect(nickname).toEqual("vesea.nickname")
    })

    it('supports sourceId = 2, World of V', async () => {
      const nickname = await contracts.Nickname.getNicknameForSource(users.user1.address, 2, contracts.WoV.address)
      expect(nickname).toEqual("wov.nickname")
    })

    it('supports sourceId = 0, .energy', async () => {
      const nickname = await contracts.Nickname.getNicknameForSource(users.user1.address, 0, contracts.VeChainEnergy.address)
      expect(nickname).toEqual("energy.nickname")
    })
  })

  describe('getNicknameFor(address user)', () => {
    it('uses config contract to resolve configuration', async () => {
      const nickname = await contracts.Nickname.getNicknameFor(users.user1.address)
      expect(nickname).toEqual("energy.nickname")
    })
  })
})


async function getContractWithProxy(contractName) {
  // get contract details
  const Contract = await ethers.getContractFactory(contractName)
  const contract = await Contract.deploy()

  const Proxy = await ethers.getContractFactoryFromArtifact(ERC1967Proxy)

  // calculate initialize() call during deployment
  const callInitialize = Web3EthAbi.encodeFunctionCall(
    Contract.interface.fragments.find(({ name }) => name === 'initialize'), []
  )

  // deploy proxy pointing to contract
  const proxy = await Proxy.deploy(contract.address, callInitialize)

  // return proxy address attached with contract functionality
  const proxiedContract = Contract.attach(proxy.address)
  return proxiedContract
}