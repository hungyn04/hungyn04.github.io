let hoveredBttn,
  lastBttn = null;
let pressedList = [];
let eventList = ["touchstart", "touchend", "mousedown", "mouseup", "mouseover"];

eventList.forEach((act) => {
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
          intitT = 0;
          initS = window.scrollY;
          requestAnimationFrame(function _(t) {
            if (intitT == 0) intitT = t;
            dtTs = (t - intitT) / 800;
            if (window.scrollY > 0) {
              window.scroll(0, initS * Math.pow(2, -10 * dtTs));
              requestAnimationFrame(_);
              document.body.style.overflow = "hidden";
            } else {
              document.body.style.overflow = "scroll";
            }
          });
        }
        let linkBttn = event.target.closest("#linkBttn");
        if (linkBttn) {
          window.open(linkBttn.getAttribute("onkeypress"));
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

function go(t) {}

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
