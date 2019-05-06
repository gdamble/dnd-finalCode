//const { EnclaveFactory } = require('./enclave')
//const { SawtoothClientFactory } = require('./sawtooth-client')


//const env = require('./env')
//const input = require('./input')
/*
var Promise = require('bluebird');

var promiseWhile = function(condition, action) {
    var resolver = Promise.defer();

    var loop = function() {
        if (!condition()) return resolver.resolve();
        return Promise.cast(action())
            .then(loop)
            .catch(resolver.reject);
    };

    process.nextTick(loop);

    return resolver.promise;
};


// And below is a sample usage of this promiseWhile function
var sum = 0,
    stop = 10;

promiseWhile(function() {
    // Condition for stopping
    return true;
}, function() {
    // Action to run, should return a promise
    return new Promise(function(resolve, reject) {
        // Arbitrary 250ms async method to simulate async process
        // In real usage it could just be a normal async event that 
        // returns a Promise.
        setTimeout(function() {
            sum++;
            // Print out the sum thus far to show progress
            console.log(sum);
            resolve();
        }, 1250);
    });
}).then(function() {
    // Notice we can chain it because it's a Promise, 
    // this will run after completion of the promiseWhile Promise!
    console.log("Done");
});
*/

Promise.resolve().then(async function resolver() {
    return await dnd()
        .then(console.log('hello'))
        .then(resolver);
}).catch((error) => {
    console.log("Error: " + error);
});

