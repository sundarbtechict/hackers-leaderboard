const express = require("express");

const app = express();

app.use(express.static("./dist/leaderboardApp"));

app.get("/*", (req, res) =>
  res.sendFile("index.html", { root: "dist/leaderboardApp/" })
);

app.listen(process.env.PORT || 8080);
