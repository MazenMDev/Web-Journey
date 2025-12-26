const binaryInput = document.getElementById("binaryInput");
const result = document.getElementById("result");
const convertBtn = document.querySelector("button");

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") convertBtn.click();
});

convertBtn.addEventListener("click", () => {
  convertToD();
});

function convertToD() {
  const input = binaryInput.value.trim();
  console.log(input);
  let mult = input.length - 1;
  let sum = 0;
  for (let i of input) {
    sum += i * Math.pow(2, mult);
    mult--;
  }
  updateValue(sum);
}

function updateValue(value) {
  result.innerHTML = value;
}
