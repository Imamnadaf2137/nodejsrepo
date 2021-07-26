const express=require('express');
const bodyParser = require('body-parser')
const session = require('express-session')
const port=process.env.PORT || 4500;
const app = express();
var mysql = require('mysql');  

app.use(bodyParser.urlencoded({extended:false}));
app.use(session({ secret: 'passport'}));
 
var con = mysql.createConnection({  
host: "localhost",  
user: "root",  
password: "",  
database: "nodedb"  
}); 

con.connect(function(err){
    if(err) throw err;
    console.log('Connected...');
})


app.set('view engine','ejs');
app.set('views','views');


app.get("/", function(req,res){
  
    res.render('index',
    {
         "title":"title is title",
         "messagebody":"welcome"
    })
 });
 app.get("/success", function(req,res){
  
  res.render('success',
  {
       "title":"success",
       "messagebody":"tq"
  })
});
app.get("/",function(req,res){
    res.render('index')

})
app.get("/login",function(req,res){
  res.render('login')

})
app.post("/check-login",function(req,res){
  console.log("Connected!");
  var sql = "SELECT email,password FROM registration WHERE email='"+ req.body.email + "' and password='"+ req.body.pass + "'";
  con.query(sql, function (err, result) {
    if (result.length > 0) {
     
      res.status(200).json({ Statuscode: '200' });
    }
    else
    {
      
      res.status(202).json({ Statuscode: '202' });
    }
    res.end();
   
  });

})

app.post("/registration",function(req,res){
    console.log("Connected!");
    var sql = "INSERT INTO registration(email,name,mobile,password) VALUES ('"+req.body.email+"','"+ req.body.name + "','"+ req.body.mobile + "','"+ req.body.pass + "')";
    con.query(sql, function (err, result) {
      if (err){
        
        res.status(202).json({ Statuscode: '202' });
       
      }else{
        res.status(200).json({ Statuscode: '200' });
      }
     
    });

})


app.listen(port);
