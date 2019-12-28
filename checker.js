const request = require('request');
var FCM = require('fcm-node');

var fcm = new FCM('FIREBASE_CLOUD_MSG_SV_KEY_HERE');

var indexNo = ''; //Index Number Here.

var URL = `https://results.doenets.lk/result/service/AlResult?index=${indexNo}+nic=`;

function check() { // Send HTTP GET request to the API service and check for json values if results released.
    
    request( URL, { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        if(body.errMsge && body.year !== 'null') {
            console.log('IS_RELEASED_FALES'); //Results not released to the public yet
        } else {
            console.log('IS_RELEASED_TRUE'); //Results released for the public,
            sendNotification(); //Trigger sendNotification function, check below.
        }
    });

}

function sendNotification () { // Send push notification via fcm
    
    var message = { 
        to: '', 
        
        notification: { //Your push notification msg here.
            title: 'Results', 
            body: 'Results Released !' 
        },
        
        data: {  
            type: 'live'
        }
    };

    fcm.send(message, function(err, response) {
        if (err) {
            console.log("Something has gone wrong!");
        } else {
            console.log("Successfully sent with response: ", response);
        }
    });

}

setInterval(() => {check();}, 120000); 