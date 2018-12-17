'use strict';

// Load array of notes
const express = require("express");
const data = require("./db/notes");
const app = express();


console.log('Hello Noteful!');

// INSERT EXPRESS APP CODE HERE...

app.use(express.static('public'));

app.listen(8080, function() {
    console.info(`Server litening on ${this.address().port}`);

}).on('error', err =>{
    console.error(err);
})

app.get('/api/notes', (req, res) => {
    res.json(data);
})

app.get('/api/notes/:id', (req,res) => {
    const {noteId} = req.params;
    let requestedId;
    for (let i = 0; i < data.length; i++){
        if(data[i].id === noteId){
            requestedId = data[i]
        }
    }

    res.json(requestedId);

});





