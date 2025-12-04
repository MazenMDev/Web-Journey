import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

inquirer
  .prompt([
    {
      type: "input",
      name: "text",
      message: "Enter the URL",
    },
  ])
  .then((answers) => {
    const url = answers.text;
    const qrCode = qr.image(url);
    qrCode.pipe(fs.createWriteStream("QR_Code.png"));
    fs.writeFile("URL.txt", url, (err) => {
      if (err) throw err;
      console.log("The file have been saved!");
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log("Sorry, the prompt can't be shown in this environment.");
    } else {
      console.error("Something went wrong:", error);
    }
  });
