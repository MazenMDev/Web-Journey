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
    const text = answers.text;
    const qrCode = qr.imageSync(text, { type: "svg" });
    fs.writeFileSync("my_qr_code.svg", qrCode);
    console.log("qr code generated");
  });
