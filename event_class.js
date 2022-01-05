const {
  Worker, isMainThread, parentPort, workerData
} = require('worker_threads');



class Events {

  constructor(starting_events={}){
    this.events = starting_events
  }

  add_event = (event_name, event_call) => {
    this.events[event_name] =  event_call;
  }

  call_event = (event_name) => {
    this.events[event_name]()
  }

  remove_event = (event_name) => {
    if (this.events.hasOwnProperty(event_name)){
      delete this.events[event_name];
    }
  }
}

class DateTimeEvents extends Events{
  run = () => {
    this.worker = new Worker("./date_time_event_worker.js");
    let this1 = this;

    this.worker.on('message', (event) => {
      if (event.command == "NewTime"){
        if (this1.events[event.Message] !== undefined){
          console.log("Found event");
          this1.call_event(event.Message)
          this1.terminate()
        }
      }else if (event.command == "Terminating") {
        console.log(event.Message)
      }
    }) 
  }

  terminate = () => {
    this.worker.postMessage({"command": "Terminate"})
  }

  add_new_time_event = (time) => {
    console.log(`Adding New Time Event: ${time}`);
    let this1 = this;
    this.add_event(time, function(){
      console.log(`It is time for your timer ${time}`);
      this1.remove_event(time);
      console.log("Timer has been deleted");
    })
  }
}

exports.DateTimeEvents = DateTimeEvents