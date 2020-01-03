var Market = artifacts.require("./NFTAuction.sol");
var NFT = artifacts.require("./NFT.sol");
var ERC721Token = artifacts.require("./contracts/openzeppelin-solidity/contracts/token/ERC721/ERC721.sol");

contract ('Market', function (accounts){


  it("mint NFT toenId 1 to account[7]", function() {
        return NFT.deployed().then(function(instance) {
          NFTInstance = instance;
    
          return NFTInstance.Mint('My Crypto Collectable','description', accounts[7], 1, 'metadata', {from: accounts[0]});
        })
  });


  it("account[7] approves Auctioncontract ", function() {
    return NFT.deployed().then(function(instance) {
    NFTInstance = instance;
    
    return Market.deployed();
    }).then(function(instance) {
      MarketInstance = instance;
      return NFTInstance.approve(MarketInstance.address, 1, {from: accounts[7]});
      });
  });
    

  it("...AUCTION takes ownership of account 0 NFT ID 1 and start auction ", function() {
    return NFT.deployed().then(function(instance) {
    NFTInstance = instance;
    return Market.deployed();
    }).then(function(instance) {
      MarketInstance = instance;
      return MarketInstance.CreateAuction('MY NFT','my nft description',3, NFTInstance.address, 1 ,{from: accounts[7]});
    }).then(function(res) {
      return NFTInstance.ownerOf(1);
    }).then(function(account) {
      assert.equal(account, MarketInstance.address, "The NFT is not owned by AUCTION contract.");
    });
  });


  it("account[6] can bid 4 ETH on auction] ", function() {
    return NFT.deployed().then(function(instance) {
      NFTInstance = instance;

      return Market.deployed();
    }).then(function(instance) {
        MarketInstance = instance;
        MarketInstance.Bid( {from: accounts[6], value: 4000000000000000000}); //4eth
    });
  });


  it("account[5] can bid 5 ETH on auction] ", function() {
    return NFT.deployed().then(function(instance) {
      NFTInstance = instance;

      return Market.deployed();
    }).then(function(instance) {
        MarketInstance = instance;
        MarketInstance.Bid( {from: accounts[5], value: 5000000000000000000}); //5eth
    });
  });
  it("account[4] can bid 7 ETH on auction] ", function() {
    return NFT.deployed().then(function(instance) {
      NFTInstance = instance;

      return Market.deployed();
    }).then(function(instance) {
        MarketInstance = instance;
        MarketInstance.Bid( {from: accounts[4], value: 7000000000000000000}); //7eth
    });
  });

  it("account[6] can bid 3 ETH on auction] ", function() {
    return NFT.deployed().then(function(instance) {
      NFTInstance = instance;

      return Market.deployed();
    }).then(function(instance) {
        MarketInstance = instance;
        MarketInstance.Bid( {from: accounts[6], value: 4000000000000000000}); //4eth
        
      });
      });

  function sleep(seconds) 
{
  var e = new Date().getTime() + (seconds * 1000);
  while (new Date().getTime() <= e) {}
}

  it("account[0] can end auction] ", function() {
    return NFT.deployed().then(function(instance) {
    NFTInstance = instance;

    return Market.deployed();
  }).then(function(instance) {
    MarketInstance = instance;
    
      
    sleep(5);
    MarketInstance.EndAuction({from: accounts[7]});
    MarketInstance.Withdraw({from: accounts[5]});
    MarketInstance.Withdraw({from: accounts[4]});
  }).then(function(res) {
    return NFTInstance.ownerOf(1);
  }).then(function(account) {
    console.log('owner of nft is', account);
    assert.equal(account, accounts[6], "The NFT is not owned by AUCTION contract.");
    }).then(function(res) {
     
      
    });
  });


  it("account[2] can end withdraw ", function() {
    return Market.deployed().then(function(instance) {
      MarketInstance = instance;
      //MarketInstance.Withdraw({from: accounts[2]});

  }); });

  it("account[3] can end withdraw ", function() {
    return Market.deployed().then(function(instance) {
      MarketInstance = instance;
      //MarketInstance.Withdraw({from: accounts[3]});

  });


  });

});




