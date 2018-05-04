let bodyParser = require("body-parser")
let express = require("express");
let app = express();
let session = require('express-session');
let parseurl = require("parseurl");
let cookieParser = require("cookie-parser");
let jwt = require("jsonwebtoken");

const APP_SECRET = process.env.APP_SECRET || "keyboardcat";

const config = {
    JWT:{
        //what the cookie is called
        name: 'thursday_token',
        secret: APP_SECRET,
        expires: 60 * 60 * 60
    }
};


app.use(express.static('public'));



const auth = (req, res, next) => {
    if (!req.cookies || !req.cookies[config.JWT.name])
      return res.status(401).redirect("/login");
  
    // Do we have a cookie? Is the cookie the one we're looking for?
  
    try {
      // Decode the user from the token.
      const user = jwt.verify(req.cookies[config.JWT.name], config.JWT.secret);
      console.log(user);
      if (!user || !(user.email === "calvin@calvin.com"))
        return res.status(401).redirect("/login");
        
  
      next();
    } catch (e) {
      // Something went wrong decoding the token.
      res.status(500).redirect("/login");
    }
  };

app.use(cookieParser());

app.get("/",auth,(request,response)=>{
    console.log("hello");
    response.sendFile(__dirname + "/index.html");

});

app.get("/login",(request,response)=>{
    response.sendFile(__dirname + "/login.html");
});

app.post(
    "/authenticate",
    bodyParser.urlencoded({ extended: true }),
    (req, res) => {
      if (!req.body.username || !req.body.password) {
        return res.status(400).redirect("/login");
      }
  
      if (req.body.username !== "calvin" && req.body.password !== "calvin") {
        return res.status(400).redirect("/login");
      }
  
      const token = jwt.sign(
        {
          name: "calvin",
          email: "calvin@calvin.com",
          admin: true
        },
        config.JWT.secret,
        { expiresIn: config.JWT.expires }
      );
  
      res.cookie(config.JWT.name, token, {
        maxAge: config.JWT.expires,
        secure: process.env.NODE_ENV === "production" ? true : false
      });
  
      res.status(200).redirect("/");
    }
  );


app.post("/submit",bodyParser.urlencoded({extended:true}),function(request,response){
    const userResponse = request.body;
    console.log(userResponse);
    response.status(200).redirect('/');
});

app.listen(3000);