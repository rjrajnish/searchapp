const express = require('express');
const bodyparser = require("body-parser");
const path = require('path');

const connectDB = require('./server/database/connection');

const app = express();

 

const PORT = process.env.PORT || 8080




// mongodb connection
connectDB();

// parse request to body-parser
app.use(bodyparser.urlencoded({ extended : true}))

// set view engine
app.set("view engine", "ejs")
//app.set("views", path.resolve(__dirname, "views/ejs"))

// load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))

// load routers
app.use('/', require('./server/routes/router'))

app.listen(PORT, ()=> { console.log(`Server is running on http://localhost:${PORT}`)});

//search
 const Userdb =require('./server/model/model');
    //searchng items
     
app.get('/',(req,res)=>{  
    try {  
    Userdb.find({$or:[{name:{'$regex':req.query.name}},{location:{'$regex':req.query.location}}]},(err,data)=>{  
    if(err){  
    console.log(err);  
    }else{  
    res.render('/',{data:data});  
    }  
    })  
    } catch (error) {  
    console.log(error);  
    }  
    });  
    app.post('/',(req,res)=>{  
    try {  
    var area = new Userdb({  
        name : req.body.name,
        location : req.body.location
    });  
    area.save((err,data)=>{  
    if(err){  
    console.log(err)  
    }else{  
    res.redirect('/');  
    }  
    })  
    } catch (error) {  
    console.log(error);  
    }  
    });  