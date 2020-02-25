const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app
 .use(morgan('dev'))
 .use(cors());

 app.listen(8000, () => {
    console.log('Port 8000 listening');
});

const apps = require('./play-store');

app.get('/apps', (req, res)=> {

const { sort, genres} = req.query; 

let results = apps;

 if(sort){
     if(!['app'].includes(sort)){
         return res
         .status(400)
         .send('sort must be rating or app');
     }
 }
 if(genres){
     if(!['action','puzzle','arcade'].includes(genres.toLowerCase())){
         return res
         .status(400)
         .send('Must be Action, Puzzle, aracde');     
     }
     results = results.filter(app => {
         return app.genres.toLowerCase() === genres.toLowerCase();
     });
 }
return res
  .send(results);
});
