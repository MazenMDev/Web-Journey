let colors = ["green", "red", "yellow", "blue"];
let gamePattern = [];
let userClickedPattern = [];
function newsequence() {
  let randomnumber = Math.floor(Math.random() * 4);
  let randomChosenColor = colors[randomnumber];
  gamePattern.push(randomChosenColor);
  $("." + randomChosenColor)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
}

newsequence();
$("#btn").on("click", function () {
  userChosenColor = $(this).attr("class");
  userClickedPattern.push(userChosenColor);
});
console.log(userClickedPattern);
