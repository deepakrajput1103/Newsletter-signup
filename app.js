const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require('https');
const app = express();

//jab hume privat  file ko public karna ho toh hum static ka use karte h //
app.use(express.static("public"));
//jab body parser use krte h //
app.use(bodyParser.urlencoded({extended:true}));
// jo user ne box me likha use check krne ke liye body parser or post request use hoti h //
app.post("/",function(req,res){
    const firstName = req.body.fName;
     const lastName = req.body.lName;
     const mail = req.body.email;
    //  console.log(firstName,lastName,mail);
     const data = {
        members:[
            {
            email_address: mail,
            status:"subscribed",
            merge_fields:{
                FNAME : firstName,
                LNAME : lastName
            },
        }
       ]
     };
     const jsonData = JSON.stringify(data);
     const url = "https://us8.api.mailchimp.com/3.0/lists/7309d146a8";

     const options={
        method : "POST",
        auth : "deepak1:075124bd85c8e022c3f7411c2c735509-us8"
     }
     const request = https.request(url, options, function (response) {
        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }
        else{
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data", function (data) {
         console.log(JSON.parse(data)); 
        });
        
     });
     request.write(jsonData);
     request.end();
});
app.get("/",function(req, res){ 
    res.sendFile(__dirname + "/signup.html");
});

app.post("/failure",function(req,res){
    res.redirect("/");
})

app.listen(process.env.PORT,function(){
    console.log("Server is running at port 1200");
});

// const express = require("express");
// const bodyParser = require("body-parser");
// const https = require('https');
// const app = express();

// app.use(express.static("public"));
// app.use(bodyParser.urlencoded({ extended: true }));

// app.post("/", function(req, res) {
//     const firstName = req.body.fName;
//     const lastName = req.body.lName;
//     const mail = req.body.email;

//     const data = {
//         members: [
//             {
//                 email_address: mail,
//                 status: "subscribed",
//                 merge_fields: {
//                     FNAME: firstName,
//                     LNAME: lastName
//                 }
//             }
//         ]
//     };

//     const jsonData = JSON.stringify(data);
//     const url = "https://us8.api.mailchimp.com/3.0/lists/7309d146a8/members"; // Corrected Mailchimp API endpoint URL

//     const options = {
//         method: "POST",
//         auth: "deepak1:075124bd85c8e022c3f7411c2c735509-us8"
//     };

//     const request = https.request(url, options, function(response) {
//         let chunks = '';

//         response.on("data", function(chunk) {
//             chunks += chunk;
//         });

//         response.on("end", function() {
//             const responseData = JSON.parse(chunks);
//             console.log(responseData);
//         });
//     });

//     request.write(jsonData);
//     request.end();
// });

// app.get("/", function(req, res) {
//     res.sendFile(__dirname + "/signup.html");
// });

// app.listen(1200, function() {
//     console.log("Server is running at port 1200");
// });


//API KEY
//075124bd85c8e022c3f7411c2c735509-us8
//AudienceID:7309d146a8