//dnd();
async function dnd() {
    try {
        var readline = require('readline-sync');

        //const enclave = EnclaveFactory(Buffer.from(env.privateKey, 'hex'))
        var dndPortal = require('./DNDPortal');

        optedService = dndPortal.dndPrtl();

        var serviceOption = optedService.toString()[0];
        console.log("Opted Service is:-", serviceOption);

        var mobilenumber;
        var serviceprovider;
        var servicearea;
        var preference;
        var status;
        var activationdate;
        var optedServices;

        var saveChanges = true;

        mobilenumber = readline.question("Enter the Mobile number: ");
        if (isValidMobileNumber(mobilenumber)) {
            //  Govind
            //	var b=query.queryMobileNumberExist(mobilenumber);
            //	console.log(" .....................mobile number already exist............................. "+b);
            //
            var query = require('./query');
            var Q = require('q');
            var Display_promise = Q.denodeify(query.queryMobileNumber);


            await query.queryMobileNumber(mobilenumber)
                .then(async function (result) {

                    //                    console.log(result.toString());

                    if ((result.toString() == "\"\"") && (serviceOption == '3')) {
                        console.log('The Mobile Number Does Not Exist');
                    }
                    else {
                        if (serviceOption == '3') {
                            console.log(`Transaction has been evaluated, result is:`);
//                           const object = JSON.parse(result.toString());
//                            console.log(JSON.stringify(JSON.parse(object), null, 4));

                            displayResult(result);
                        }
                        else {

                            console.log("Service Providers")
                            console.log("======= =========")
                            console.log("1. Airtel")
                            console.log("2. Jio")
                            console.log("3. Bsnl")
                            console.log("4. Idea")
                            console.log("5. Vadofone")
                            var option = readline.question("Select your service provider from 1 to 5 \n");
                            switch (option) {
                                case '1':
                                    serviceprovider = "Airtel";
                                    break;
                                case '2':
                                    serviceprovider = "Jio";
                                    break;
                                case '3':
                                    serviceprovider = "Bsnl";
                                    break;
                                case '4':
                                    serviceprovider = "Idea";
                                    break;
                                case '5':
                                    serviceprovider = "Vadofone";
                                    break;
                                default:
                                    console.log("invalid option")
                                    break;
                            }

                            servicearea = readline.question("Enter the Service Area: ");


                            switch (serviceOption - 1) {
                                case 0:
                                    preference = "Full (No call and SMS)";

                                    //                                    console.log('-------------------------');
                                    //                                    console.log(JSON.parse(JSON.parse(result.toString()))['optedServices'])

                                    if ((result.toString() != "\"\"") && (JSON.parse(JSON.parse(result.toString()))['optedServices'] == "1234567")) {
                                        console.log('The number is already FULLY Registered');
                                        //                                        saveChanges = false; //To make preference = "Full (No call and SMS)" from "partial" if so.
                                    }
                                    //                                    else {
                                    status = "Active";
                                    activationdate = Date();
                                    optedService = "1234567";
                                    optedServices = numToString(optedService);
                                    //                                    }
                                    break;
                                case 1:

                                    if ((result.toString() != "\"\"") && ("1234567" == JSON.parse(JSON.parse(result.toString()))['optedServices'])) {
                                        console.log('The number is already FULLY Registered');
                                        saveChanges = false;
                                    }
                                    else {
                                        preference = "partial"
                                        status = "Active"
                                        activationdate = Date();

                                        var optedServices1 = "";

                                        if (result.toString() == "\"\"") {
                                            optedServices1 = "";
                                        } else {
                                            optedServices1 = JSON.parse(JSON.parse(result.toString()))['optedServices'];
                                        }

                                        var optedSrvcs1 = stringToNum(optedServices1);
                                        console.log(optedSrvcs1);
                                        var optedSrvcs2 = optedService.substring(1);
                                        console.log(optedSrvcs2);

                                        //                                        if (eqSet(new Set([...optedSrvcs1]), new Set([...optedSrvcs2]))) {
                                        if ([...optedSrvcs2].every(val => [...optedSrvcs1].includes(val))) {
                                            console.log('The number is already Partially Registered');
                                            saveChanges = false;
                                        }
                                        else {
                                            var union = [...new Set([...optedSrvcs1, ...optedSrvcs2])];
                                            console.log(union);
                                            //                            optedServices = sortString(optedServices);
                                            union = union.join('');
                                            optedService = sortString(union);
                                            //                            console.log('Opted Services: ' + optedServices);

                                            optedServices = numToString(optedService);
                                            //                            console.log('Opted Services: ****' + optedServices);
                                        }
                                    }
                                    break;
                                case 2:
                                    saveChanges = false;
                                    break;
                                case 3:
                                    preference = "partial"
                                    status = "De-Active"
                                    activationdate = Date()

                                    var optedServices1 = "";

                                    if (result.toString() == "\"\"") {
                                        //                                var optedServices1 = new Set(JSON.parse(""));
                                        console.log("This Mobile Number is NOT Registered for DND");
                                        saveChanges = false;
                                        break;
                                    } else {
                                        optedServices1 = JSON.parse(JSON.parse(result.toString()))['optedServices'];
                                        if (optedServices1 == "") {
                                            console.log("This Mobile Number is NOT Registered for DND");
                                            saveChanges = false;
                                            break;
                                        }
                                    }
                                    //                  var optedServices1 = new Set(JSON.parse(JSON.parse(result.toString()))['optedServices']);

                                    if ((diffSecondsTillNow(JSON.parse(JSON.parse(result.toString()))['activationdate']) < 90) && (JSON.parse(JSON.parse(result.toString()))['status'] == "Active")) {
                                        console.log('Can not be Deactivated for 90 Seconds after Activation');
                                        saveChanges = false;
                                        break;
                                    }
                                    else {
                                        var optedSrvcs1 = stringToNum(optedServices1);
                                        console.log(optedSrvcs1);
                                        var optedSrvcs2 = new Set(optedService.substring(1));
                                        console.log(optedSrvcs2);

                                        var difference1 = new Set([...optedSrvcs1].filter(x => !optedSrvcs2.has(x)));

                                        //console.log(difference1);
                                        //var difference2 = new Set([...optedServices2].filter(x => !optedServices1.has(x)));
                                        if (eqSet(difference1, new Set([...optedSrvcs1]))) {
                                            console.log('This Mobile Number is not Registered for DND ', numToString(sortString([...new Set([...optedSrvcs2])].join(''))));
                                            saveChanges = false;
                                        }
                                        else {
                                            var union = [...new Set([...difference1])]; //, ...difference2])];
                                            //console.log(union);
                                            //                            optedServices = sortString(optedServices);
                                            union = union.join('');
                                            //console.log(union);
                                            optedService = sortString(union);
                                            optedServices = numToString(optedService);
                                            console.log('Opted Services: ' + optedService);
                                        }
                                    }
                                    break;
                                case 4:
                                    break;
                                default:
                                    console.log("Invalid option" + serviceOption)
                                //                  console.log(dndPortal.serviceoptions)
                            }
                            if (saveChanges == true) {
                                const newPayload = {
                                    //          Mobilenumber:mobilenumber,
                                    Serviceprovider: serviceprovider,
                                    Servicearea: servicearea,
                                    Preference: preference,
                                    Status: status,
                                    Activationdate: activationdate,
                                    Optedservice: optedService
                                }

                                // Display user input in console log.
                                //console.log("user input "+newPayload);
                                console.log("JSON request " + JSON.stringify(newPayload, null, 4));
                                console.log("Dear Customer, it will take 60 seconds to update your request");

                                var mobNum = require('./invoke');
                                await mobNum.createMobileNumber(mobilenumber, serviceprovider, servicearea, preference, status, activationdate, optedService);
                            }
                        }
                    }
                })
                .catch(e => {
                    console.log(`.catch(${e})` + '********************************************');
                    console.log('The Mobile Number Does Not Exist##');
                });
        } else {
            console.log('Please enter a valid Mobile Number');
        }
    } catch (e) {
        console.error(`try/catch(${e})`);
    }
}

