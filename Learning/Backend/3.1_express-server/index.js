import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello world");
});
app.get("/about", (req, res) => {
  res.send("<h1>About us<h1>");
});
app.get("/contact", (req, res) => {
  res.send("<h3>Don't Contact Us<h3>");
  });

app.listen(port, () => {
  console.log("Server running on port 3000");
});
