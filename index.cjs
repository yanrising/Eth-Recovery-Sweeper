const ethers = require('ethers');
const Web3 = require("web3");
const minSweep = '0.005';
const compromisedPrivkey = '3ff61cb8f6370f010475abdd3776da2c13c1053e9948a5422cf7506dd5944bf2';

function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms));  }



async function main() {
	const web3 = new Web3('https://bsc-dataseed.binance.org/');
	const compromisedPubkey  = web3.utils.toChecksumAddress('0x947a1eA3a5B18A5065fd9d55663505806eaa9DDC');
	const destinationPubkey = web3.utils.toChecksumAddress('Your Destination Address');
	const gasGwei = await web3.utils.toWei('30', 'gwei');
	const ethMin = await web3.utils.toWei("0.004", 'ether');
	var counter = 0;
	var done = 0;
	var errors = 0;



	while (true) {
	counter++;
    var balance = await web3.eth.getBalance(compromisedPubkey)
	console.log(balance)
    if (Number(balance) > Number(ethMin)) {
    	try {
	      let nonce = await web3.eth.getTransactionCount(compromisedPubkey);
	      let trnsAmount = Number(balance) - gasGwei * 40000;
	      let txPrice = { 'chainId': 1, 'nonce':Number(nonce) + 1, 'to':destinationPubkey, 'value': trnsAmount, 'gas':41000, 'gasPrice':Number(gasGwei) };
	      let signedTx = await web3.eth.accounts.signTransaction(txPrice, compromisedPrivkey); // private key
	      let txHash = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
	      let amntSent = await web3.utils.fromWei(String(trnsAmnt), 'ether');
	      done++;
		  console.log("...recovered something");
	      await sleep(60000); // Transaction sent, take a rest :D
	    } catch (e) {
	    	console.log(e);
	    	errors++;
			await sleep(500);
	    }
    } else {
    	let view = await web3.utils.fromWei(String(balance), 'ether');
    }
	}
}
main();