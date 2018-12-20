const express = require("express");
const router = express.Router();
const data = require("../db/notes");
const simDB = require("../db/simDB");
const notes = simDB.initialize(data);

router.get('/notes', (req, res, next) => {
    const {
        searchTerm
    } = req.query;

    notes.filter(searchTerm)
        .then(item => {
            if (item) {
                res.json(item);
            }
        }).catch(err => {
            next(err);
        })
});
router.get('/notes/:id', (req, res) => {
    const id = req.params.id;
    notes.find(id)
        .then(item => {
            if (item) {
                res.json(item);
            } else {
                next();
            }
        }).catch(err => {
            next(err)
        });

});

router.put('/notes/:id', (req, res, next) => {
    const id = req.params.id;

    const updateObj = {};
    const updateableFields = ['title', 'content'];

    updateableFields.forEach(field => {
        if (field in req.body) {
            updateObj[field] = req.body[field];
        }
    });
     
    notes.update(id, updateObj)
    .then(item =>{
        if(item){
            res.json(item);
        } else {
            next();
        }
    }).catch(err=> {
        return next(err);
    });
});

router.post('/notes', (req, res, next) => {
    const {
        title,
        content
    } = req.body;

    const newItem = {
        title,
        content
    };

    if (!newItem.title) {
        const err = new Error('Missing `title` in request body');
        err.status = 400;
        return next(err);
    }

    notes.create(newItem)
        .then(item => {
            if (item) {
                res.location(`http://${req.header.host}/api/notes/${item.id}`).status(201).json(item);
            } else {
                next();
            }
        }).catch(err => {
            return next(err);
        });
});



router.delete('/notes/:id', (req, res, next) => {
    const id = req.params.id;
    
    notes.delete(id)
    .then(idNum => {
        if(idNum){
            console.log(`note (${id}) is deleted`);
            res.sendStatus(204);
        } 
       if (idNum === null) {
            const err = new Error('ID Number is invalid');
            err.status = 500;
            return next(err);
        }
    }).catch(err=>{
        return next(err);
    });
});





module.exports = router;