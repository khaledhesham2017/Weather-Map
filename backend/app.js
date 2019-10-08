const express = require("express");
const bodyParser = require("body-parser");
const unirest = require("unirest");
const app = express();
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});
app.get("/api/getWeather", (req, res, next) => {
  let newReq = unirest("GET", "https://community-open-weather-map.p.rapidapi.com/weather");
  let country = req.query.country;
  newReq.query({
    "callback": "test",
    "id": "2172797",
    "units": "\"metric\" or \"imperial\"",
    "mode": "xml, html",
    "q": country
  });
  //"London,uk"
  newReq.headers({
    "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
    "x-rapidapi-key": "40775f6b1amsh3d1b24d8c6ec357p11c108jsnd3b1a102eff7"
  });
  newReq.end(function (newRes) {
    if (newRes.error) throw new Error(newRes.error);
    res.status(200).json(newRes.body
    );
  });

});

module.exports = app;
