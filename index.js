const mysql = require('mysql2');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');
app.use(bodyparser.json());

var koneksiDatabase = mysql.createConnection({
    host: "localhost",
    user: "root",
    //password: "root",
    database: "nodebelajar",
    multipleStatements : true
});


koneksiDatabase.connect((err) => {
    if (!err)
        console.log("DB Connection Success");
    else
        console.log('Db Cant Connect \n Error : ' + JSON.stringify(err, undefined, 2));
});

app.listen(3000,()=>console.log('Express Server Is Running Number Port 3000'));

//get all data
app.get('/data_info',(req,res)=>{
    koneksiDatabase.query('SELECT * FROM data_info',(err, rows, fields)=>{
        if(!err)
        res.send(rows)
        else
        console.log(err)
    })
});

//get data by id
app.get('/data_info/:id',(req,res)=>{
    koneksiDatabase.query('SELECT * FROM data_info WHERE id  = ?',[req.params.id],(err, rows, fields)=>{
        if(!err)
        res.send(rows)
        else
        console.log(err)
    })
});

//delete by id
app.delete('/data_info/:id',(req,res)=>{
    koneksiDatabase.query('DELETE FROM data_info WHERE id  = ?',[req.params.id],(err, rows, fields)=>{
        if(!err)
        res.send('Delete sukses')
        else
        console.log(err)
    })
});

//insert
app.post('/data_info',(req,res)=>{
    koneksiDatabase.query('INSERT INTO data_info (name,description) VALUES(?,?)',[req.body.name, req.body.description],(err, rows)=>{
        if(!err)
        res.send(rows)
        else
        console.log(err)
    })
});


//update
app.put('/data_info',(req,res)=>{
    koneksiDatabase.query('UPDATE data_info SET name = ?, description = ? WHERE id = ?',[req.body.name, req.body.description,req.body.id],
        (err, rows)=>{
        if(!err)
        res.send(rows)
        else
        console.log(err)
    })
});