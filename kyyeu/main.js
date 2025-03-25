const EVENT = ["touchstart", "touchend", "mousedown", "mouseup", "mouseover", "scroll"];
let hoveredBttn = (lastBttn = null);
let pressedList = [];
let topBttn = document.getElementById("top");
let lstScrollPos = 0;

checkScrollTopBttn();

EVENT.forEach((act) => {
  document.addEventListener(act, (event) => {
    switch (act) {
      case "touchstart":
      case "mousedown":
        let pressedBttn = event.target.closest("button");
        if (pressedBttn) {
          pressedList.push(pressedBttn);
          pressedBttn.classList.add("pressed");
          onscroll = () => {
            pressedBttn.classList.remove("pressed");
          };
        }
        break;
      case "touchend":
      case "mouseup":
        pressedList.forEach((tg) => {
          tg.classList.remove("pressed");
        });
        pressedList = [];
        if (event.target.closest("#top")) {
          intitT = 0;
          initS = window.scrollY;
          anm = requestAnimationFrame(function _(t) {
            if (intitT == 0) intitT = t;
            dtTs = (t - intitT) / (750 + initS / 60);
            if (window.scrollY > 0) {
              window.scroll(0, initS * Math.pow(2, -10 * dtTs));
              anm = requestAnimationFrame(_);
              onwheel = () => {
                cancelAnimationFrame(anm);
              };
              ontouchstart = () => {
                cancelAnimationFrame(anm);
              };
              ontouchmove = () => {
                cancelAnimationFrame(anm);
              };
            }
          });
        }
      case "mouseover":
        hoveredBttn = event.target.closest("button");
        if (hoveredBttn) {
          hoveredBttn.classList.add("hover");
          lastBttn = hoveredBttn;
        } else if (lastBttn) {
          lastBttn.classList.remove("hover");
          lastBttn = null;
        }
      case "scroll":
        checkScrollTopBttn();
    }
  });
});

function checkScrollTopBttn() {
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

function goto(url) {
  window.open(url, "_blank").focus();
}
