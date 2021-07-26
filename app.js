const express=require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app=express();
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'nodedb'
  });

connection.connect((err, res) => {
    if(err) {
        console.log("Error in Database");
    }
    else
    {
        console.log("Mysql Is Connected Successfully");
    }
    
});
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine','ejs');
app.set('views','views');


app.get("/", function(req,res){
  
   res.render('index',
   {
        "title":"title is title",
        "messagebody":"welcome"
   })
});


app.post("/insert",async function (req,res,next) {
    
   
    var sql = "INSERT INTO testtable (name, emai) VALUES ('"+req.body.name+"', '"+req.body.email+"')";
    
    
    connection.query(sql, function (err, result) {
        if (err){
            res.status(201).json('200')
           
          }else{
            res.status(200).json('202')
          }
      });
       
       
})

app.listen(7777);

