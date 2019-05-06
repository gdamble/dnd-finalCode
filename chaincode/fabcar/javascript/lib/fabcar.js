/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class FabCar extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const mobileNumbers = [
            /*            {
                            preference: 'blue',
                            serviceprovider: 'Toyota',
                            servicearea: 'Prius',
                            status: 'Tomoko',
                        },
                        {
                            preference: 'red',
                            serviceprovider: 'Ford',
                            servicearea: 'Mustang',
                            status: 'Brad',
                        },
                        {
                            preference: 'green',
                            serviceprovider: 'Hyundai',
                            servicearea: 'Tucson',
                            status: 'Jin Soo',
                        },
                        {
                            preference: 'yellow',
                            serviceprovider: 'Volkswagen',
                            servicearea: 'Passat',
                            status: 'Max',
                        },
                        {
                            preference: 'black',
                            serviceprovider: 'Tesla',
                            servicearea: 'S',
                            status: 'Adriana',
                        },
                        {
                            preference: 'purple',
                            serviceprovider: 'Peugeot',
                            servicearea: '205',
                            status: 'Michel',
                        },
                        {
                            preference: 'white',
                            serviceprovider: 'Chery',
                            servicearea: 'S22L',
                            status: 'Aarav',
                        },
                        {
                            preference: 'violet',
                            serviceprovider: 'Fiat',
                            servicearea: 'Punto',
                            status: 'Pari',
                        },
                        {
                            preference: 'indigo',
                            serviceprovider: 'Tata',
                            servicearea: 'Nano',
                            status: 'Valeria',
                        },*/
            {
                Serviceprovider: 'serviceprovider',
                Servicearea: 'servicearea',
                Preference: 'preference',
                Status: 'status',
                Activationdate: 'activationdate',
/*
                preference: 'brown',
                serviceprovider: 'Holden',
                servicearea: 'Barina',
                status: 'Shotaro',
*/            },
        ];

        for (let i = 0; i < mobileNumbers.length; i++) {
            mobileNumbers[i].docType = 'dnd';
            await ctx.stub.putState(mobileNumbers[i].Mobilenumber, Buffer.from(JSON.stringify(mobileNumbers[i])));
            console.info('Added <--> ', mobileNumbers[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }

    async queryMobilenumber(ctx, mobileNumbers) {
        const carAsBytes = await ctx.stub.getState(mobileNumbers); // get the car from chaincode state
/*        if (!carAsBytes || carAsBytes.length === 0) {            //***********************************************  
            throw new Error(`${mobileNumbers} does not exist`);    // COMMENTED to Avoid Errors ***  HVM  *******************
        }                                                          //***********************************************
*/        console.log(carAsBytes.toString());
        return carAsBytes.toString();
    }

    async createMobilenumber(ctx, mobileNumbers, serviceprovider, servicearea, preference, status, activationdate, optedServices) {
        console.info('============= START : Create Mobilenumber ===========');

        console.log('**********');
        const car = {
            preference,
            serviceprovider,
            servicearea,
            status,
            activationdate,
            optedServices,
        };

        await ctx.stub.putState(mobileNumbers, Buffer.from(JSON.stringify(car)));
        console.info('============= END : Create Mobilenumber ===========');
    }

    async queryAllMobilenumbers(ctx) {
        const startKey = '0000000000';
        const endKey = '9999999999';

        await console.log('*********');

        const iterator = await ctx.stub.getStateByRange(startKey, endKey);

        const allResults = [];
        while (true) {
            const res = await iterator.next();

            if (res.value && res.value.value.toString()) {
                console.log(res.value.value.toString('utf8'));

                const Key = res.value.key;
                let Record;
                try {
                    Record = JSON.parse(res.value.value.toString('utf8'));
                } catch (err) {
                    console.log(err);
                    Record = res.value.value.toString('utf8');
                }
                allResults.push({ Key, Record });
            }
            if (res.done) {
                console.log('end of data');
                await iterator.close();
                console.info(allResults);
                return JSON.stringify(allResults);
            }
        }
    }

    async changeMobilenumberOwner(ctx, mobileNumbers, newOwner) {
        console.info('============= START : changeMobilenumberOwner ===========');

        const carAsBytes = await ctx.stub.getState(mobileNumbers); // get the car from chaincode state
        if (!carAsBytes || carAsBytes.length === 0) {
            throw new Error(`${mobileNumbers} does not exist`);
        }
        const car = JSON.parse(carAsBytes.toString());
        car.status = newOwner;

        await ctx.stub.putState(mobileNumbers, Buffer.from(JSON.stringify(car)));
        console.info('============= END : changeMobilenumberOwner ===========');
    }

}

module.exports = FabCar;