function displayResult(result) {

    console.log('**********************************************************************************************************************************');
    console.log('                            activationdate:'.padEnd(55) + JSON.parse(JSON.parse(result.toString()))['activationdate'].padStart(50));
    console.log('                            optedServices:'.padEnd(55) + JSON.parse(JSON.parse(result.toString()))['optedServices'].padStart(50));
    console.log('                            preference:'.padEnd(55) + JSON.parse(JSON.parse(result.toString()))['preference'].padStart(50));
    console.log('                            servicearea:'.padEnd(55) + JSON.parse(JSON.parse(result.toString()))['servicearea'].padStart(50));
    console.log('                            serviceprovider:'.padEnd(55) + JSON.parse(JSON.parse(result.toString()))['serviceprovider'].padStart(50));
    console.log('                            status:'.padEnd(55) + JSON.parse(JSON.parse(result.toString()))['status'].padStart(50));
    console.log('**********************************************************************************************************************************');
}

function diffSecondsTillNow(date) {

    const date1 = new Date(date);
    const date2 = new Date();
    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    //const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    var seconds = diffTime / 1000;
    console.log(seconds);

    return seconds;
}

function eqSet(as, bs) {
    if (as.size !== bs.size) return false;
    for (var a of as) if (!bs.has(a)) return false;
    return true;
}

function sortString(str) {
    var arr = str.split('');
    var sorted = arr.sort();
    return sorted.join('');
}

function isValidMobileNumber(mobileNumber) {

    if (mobileNumber.length != 10) {
        return false;
    }

    if (/^\d+$/.test(mobileNumber)) {
        mobNum = parseInt(mobileNumber);
        if (mobNum >= 0) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

//
function numToString(optedService) {
    if (optedService == "") {
        return ""
    }
    var optedService2 = require('./optedService');
    //                console.log("****####", optedService);
    optedServices = optedService2.getService('2' + optedService);
    optedServices = optedServices.split(' & ');

    for (var i in optedServices) {
        optedServices[i] = optedServices[i].InsertAt('(', 2) + ')';
    }
    optedServices = optedServices.join(",");
    //                console.log(optedServices);
    return optedServices;
}

function stringToNum(optedServices) {
    //    var txt = "#div-name-1234-characteristic:561613213213";

    var numb = optedServices.match(/\d/g);
    if (numb == null) {
        return "";
    }
    numb = numb.join("");
    return numb;
}

/*const walletClient = SawtoothClientFactory({
	  enclave: enclave,
	  restApiUrl: env.restApiUrl
	})

	const walletTransactor = walletClient.newTransactor({
	  familyName: env.familyName,
	  familyVersion: env.familyVersion
	})

if (input.payloadIsValid(newPayload)) {
	console.log("Valid payload is getting submitted... "+newPayload)
	input.submitPayload(newPayload, walletTransactor)
} else {
	console.log(`Oops! Your payload failed validation and was not submitted.`)
}*/

