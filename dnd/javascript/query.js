/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { FileSystemWallet, Gateway } = require('fabric-network');
const fs = require('fs');
const path = require('path');

const ccpPath = path.resolve(__dirname, '..', '..', 'basic-network', 'connection.json');
const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
const ccp = JSON.parse(ccpJSON);

async function queryMobileNumber(mobileNum) {
    try {

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists('user1');
        if (!userExists) {
            console.log('An identity for the user "user1" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'user1', discovery: { enabled: false } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('fabcar');

        // Evaluate the specified transaction.
        // queryCar transaction - requires 1 argument, ex: ('queryCar', 'CAR4')
        // queryAllCars transaction - requires no arguments, ex: ('queryAllCars')

        //        const result = await contract.evaluateTransaction('queryAllMobilenumbers');
        //        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);

        //        const result = await contract.evaluateTransaction('changeMobilenumberOwner', '0000000000', 'Madhu');
        //        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);

        //        contract.evaluateTransaction('createMobilenumber', '2222222222', 'bsnl', 'karnataka', '123', 'active', new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''));
        //        console.log(`Transaction has been submitted.` + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''));

//        console.log("----------------------------------");

        const result = await contract.evaluateTransaction('queryMobilenumber', mobileNum);
        //        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
//        console.log("----------------------------------");
        return result;

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
//        process.exit(1);
    }
}

//main();
module.exports = {
    queryMobileNumber: queryMobileNumber
}
