function load() {
  let number = Math.random();
  number = Math.floor(number * 6) + 1;
  document.querySelector(".first").src = `./images/dice${number}.png`;
  let num = Math.random();
  num = Math.floor(num * 6) + 1;
  document.querySelector(".second").src = `./images/dice${num}.png`;
  if (number > num) {
    document.querySelector("h1").innerHTML = "Player 1 Won";
  } else if (number < num)
    document.querySelector("h1").innerHTML = "Player 2 Won";
  else if (number == num) document.querySelector("h1").innerHTML = "Draw";
}
const button = document.getElementById("myButton");
button.onclick = load;
