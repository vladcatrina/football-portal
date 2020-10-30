const express = require("express");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(express.urlencoded());

const getRoutes = [
  require("./routes/index"),
  require("./routes/competition"),
  require("./routes/match"),
  require("./routes/team"),
  require("./routes/player"),
  require("./routes/forum"),
  require("./routes/discussion"),
];

const postRoutes = [
  require("./routes/addcomment")
];

getRoutes.forEach(({ url, callback }) => {
  app.get(url, callback);
});

postRoutes.forEach(({ url, callback }) => {
  app.post(url, callback);
});

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
