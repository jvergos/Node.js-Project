let createE = function createEvent(req) {
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


exports.createE
