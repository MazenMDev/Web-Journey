import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.urlencoded({ extended: true }));

function checkSecret(req, res, next) {
  const secret = req.body.password;
  if (secret === "ILoveProgramming") {
    next();
  } else {
    res.send("<h1>Wrong Password!</h1>");
  }
}

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

app.post("/check", checkSecret, (req, res) => {
  res.sendFile(`${__dirname}/public/secret.html`);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
