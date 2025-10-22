let number = document.getElementById("number");
let counter = 0;
let myInterval = setInterval(() => {
  if (counter == 67) {
    clearInterval(myInterval);
  } else {
    counter++;
    number.innerHTML = counter + "%";
  }
}, 30);
