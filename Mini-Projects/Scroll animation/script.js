const boxes = document.querySelectorAll(".box");

window.addEventListener("scroll", checkBoxes);
checkBoxes();

function checkBoxes() {
  //get the view-height of the screen but make it 80%
  const triggerBottom = window.innerHeight * 0.8;

  boxes.forEach((box) => {
    //get how far the box from the top
    const boxTop = box.getBoundingClientRect().top;

    //if the box far from top is less than the trigger it will show
    if (boxTop < triggerBottom) box.classList.add("show");
    else box.classList.remove("show");
  });
}
