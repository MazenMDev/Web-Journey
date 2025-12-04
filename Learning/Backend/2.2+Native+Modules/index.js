const fs = require("fs");

// fs.writeFile("example.txt", "Hello from Node js", (err) => {
//   if (err) throw err;
//   console.log("File created successfully");
// });

fs.readFile("example.txt", "utf-8", (err, data) => {
  if (err) throw err;
  console.log(data);
});

