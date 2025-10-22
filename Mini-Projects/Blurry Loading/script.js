const loadText = document.querySelector(".loading-text");
const bg = document.querySelector(".bg");

let load = 0;
let int = setInterval(blurring, 30);
function blurring() {
  load++;
  if (load > 99) clearInterval(int);

  loadText.innerHTML = `${load}%`;
  loadText.style.opacity = scale(load, 0, 100, 1, 0);
  bg.style.filter = `blur(${scale(load, 0, 100, 30, 0)}px)`;
}


//Funcion from stack-overflow that is convert a value from scale to another
//ex: value: 50 // first-scale: 0, 100 // second-scale: 0, 1 so will be 0.5
const scale = (num, in_min, in_max, out_min, out_max) => {
  return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};
