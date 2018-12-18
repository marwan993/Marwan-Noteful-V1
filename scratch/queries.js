const data = require('../db/notes');
const simDB = require('../db/simDB');
const notes = simDB.initialize(data);

notes.filter('cats', (err, list) => {
    if(err) {
        console.error(err);
    } 
    console.log(list);
});

notes.find(1008, (err, item) => {
    if(err){
        console.error(err);
    } if(item){
    console.log(item);
} else {
    console.log('not found');
}
});

const updateObj = {
    title: 'New Title',
    content: 'Blah blah blah'
}

notes.update(1008, updateObj, (err, item) => {
    if (err){
        console.error(err);
    }
    if(item){
        console.log(item);
    } else {
        console.log('not found');
    }
})





