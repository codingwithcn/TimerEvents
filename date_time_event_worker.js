const { workerData, parentPort } = require('worker_threads');

let not_terminate = true;

parentPort.once("message", (event)=> {
  if (event.command == "Terminate"){
    console.log("Closing....")
    not_terminate = false;
  }
})

while (not_terminate){
  let date_ob = new Date().toLocaleString('en-US', {
    timeZone: 'America/New_York' // Change to user current time-zone
  });

  parentPort.postMessage({"command": "NewTime", "Message": date_ob})
  
  if (not_terminate == false){
    console.log("Closed...")
    parentPort.postMessage({"command": "Terminating", "Message": "Working Closing Down"});
    process.exit(0);
    break;
  }
}
