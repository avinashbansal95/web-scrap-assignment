const request = require("request");
const cheerio = require("cheerio");
const express = require("express");
const app = express();

//Route to return latest stories in json format
app.get("/getTimeStories", (req, res, next) => {
  request("https://time.com/", (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);
      //selecting stories DOM
      const storiesList = $(".latest a");
      //Array for holding latest stories
      let latestStories = [];
      //iterating over stories
      for (let i = 0; i < storiesList.length; i++) {
          //Break if 5 stories are already kept
          if(latestStories.length==5) break;

        //pushing into stories array
        latestStories.push({
          title: storiesList[i].children[0].data,
          link: `https://time.com${storiesList[i].attribs.href}`,
        });
      }
      res.send(JSON.stringify(latestStories));
    } else {
      res.send(error);
    }
  });
});

app.listen(3000, () => {
  console.log("server started at port 3000");
});
