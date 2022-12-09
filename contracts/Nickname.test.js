const { ethers } = require('hardhat')
const Web3EthAbi = require('web3-eth-abi')
const ERC1967Proxy = require('@openzeppelin/contracts/build/contracts/ERC1967Proxy.json')

const contracts = {}
const users = {}

beforeEach(async function () {
  [users.user1, users.user2] = await ethers.getSigners()

  const VeChainEnergy = await ethers.getContractFactory("VeChainEnergy")
  contracts.VeChainEnergy = await VeChainEnergy.deploy()
  
  const VeSea = await ethers.getContractFactory("VeSea")
  contracts.VeSea = await VeSea.deploy()

  const WoV = await ethers.getContractFactory("WoV")
  contracts.WoV = await WoV.deploy()


  const Nickname = await ethers.getContractFactory("Nickname")
  contracts.Nickname = await Nickname.deploy()
})

describe('Nickname', () => {
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
})

