let express = require('express');
let app = express();


//event constructor
function eventEx(id, title, description, date) {
    this.id = id;
    this.title = title;
    this.desc = description;
    this.date = date;
}

//mock object table
let events = [
new eventEx(0,"randomEvent0","testing event 0","03042017"),
new eventEx(1,"randomEvent1","testing event 1","03042017"),
new eventEx(2,"randomEvent2","testing event 2","03042017"),
new eventEx(3,"randomEvent3","testing event 3","03042017")
];
console.log(events);

//asynchronous function that creates an event
function createEvent(req) {
    return new Promise((resolve, reject) => {

            let id = req.params.id;
            let desc = req.params.desc;
            let title = req.params.title;
            let date = req.params.date;
            let newEvent = new eventEx(id,title,desc,date);
            if(newEvent){
              resolve(newEvent);
            }else{
              let mess = 'Could Not Add New Event.';
              reject(new Error(mess));
            }
        });
}

//asynchronous function that returns the event with the id provided
function returnEvent(req) {
  return new Promise((resolve, reject) =>{
    let id = req.params.id;
    if(events[id]){
      resolve(events[id]);
    }else{
      let mess = 'Could Not Find '+ id + ' Event.';
      reject(new Error(mess));
    }
  });
}

//asynchronous function that returns all events
function returnEvents() {
  return new Promise((resolve, reject) =>{
    if(events.length>0){
      resolve(events);
    }else{
      let mess = 'Events Array Is Empty!';
      reject(new Error(mess));
    }
  });
}

//asynchronous function that edits the event with the id provided
function editEvent(req) {
  return new Promise((resolve, reject) =>{
    let id = req.params.id;

    if(events[id]){
      resolve(createEvent(req));
    }else{
      let mess = 'Could Not Find ' + id + ' Event.';
      reject(new Error(mess));
    }
  });
}

//asynchronous function that deletes the event with the id provided
function deleteEvent(req){
  return new Promise((resolve, reject)=>{
    let id = req.params.id;
    console.log(events.filter(function(id){return id.id==id;}));
    if(events.splice(events.filter(function(table){return table.id==id;}),1)){
      resolve('Event Successfully Deleted.');
    }else{
      let mess = 'Could Not ' + id + ' Event.';
      reject(new Error(mess));
    }
  });
}

//HTML GET: home page, Hello World!
app.get('/', (req, res) => {
  res.send('Hello World! - Get');
});

//HTML GET: all events
app.get('/events/?', (req, res) => {
  returnEvents()
  .then(result =>{
    //console.log('mphka');
  res.send(events);
  })
    .catch(error =>{
      res.status(404).send(error);
    });
});

//HTML GET: event with the id provided
app.get('/events/:id', (req, res) => {
  returnEvent(req)
  .then(result =>{
    let id = req.params.id;
    res.send(events[id]);
  })
  .catch(error => {
    //console.log(error);
    res.status(404).send(error);
  });

});

//HTML POST: home page, Hello World!
app.post('/', (req, res) => {
  res.send('Hello World! - Post');
});

//HTML POST: create new event with the parameters provided
app.post('/events/:id/title/:title/desc/:desc/date/:date' , (req , res) =>{
  createEvent(req)
  .then(result =>{
      events.push(result);
      res.send("New event added.");
  })
  .catch(error =>{
      res.send(error);
  });

});

//HTML PUT: edit event with the id and parameters provided
app.put('/events/:id/title/:title/desc/:desc/date/:date' , (req , res) =>{
  editEvent(req)
  .then(result =>{
    //console.log(events[req.params.id]);
    events[req.params.id]=result;
    //console.log(events[req.params.id]);

	   res.send(events[req.params.id]);
  })
  .catch(error =>{
    res.status(404).send(error);
  });

});

//HTML DELETE: event with the id provided
app.delete('/events/:id', (req, res) => {
  deleteEvent(req)
  .then(result =>{
    res.send(result);
  })
  .catch(error =>{
    res.status(404).send(error);
  })

});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
