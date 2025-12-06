import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/submit", (req, res) => {
  console.log(req.body);
  res.send(
    `<h1>Your Band name is:</h1> <h2>${req.body.street} ${req.body.pet}</h2>`
  );
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
