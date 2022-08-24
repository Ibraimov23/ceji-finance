import tokenABI from './assets/data/tokenABI.json';
import tokenTestABI from './assets/data/tokenTestAbi.json';
import stakingABI from './assets/data/stakingABI.json';
import { ethers } from "ethers";
import Web3 from 'web3';
import BigNumber from "bignumber.js";
import bigInt from "big-integer";

async function V2_getStakedDataById(account, id) {
    const bigNumberValue = ethers.BigNumber.from(id.toString());
    const contract = SC.stakingContractV2;
  
    try {
      return await contract.viewUserStakeAny(account, bigNumberValue);
    } catch (err) {
      throw err;
    }
}

async function V2_getAvialableRewardById(account, id, shiftTime = 0) {
    const bigNumberValue = ethers.BigNumber.from(id.toString());
    const contract = SC.stakingContractV2;
  
    try {
        return await contract.calcRewardByIndex(account, bigNumberValue, ethers.BigNumber.from(shiftTime));
    } catch (err) { throw err }
}

async function V2_getTotalRewardsValue(account, shiftTime = 0) {
    let totalRewards = ethers.BigNumber.from(0);
  
    try {
        const stakesCount = await SC.stakingContractV2.getCountStake(account);

        for (let i = 0; i < stakesCount; i++) {
            const { reward } = await V2_getAvialableRewardById(account, i, shiftTime);
            totalRewards = totalRewards.add(reward.toString());
        }

        return totalRewards.toString();
    } catch (err) { throw err }
}

async function V2_getUnlockedReward(account, count, shiftTime = 0) {
    let totalRewards = ethers.BigNumber.from(0);
  
    try {
        for (let i = 0; i < count; i++) {
            const { reward } = await V2_getAvialableRewardById(account, i, shiftTime);
            totalRewards = totalRewards.add(reward.toString());
        }

        return totalRewards.toString();
    } catch (err) { throw err }
}

async function V2_getAllStakesData(account) {
    const stakes = [];

    try {
      const stakesCount = await SC.stakingContractV2.getCountStake(account);
  
      for (let i = 0; i < stakesCount; i++) {
        const stakeData = await V2_getStakedDataById(account, i);
        stakes.push(stakeData);
      }
  
      return stakes;
    } catch (err) { throw err }
}


export class SC {
    static coefficient = 0.000000000000000001;
    static dailyDistribution = 1e27;
    static tokenContract;
    static tokenContractTest;
    static stakingContract;
    static web3ojb;
    static tokenInst;
    static tokenInst2;
    static tokenSwap;
    static nftSwap;
    static rewardV2;
    static config = {
        mainChainId: 56,
        tokenContractAddress: '',
        tokenContractAddressTest: '0xDF0d44E6f086a096476a1A3Cb0b87eB0C56dA152',
        stakingContractAddress: '0x97523224520788400710Fa2b822Ca8Ec50274a49',
        mainWallet: '0x8B4754ae99F1e595481029c6835C6931442f5f02',
        timestamp: 1648163253
    };

