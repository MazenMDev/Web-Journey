const screen = document.querySelector(".screen");
const buttons = document.querySelectorAll(".button, .col div");

let check = false;

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (value === "AC") {
      screen.textContent = ""; // clear screen
      check = false;
    } else if (value === "del") {
      screen.textContent = screen.textContent.slice(0, -1); // delete last char
    } else if (value === "=") {
      try {
        screen.textContent = eval(screen.textContent); // calculate expression
        check = true;
      } catch {
        screen.textContent = "Error";
        check = true;
      }
    } else {
      if (check == true) {
        screen.textContent = value;
        check = false;
      } else {
        screen.textContent += value; // add pressed button
      }
    }
  });
});
