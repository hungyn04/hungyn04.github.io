const EVENT = ["touchstart", "touchend", "mousedown", "mouseup", "mouseover", "scroll", "wheel", "touchmove"];
let hoveredBttn = (lastBttn = null);
let pressedList = [];
let topBttn = document.getElementById("top");
let lstScrollPos = 0;
let anm = null;

checkScrollTopBttn();

EVENT.forEach((act) => {
  window.addEventListener(act, (event) => {
    switch (act) {
      case "touchstart":
      case "touchmove":
        stopAnm();
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
            dtTs = (t - intitT) / (1000 + initS / 10);
            if (window.scrollY > 0) {
              window.scroll(0, initS * (1 - (dtTs < 0.5 ? Math.pow(2, 20 * dtTs - 10) / 2 : (2 - Math.pow(2, -20 * dtTs + 10)) / 2)));
              anm = requestAnimationFrame(_);
            } else {
              anm = null;
            }
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
        break;
      case "scroll":
        checkScrollTopBttn(!anm);
        break;
      case "wheel":
        stopAnm();
    }
  });
});

function stopAnm() {
  cancelAnimationFrame(anm);
  anm = null;
}

function checkScrollTopBttn(controlExtend = true) {
  if (window.scrollY < 100) {
    topBttn.style.opacity = "0";
    topBttn.style.pointerEvents = "none";
  } else {
    topBttn.style.opacity = "1";
    topBttn.style.pointerEvents = "all";
  }
  if (controlExtend) {
    if (lstScrollPos - window.scrollY > 5) {
      topBttn.classList.add("extend");
    }
    if (window.scrollY - lstScrollPos > 5) {
      topBttn.classList.remove("extend");
    }
  }
  lstScrollPos = window.scrollY;
}

function goto(url) {
  window.open(url, "_blank").focus();
}
