const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
const port = 4000;
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  const city_input = req.body.cityName;
  const query = `${city_input}`;
  const key = "343a352e723c17b2100e7a1d5fac5291";
  const unit = "metric";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${key}&units=${unit}`;
  axios
    .get(url)
    .then(({ data }) => {
      const temp = data.main.temp;
      const description = data.weather[0].description;
      const city = data.name;
      const image = data.weather[0].icon;
      const imageUrl = `https://openweathermap.org/img/wn/${image}@2x.png`;
      console.log(imageUrl);
      res.write(`<p>The weather is currently ${description} </p>`);
      res.write(
        `<h1>The temperature in ${city} is ${temp}<sup>.</sup>c</h1><img src =${imageUrl} >`
      );

      res.send();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(port, () => {
  console.log("Listening on port " + port);
});
