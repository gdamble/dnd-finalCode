global.optedService = 0;
global.optedServices = "";

function dndPrtl() {
    var stdio = require('stdio')
    var start0 = 'START 0 : Fully Blocked Registration'
    var start1 = 'START 1 : Banking – Insurance – Financial Products – Credit Cards'
    var start2 = 'START 2 : Real Estate'
    var start3 = 'START 3 : Education'
    var start4 = 'START 4 : Health'
    var start5 = 'START 5 : Consumer Goods & Automobiles'
    var start6 = 'START 6 : Communication – Broadcasting – Entertainment – IT'
    var start7 = 'START 7 : Tourism'

    var stop0 = 'STOP 0 : De-register all'
    var stop1 = 'STOP 1 : Banking – Insurance – Financial Products – Credit Cards'
    var stop2 = 'STOP 2 : Real Estate'
    var stop3 = 'STOP 3 : Education'
    var stop4 = 'STOP 4 : Health'
    var stop5 = 'STOP 5 : Consumer Goods & Automobiles'
    var stop6 = 'STOP 6 : Communication – Broadcasting – Entertainment – IT'
    var stop7 = 'STOP 7 : Tourism'

    console.log('\n Welcome to DND Service Registration Portal')
    console.log('\n ======= == === ======= ============ =======')
    console.log("1. Fully Blocked Registration")
    console.log("2. Partial Blocked Registration")
    console.log("3. View DND Registration Status")
    console.log("4. Deregistration of DND")
    console.log("5. Exit the portal")
    console.log("Please choose your option from 1 to 5 \n")


    var readline = require('readline-sync');
    var service_id = readline.question("Enter the service id that you would like to Opt for: ");

    switch (service_id) {
        case '1':
            console.log("Fully Blocked Registration")
            console.log("===== ======= =============")
            var option = readline.question('Would you like to continue with Fully Blocked Registration [yes, no]: ')

            switch (option) {
                case 'yes':
                    console.log('You have opted for FBR service ', start0, '\n')
                    optedService = '21234567';//service_id;
                    var optedService2 = require('./optedService');
                    optedServices = optedService2.getService(optedService);
                    optedService = '11234567';
                    break;
                case 'no':
                    console.log('You have not opted any service , Please select any service \n');
                    process.exit();
                    break;
                default:
                    console.log('Invalid input...\n')
                    break;

            }
            break;

        case '2':
            console.log("Partial Blocked Registration")
            console.log("======= ======= ============")

            console.log(start1)
            console.log(start2)
            console.log(start3)
            console.log(start4)
            console.log(start5)
            console.log(start6)
            console.log(start7)

            var service_ids = readline.question('Enter the services you would like to register for: ')
            optedService = service_id + service_ids.replace(/,/g, "")
//            console.log('Case 2: Selected services for dnd registration are : ', optedService)

            if (isInvalid(optedService)) {
                console.log('Invalid option, please select the valid one \n');
                process.exit();
                break;
            }
            if (optedService == '20') {
                console.log("You are Registered for ALL services");
                optedService = '21234567';
            }
            else {
                var optedService2 = require('./optedService');
                optedServices = optedService2.getService(optedService);

                console.log('You have registered only for ::', optedServices);
            }
            break;

        case '3':
            console.log("View DND Status")
            console.log("==== === ======")
            optedService = 3;
            optedServices = "";
            break;

        case '4':
            console.log("De-registration Service")
            console.log("=============== =======")
            console.log(stop0)
            console.log(stop1)
            console.log(stop2)
            console.log(stop3)
            console.log(stop4)
            console.log(stop5)
            console.log(stop6)
            console.log(stop7)

            var stopids = readline.question('Select services to deregister for from the list ,[0,1,2,3,4,5,6,7]: ')
            optedService = service_id + stopids.replace(/,/g, "")
//            console.log('Case 4: Deregistered Services: ', optedService)

            if (isInvalid(optedService)) {
                console.log('Invalid option, please select the valid one \n');
                process.exit();
                break;
            }

            if (optedService == '40') {
                console.log("You are Deregistered from ALL services");
                optedService = '41234567';
                var optedService2 = require('./optedService');
                optedServices = optedService2.getService('21234567');
            }
            else {
                var temp = '2' + stopids.replace(/,/g, "")
                var optedService2 = require('./optedService');
                optedServices = optedService2.getService(temp);
                console.log("You have Deregistered only for ", optedServices);
            }
            console.log("Case4: opted service is --- " + optedService)
            break;
        case '5':
            console.log()
            process.exit();
            break;
        default:
            console.log('Please select the valid option \n');
            dndPrtl();
            break;

    }
    return optedService;
}

String.prototype.InsertAt = function (CharToInsert, Position) {
    return this.slice(0, Position) + CharToInsert + this.slice(Position)
}

function isInvalid(val) {
    // a simple regular expression to express that the string must be, from start (^)
    // to end ($) a sequence of one or more digits, 0-7 ([0-7]+), of (i):
    var valid = /^[0-7]+$/i;

    // returning a Boolean (true/false) of whether the passed-string matches the
    // regular expression:
    return !valid.test(val);
}

//dndPrtl();
module.exports = {
    dndPrtl: dndPrtl,
    serviceoptions: optedService,
    optedServices: optedServices
}

