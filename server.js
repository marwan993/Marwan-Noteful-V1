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
    
  });

app.get('/api/notes/:id', (req,res) => {
    const id = req.params.id;
    const requestedId = data.find(item => item.id === Number(id));
    res.json(requestedId);
});

app.get('/api/notes/id', (req, res)=>{
    const id = req.params.id;
    const foundId = data.find(item => item.id === Number(id));
    res.json(foundId);
});













