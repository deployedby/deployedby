# deployedBy
deployedBy is a community repository of authors using Blockchain and DIDs (SSI standard by W3C).

deployedBy is also a smart contract acting as resolver from DIDs to did documents. To better understand DIDs, [please read the spec](https://www.w3.org/TR/did-core/)t a. It stores a mapping between the hash of the did and the cid (IPFS identifier) of the diddocument.

The first use case is sNFTs (signed NFTs). A way to verify an NFT has been issued by a a particular author. One sNFT is a Verifiable Credential signed by the issuer/author (did:dby:alexpuig) and minted in a ERC721/ERC1155 Smart Contract (did:nft:conftway).

Every author controls a did document, sored in IPFS,  holding the verification method for the NFTs. The cid of the Smart Contract is stored in the DeployedBy Smart Contract. In the did document you can have the verification method for many different NFT contracts.

How do I create a did:nft:amazingart?

1. Verify your github and pin your did document.
2. Community will verify your authorship.
3. Submit your NFT contract to the DeployedBy contract.


## STEP ONE : Verify Author => did:dby:alexpuig

First we will verify your github account.

1. Fork this Repo.
2. Join the discord channel
3. execute src/setup
4. push cahnges and Pull request

The setup is a script to automate the process. Some variables are needed to work with NFTResolver. A [Pinata](https://pinata.cloud/pinmanager) API KEY, your Ethereum adress and a new [Zenroom](https://zenroom.org/) keypair.

1. It creates a secret folder with your Pinata API KEYS and private Keys to sign the Verifiable Credentials. We use zenroom for the keys and signatures. You MUST never push this folder.
2. prompt: Setup Pinata API keys
3. prompt: Github user
4. prompt: Ethereum address.
5. Pin the new did document generated with your github name and the etehreum address controlled by you.

No information will leave your computer, the script will create a config file under "secret" directory.

We use Verifiable credentials to sign any NFT issued by the author.
Following W3C's DID spec. This is the didcoument pinned to IPFS.
```json
{
  "@context":[
    "https://www.w3.org/ns/did/v1",
    "https://identity.foundation/EcdsaSecp256k1RecoverySignature2020#"
  ],
  "id":"did:dby:alexpuig",
  "publicKey":[{
    "id": "did:dby:alexpuig#key1",
    "controller": "did:dby:alexpuig",
    "type": "EcdsaSecp256k1RecoveryMethod2020",
    "ethereumAddress": "0xF3beAC30C498D9E26865F34fCAa57dBB935b0D74"
  }]
}
```
[See an Example here](https://gateway.pinata.cloud/ipfs/QmeV1Rj35xu1UV8cpC75nsxKFbnqbyhwCU65jZR6EsFAP8)

Detailed steps:
```bash
# git clone https://github.com/<yoursuername>/deployedby.git 
# npm install
# node src/setup
# git add authors/*
# git commit -m "Verify author"
# git push
```

## Step TWO. Wait.

Someone trusted in the community will review your pull request and approve it. Probably you will get contacted in Discord and additional information may be asked: LinkedIn, Twitter...

Once verified a new entry in the deployedBy Smart contract will be written with the new did linked to the did document.

## STEP THREE. Deploy your ERC721/ERC1155 Contract

Available On Friday 4-9-21

## STEP FOUR. Mint your tokens

Available On Monday 4-12-21

