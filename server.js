const express = require('express');
const app = express();
const path = require("path")
const PORT = process.env.PORT || 3000;
const db = require('./db/db.json');
const fs = require('fs')

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static('public'));

app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname, "./public/index.html"))
})
app.get('/notes', (req,res)=>{
    res.sendFile(path.join(__dirname, "./public/notes.html"))
})
app.get('/test/this/is/so/cool', (req,res)=>{
    res.json({name: "test", data: "Hello world"})
})
app.get('/api/notes', (req,res)=>{
    res.json(db)
})
app.post('/api/notes', (req,res)=>{
    db.push(req.body);
    console.log(db);
    fs.writeFile('./db/db.json', JSON.stringify(db),(err)=> res.json(err||'success!'))
})
app.delete('/api/notes/:index', (req,res)=>{
    db.splice(req.params.index,1);
    fs.writeFile('./db/db.json', JSON.stringify(db),(err)=> res.json(err||'success!'))
})


app.listen(PORT, ()=> console.log('server is up on port '+PORT))
