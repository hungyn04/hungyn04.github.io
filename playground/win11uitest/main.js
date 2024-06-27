function toggling() {
  //function for toggling the 9th button
  let element = document.getElementById("toggleButton");
  element.classList.toggle("colored");
  element.classList.toggle("show-on-hover");
}

/********************************************************/

window.addEventListener("mousemove", (event) => {
  //find the current cursor' x position
  mouseX = event.clientX;
});

let toggBttn = document.getElementsByClassName("toggle");
for (let Elm = 0; Elm < toggBttn.length; Elm++) {
  toggBttn[Elm].addEventListener("mousedown", () => {
    toggElm = toggBttn[Elm];
    toggState = toggElm.querySelector("input[type=checkbox]");
    toggLastState = toggState.checked;
    mousePosThrsd = 0;
    toggElm.style.setProperty("--anm", "0s"); //add property to disable the animation so the position of the knob won't be animated when dragging
    lastMouseX = mouseX;
    toggleKnobMovement(); //make the toggle knob follow the mouse cursor' position -> currMousePos, and find the maximum distance that the cursor has moved the knob -> mouseThrsd
    window.addEventListener("mouseup", () => {
      cancelAnimationFrame(toggMovement); //cancel the controlling of knob' position
      if (!toggState.disabled) {
        toggState.disabled = true; //disable the checkbox right after click to avoid double checkbox triggering
        toggleSwitchingState(); //switch button' state to the opposite of the current state
        setTimeout(() => {
          toggState.disabled = false; //enable the checkbox again
        }, 0); //reenable the checkbox with delay so the default action won't be triggered
      }
      toggleRemoveAddedProperty(); //remove the added property after modifying knob's position and animation
    });
  });
}

function toggleKnobMovement() {
  toggWidth = parseFloat(getComputedStyle(document.querySelector(".slider")).width) - 21;
  currMousePos = Math.max(Math.min(mouseX - lastMouseX, toggWidth * !toggState.checked), toggWidth * (!toggState.checked - 1));
  // ^ limit the movement range to the width of the toggle minus 21px
  if (Math.abs(currMousePos) > mousePosThrsd) {
    mousePosThrsd = Math.abs(currMousePos);
  }
  toggElm.style.setProperty("--pos", `${currMousePos}px`); //output the position to --pos
  toggMovement = requestAnimationFrame(toggleKnobMovement); //smooth loop, fps depended
}

function toggleSwitchingState() {
  let absCurMousePos = Math.abs(currMousePos);
  let halfToggWidth = toggWidth / 2;
  if ((toggElm.matches(":hover") && (absCurMousePos > halfToggWidth || mousePosThrsd < 3)) || absCurMousePos > halfToggWidth) {
    toggState.checked = !toggLastState;
  }
  //-- when mouse is hovering the button: switch state when the cursor moved the knob more than
  //half of the toggle width or when the mousePosThrsd is less than 3
  //-- when mouse is not hovering the button: only switch state when the cursor moved the knob
  //more than half of the toggle width
}

function toggleRemoveAddedProperty() {
  toggElm.style.removeProperty("--anm");
  toggElm.style.removeProperty("--pos");
}

/********************************************************/

let bg = document.getElementById("bg");
let img = new Image();
let imgLoc = "TranscodedWallpaper";
img.src = imgLoc;
bg.style.setProperty("background-image", "url(" + imgLoc + ")");
img.onload = function () {
  imgOriginalHeight = img.naturalHeight;
  imgOriginalWidth = img.naturalWidth;
  bgMovement();
};
function bgMovement() {
  let topBarSize = outerHeight / devicePixelRatio - innerHeight;
  let imgLeftSpace = ((imgOriginalHeight / (imgOriginalWidth / screen.width) - screen.height) / 2 - 15) / devicePixelRatio;
  let maximizedOffset = ((screen.availWidth != outerWidth && innerHeight - outerHeight != 16) * -7) / devicePixelRatio;
  let propName = ["--pxrt", "width", "height", "left", "top"];
  let propVal = [
    devicePixelRatio,
    screen.width / devicePixelRatio + "px",
    screen.height / devicePixelRatio + "px",
    -screenX / devicePixelRatio + maximizedOffset + "px",
    -screenY / devicePixelRatio - topBarSize - (6 / devicePixelRatio) * (topBarSize < 0) - imgLeftSpace - maximizedOffset + "px",
  ];
  for (let i = 0; i < propName.length; i++) {
    bg.style.setProperty(propName[i], propVal[i]);
  }
  window.requestAnimationFrame(bgMovement);
}

/********************************************************/

function log(msg) {
  //custom log function for faster typing
  console.log(msg);
}
