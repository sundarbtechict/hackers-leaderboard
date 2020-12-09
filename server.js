const express = require("express");

const app = express();

app.use(express.static("./dist/leaderboard-app"));

app.get("/*", (req, res) =>
  res.sendFile("index.html", { root: "dist/leaderboard-app/" })
);

app.listen(process.env.PORT || 8080);
