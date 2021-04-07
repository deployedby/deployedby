'use strict'

const pinataSDK = require('@pinata/sdk')
const axios = require('axios')
const chalk = require('chalk')
const fs = require('fs')
const path = require('path')
const prompt = require('prompt-sync')({sigint: true})
const secretPath = path.join(__dirname, '../', 'secret')
const authorsPath = path.join(__dirname, '../', 'authors')
const diddoucument = require('../authors/did_document_base.json')

const config = {
	githubUser: false,
	pinataSDK: false,
	pinataSecret: false,
	ethereumAddress: false
}

/*
 * Pin to IPFS
 */
const pinIPFS = async (diddocument) => {
	return new Promise((resolve, reject) => {
		const pinata = pinataSDK(config.pinataApi, config.pinataSecret)
		const options = { pinataMetadata: { name: config.githubUser }}
        pinata.pinJSONToIPFS(diddoucument, options)
			.then((pin) => {
				resolve(pin)
			})
			.catch(e => {
				console.log(e)
				reject(new Error('Pin Failed'))
			})
    })
  }

/*
 * Save Configuration File in /secret
 */
const saveConfig = () => {
	let secret = {
		pinataApi : config.pinataApi,
		pinataSecret : config.pinataSecret,
		githubUser: config.githubUser,
		ethereumAddress: config.ethereumAddress
	}
	fs.writeFileSync(secretPath + '/config.json', JSON.stringify(secret))
}

/*
 * Pins the diddocument
 */
const pinDidDocument = async () => {
	diddoucument.id += config.githubUser
	diddoucument.publicKey[0].id += config.githubUser + '#key1'
	diddoucument.publicKey[0].controller += config.githubUser
	diddoucument.publicKey[0].ethereumAddress = config.ethereumAddress
	const cid = await pinIPFS(diddoucument) 
	fs.writeFileSync(authorsPath + '/' + config.githubUser + '.json', JSON.stringify({
		githubUser: config.githubUser,
		ethereumAddress: config.ethereumAddress,
		diddocument: cid
	}))
	console.log(chalk.gray('\nDid document pinned: ') + chalk.bold(cid.IpfsHash ))
}

/*
 * Main
 */
const main = async () => {
	console.log(chalk.bold('\nNFTResolver') + chalk.gray(': Generate Minter keypair'))
	console.log(chalk.gray('Let\'s create a config file in a secret folder '))
	console.log(chalk.gray('Never push or share the secret folder\n'))

	fs.promises.mkdir(secretPath)
		.then(async () => {
			// Basinc config.
			config.pinataApi = prompt('Your PINATA API KEY: ')
			config.pinataSecret = prompt('Your PINATA Secret: ')
			config.githubUser= prompt('Your github username: ')
			config.ethereumAddress = prompt('Your Ethereum Address: ')

			// Pin and Save.
			saveConfig()
			await pinDidDocument()
			console.log(chalk.gray('Ready. Check your verification file now exists in authors and, and that your did document has been pinned to IPFS\n'))
		})
		.catch((e) => {
			console.log(e)
			console.log(chalk.red('A secret directory already exists'))
		})
}
main()
