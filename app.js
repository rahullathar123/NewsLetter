const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const request = require("request")
const https = require('https');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'));

app.get("/", function(req,res) {
  res.sendFile(__dirname+"/signup.html")
})

app.post("/failure", function(req, res){
  res.redirect("/")
})

app.post("/", function(req,res){
  const firstNmae = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  const data = {
    members: [
       {
         email_address: email,
         status: "subscribed",
         merge_fields: {
           FNAME: firstNmae,
           LNAME: lastName
         }
       }
    ]
  }

var jsonData  = JSON.stringify(data)
const url = "https://us4.api.mailchimp.com/3.0/lists/fbd99d2342"
const options = {
    method: "POST",
    auth: "Rahul:57b6cd43629d20b159a01d7c1993e472-us4"
}

const request = https.request(url, options, function(response){
    if (response.statusCode == 200){
      res.sendFile(__dirname+ "/success.html")
    } else {
      res.sendFile(__dirname+ "/failure.html")
    }

   response.on("data", function(data){
     console.log(JSON.parse(data))
   })

})

  request.write(jsonData)
  request.end()
})

app.listen(process.env.PORT || 3000, function(){
  console.log("App is listening at port 3000")
})







//API KEY: 57b6cd43629d20b159a01d7c1993e472-us4
//unique id: fbd99d2342
