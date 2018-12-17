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



