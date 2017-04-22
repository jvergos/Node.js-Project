let express = require('express');
let app = express();



function eventEx(id, title, description, date) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.date = date;
}

let events = [
new eventEx(0,"randomEvent0","testing event 0","03042017"),
new eventEx(1,"randomEvent1","testing event 1","03042017"),
new eventEx(2,"randomEvent2","testing event 2","03042017"),
new eventEx(3,"randomEvent3","testing event 3","03042017")
];
console.log(events);

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
              let mess = 'Could Not Add New Event.'
              reject(new Error(mess));
            }
        });
}


app.get('/', (req, res) => {
  res.send('Hello World! - Get');
});

app.get('/events/?', (req, res) => {
  res.send(events);
});

app.get('/events/:id', (req, res) => {
  let id = req.params.id;
  res.send(events[id]);
});

app.post('/', (req, res) => {
  res.send('Hello World! - Post');
});

app.post('/events/:id/title/:title/desc/:desc/date/:date' , (req , res) =>{
  createEvent(req)
  .then(result =>{
      events.push(result);
      res.send("New event added.");
  })
  .catch(error =>{
      console.log(error);
  });

});

app.put('/events/:id/title/:title/desc/:desc/date/:date' , (req , res) =>{
	let id = req.params.id;
	events[id].desc = req.params.desc;
	events[id].title = req.params.title;
	events[id].date = req.params.date;
	res.send(events[id]);
});

app.delete('/events/:id', (req, res) => {
  let id = req.params.id;
  for (let i in events) {
  		if(events[i].id == id){
			  events.splice(i,1);
  		}
  }
  res.send(events);
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
