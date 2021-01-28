const express = require("express");

const bodyParser = require("body-parser");
const mongoose = require("mongoose");
/* Express */
const app = express();

/* Body Parser */
app.use (bodyParser.urlencoded(
    {
        extended : true
    }
));
app.use(express.static("public"));

/* Mongoose Connection */
mongoose.connect("mongodb://localhost:27017/wikiDB", { useNewUrlParser: true, useUnifiedTopology: true });
const userSchema = {

    userEmail: String,
    password: String
  
  }
const User = new mongoose.model("User", userSchema);

/* Login Page */
app.get("/",function(req,res){
    res.sendFile(__dirname + "/login.html")
  })

/*   Post Request */
app.post("/", function(req, res){
    const newUser = new User({
        userEmail : req.body.userEmail,
        password : req.body.password
    });
newUser.save(function(err){
    if(!err){
        res.sendFile(__dirname , "/index.html")
    }else{
        console.log(err);
    }
});

});

app.listen(3000, function(){
  console.log("Server started on port 3000")
});
