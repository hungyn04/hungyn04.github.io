let hoveredBttn,
  lastBttn = null;
let pressedList = [];
["touchstart", "touchend", "mousedown", "mouseup", "mouseover"].forEach((act) => {
  document.addEventListener(act, (event) => {
    switch (act) {
      case "touchstart":
      case "mousedown":
        let pressedBttn = event.target.closest("button");
        if (pressedBttn) {
          pressedList.push(pressedBttn);
          pressedBttn.classList.add("pressed");
        }
        break;
      case "touchend":
      case "mouseup":
        pressedList.forEach((tg) => {
          tg.classList.remove("pressed");
        });
        if (event.target.closest("#top")) {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }
        break;
      case "mouseover":
        hoveredBttn = event.target.closest("button");
        if (hoveredBttn) {
          hoveredBttn.classList.add("hover");
          lastBttn = hoveredBttn;
        } else if (lastBttn) {
          lastBttn.classList.remove("hover");
          lastBttn = null;
        }
    }
  });
});

let topBttn = document.getElementById("top");
let lstScrollPos = window.scrollY;
checkScroll();
document.addEventListener("scroll", () => {
  checkScroll();
});

function checkScroll() {
  if (window.scrollY < 100) {
    topBttn.style.visibility = "hidden";
  } else {
    topBttn.style.visibility = "visible";
  }
  if (lstScrollPos - window.scrollY > 5) {
    topBttn.classList.add("extend");
  }
  if (window.scrollY - lstScrollPos > 5) {
    topBttn.classList.remove("extend");
  }
  lstScrollPos = window.scrollY;
}
