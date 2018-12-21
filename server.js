'use strict';

// Load array of notes
const express = require("express");
const morgan = require("morgan");
const config = require("./config");
const {PORT} = config;
const notesRouter = require("./router/notes.router");

const app = express()


console.log('Hello Noteful!');

// INSERT EXPRESS APP CODE HERE...
// app.use(logger);
app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
  });
app.use('/api', notesRouter);
app.use(morgan('common'));

app.use(function(req, res, next){
    let err = new Error('Not Found');
    err.status = 404;
    res.status(404).json({message: 'Not Found'});
});

app.use(function(err, req, res, next){
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: err
    });
});

    if(require.main === module){
        app.listen(PORT, function(){
            console.info(`Server litening on ${this.address().port}`);
        }).on('error',err=>{
            console.error(err);
        });
    }

    module.exports = app;






// 