    static inStake = 0;
    static inStakeV2 = 0;
    static inStakeV3 = 0;
    static inStakeV4 = 0;
    
static async init(_provider) {
    SC.web3ojb = new Web3(_provider);
    //SC.tokenInstCEJI = new SC.web3ojb.eth.Contract(tokenABI, SC.config.tokenContractAddress)
    SC.tokenInstTest = new SC.web3ojb.eth.Contract(tokenTestABI, SC.config.tokenContractAddressTest)
    SC.tokenInst = new SC.web3ojb.eth.Contract(stakingABI, SC.config.stakingContractAddress)
    const provider = new ethers.providers.Web3Provider(_provider), signer = provider.getSigner();

    if (!SC.tokenContract) {
        //SC.tokenContractCEJI = new ethers.Contract(SC.config.tokenContractAddress, tokenABI, signer);
        SC.tokenContractTest = new ethers.Contract(SC.config.tokenContractAddressTest, tokenTestABI, signer);
        SC.stakingContract = new ethers.Contract(SC.config.stakingContractAddress, stakingABI, signer);
    }
}

static async getInHoldTime() {
    const time = await SC.tokenInst.methods.holdingTime().call();
    return parseInt(time);
}

static async getInStackTime(account) {
    const time = await SC.tokenInst.methods.userLastStackedTime(account).call();
    return parseInt(time);
}

static async allowance(account) {
    const contract = SC.tokenContractTest;
    try {
        let approvedRaw = await contract.allowance(account, SC.stakingContract.address);
        console.log('APPROVED_VALUE', approvedRaw);
        if (approvedRaw) {
            let approved = parseInt(approvedRaw._hex, '16');
            if (approved) return true;
        }
        return false;
    } catch(e) { throw e }
}

static async allowanceV2(account) {
    const contract = SC.tokenContract;
    try {
        let approvedRaw = await contract.allowance(account, SC.stakingContractV2.address);
        console.log('APPROVED_VALUE', approvedRaw);
        if (approvedRaw) {
            let approved = parseInt(approvedRaw._hex, '16');
            if (approved) return true;
        }
        return false;
    } catch(e) { throw e }
}

static async approve() {

     const bigNumberValue = ethers.utils.parseEther((1000000000000000000000000000n).toString());
     const contract = SC.tokenContractTest;
      try {
          let approval = await contract.approve(SC.config.stakingContractAddress, bigNumberValue);

          return !!approval;
      } catch (e) { throw e }
}

static async getEarned(account) {
    const earned = bigInt(await SC.tokenInst.methods.earned(account).call());
    return String(earned.value / 10n ** 18n);
}

static async getInStake(account) {
    const balance = bigInt(await SC.tokenInst.methods.balanceOf(account).call());
    SC.inStake = String(balance.value / 10n ** 18n);
    return String(balance.value / 10n ** 18n);
}

static async stake(account, amount) {
    amount = new BigNumber(amount * 10 ** 18);  
    SC.tokenInst.methods.stake(amount.toFixed())
    .send({from: account})
        .then(function(result){
            console.log(result)
    });
}

static async harvest(account) {
    SC.tokenInst.methods.getReward()
    .send({from: account})
        .then(function(result){
            console.log(result)
    });
}
           
static async withdraw(account,amount) {
    amount = new BigNumber(amount * 10 ** 18); 
    SC.tokenInst.methods.withdraw(amount.toFixed())
    .send({from: account})
        .then(function(result){
            console.log(result)
    });
}


static async APR() {
    let count1 = await SC.tokenInst.methods.rewardRate().call();
    let count2 = await SC.tokenInst.methods.totalSupply().call();
    let count = ((bigInt(count1) * 86400 * 365) / (bigInt(count2) / 10 **18)  * 100 ) / 10 **18;
    return Math.trunc(count);
}


static async Rate() {
    let count = await SC.tokenSwap.methods.getTokenProportion().call();
    let result = bigInt(10000000000) / bigInt(count);
    return Math.trunc(result);
}

static async available(account) {
    let card = await SC.tokenSwap.methods.getUserCardAmount(account).call();
    let count = await SC.tokenSwap.methods.checkReward(account,card).call();
    let result = parseInt(count / 10 ** 17).toString();
    return result > 0 ? result.substring(0, result.length - 1) + '.' + result.substring(result.length - 1, result.length) : result;
}
static async remaining(account) {
    let card = await SC.tokenSwap.methods.getUserCardAmount(account).call();
    let count = await SC.tokenSwap.methods.getInformation(account,card).call();
    let result =  parseInt(count[1] / 10 ** 17).toString();
    return result > 0 ? result.substring(0, result.length - 1) + '.' + result.substring(result.length - 1, result.length) : result;
}
static async claimOshi(account) {
    let card = await SC.tokenSwap.methods.getUserCardAmount(account).call();
     SC.tokenSwap.methods.release(parseInt(card))
    .send({from: account})
        .then(function(result){
            console.log(result)
    });
}
static async approveV3() {
    const bigNumberValue = ethers.utils.parseEther((1000000000000000000000000000n).toString());
    const contract = SC.tokenContract;
    
    try {
        let approval = await contract.approve(SC.config.swappingContractAddress, bigNumberValue);
        return !!approval;
    } catch (e) { throw e }
}
static async allowanceV3(account) {
    const contract = SC.tokenContract;
    try {
        let approvedRaw = await contract.allowance(account, SC.swappingContract.address);
        console.log('APPROVED_VALUE', approvedRaw);
        if (approvedRaw) {
            let approved = parseInt(approvedRaw._hex, '16');
            if (approved) return true;
        }
        return false;
    } catch(e) { throw e }
}
static async getInStakeV3(account) {
    const balance = bigInt(await SC.tokenInstMeto.methods.balanceOf(account).call());
    SC.inStakeV3 = String(balance.value / 10n ** 18n);
    return String(balance.value / 10n ** 18n);
}




static async swapNft(account) {
    let amount = await SC.tokenInstNft .methods.balanceOf(account).call();
    amount = new BigNumber(amount); 
     SC.nftSwap.methods.deposit(amount.toFixed())
    .send({from: account})
        .then(function(result){
            console.log(result)
    });
}

static async RateNft() {
    let count = await SC.nftSwap.methods.getTokenProportion().call();
    let result = bigInt(10000000000) / bigInt(count);
    return Math.trunc(result) * 1000;
}

static async availableNft(account) {
    let card = await SC.nftSwap.methods.getUserCardAmount(account).call();
    let count = await SC.nftSwap.methods.checkReward(account,card).call();
    let result = parseInt(count / 10 ** 17).toString();
    return result > 0 ? result.substring(0, result.length - 1) + '.' + result.substring(result.length - 1, result.length) : result;
}
static async remainingNft(account) {
    let card = await SC.nftSwap.methods.getUserCardAmount(account).call();
    let count = await SC.nftSwap.methods.getInformation(account,card).call();
    let result =  parseInt(count[1] / 10 ** 17).toString();
    return result > 0 ? result.substring(0, result.length - 1) + '.' + result.substring(result.length - 1, result.length) : result;
}
static async claimOshiNft(account) {
    let card = await SC.nftSwap.methods.getUserCardAmount(account).call();
    SC.nftSwap.methods.release(parseInt(card))
    .send({from: account})
        .then(function(result){
            console.log(result)
    });
}
static async approveV4() {
    const bigNumberValue = ethers.utils.parseEther((1000000000000000000000000000n).toString());
    const contract = SC.nftContractTest;
    
    try {
        let approval = await contract.approve(SC.config.swappingContractAddressNft, bigNumberValue);
        return !!approval;
    } catch (e) { throw e }
}
static async allowanceV4(account) {
    const contract = SC.nftContractTest;
    try {
        let approvedRaw = await contract.allowance(account, SC.swappingContractNft.address);
        console.log('APPROVED_VALUE', approvedRaw);
        if (approvedRaw) {
            let approved = parseInt(approvedRaw._hex, '16');
            if (approved) return true;
        }
        return false;
    } catch(e) { throw e }
}

static async balanceNft(account) {
    let amount = await SC.tokenInstNft .methods.balanceOf(account).call();
    amount = amount / 10 ** 18; 
    return amount;
}
}