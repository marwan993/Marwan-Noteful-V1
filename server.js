'use strict';

// Load array of notes
const express = require("express");
const data = require("./db/notes");
const app = express();
const config = require("./config");
const {PORT} = config;


console.log('Hello Noteful!');

// INSERT EXPRESS APP CODE HERE...

app.use(express.static('public'));

app.use(function(req, res, next){
    let err = new Error('Not Found');
    err.status = 404;
    res.status(404).json({message: 'Not Found'});
    next()
});

app.use(function(err, req, res, next){
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: err
    });
    next()
});

app.listen(PORT, function() {
    console.info(`Server litening on ${this.address().port}`);

}).on('error', err =>{
    console.error(err);
})

app.get('/api/notes', (req, res) => {

    const searchTerm = req.query.searchTerm;
    if(searchTerm){
    const filteredItem = data.filter(item => item.title.includes(searchTerm));
    res.json(filteredItem);
    } else {
        res.json(data);
    }
    
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

// 














