const { DateTimeEvents } = require("./event_class");


let date_time_handler = new DateTimeEvents();

date_time_handler.add_new_time_event("1/5/2022, 10:16:00 AM");

console.log(date_time_handler)

date_time_handler.run()