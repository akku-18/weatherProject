const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}))

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){

  const city = req.body.cityInput ;
  const apid = "f7ca681c3a1225000af2fe45bca9cd0c";
  const units = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q="+ city +"&appid="+ apid +"&units="+ units+"";

  https.get(url, function (response) {
    console.log(response.statusCode);

    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const desc = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imgUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<p> The weather is currently "+ desc +".</p>");
      res.write("<h1> The current temperature in "+ city +" is "+temp+" degree celsius. </h1>");
      res.write("<img src=" + imgUrl + ">");
      res.send()
    });
  });

});



app.listen(3000, function () {
  console.log("Server is running at 3000");
});


