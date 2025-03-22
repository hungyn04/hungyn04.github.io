let button = document.querySelectorAll("button");
let btPress = (elm) => elm.classList.add("pressed");
let btRelease = (elm) => elm.classList.remove("pressed");

button.forEach((ib) => {
  ib.addEventListener("touchstart", () => {
    btPress(ib);
  });
  ib.addEventListener("touchend", () => {
    btRelease(ib);
  });
});

let topBttn = document.getElementById("top");
let lstScrollPos = window.scrollY;
document.addEventListener("scroll", () => {
  if (window.scrollY < 100) {
    topBttn.style.display = "none";
  } else {
    topBttn.style.display = "block";
  }
  if (lstScrollPos - window.scrollY > 5) {
    topBttn.classList.add("extend");
  }
  if (window.scrollY - lstScrollPos > 5) {
    topBttn.classList.remove("extend");
  }
  lstScrollPos = window.scrollY;
});

topBttn.addEventListener("click", () => {
  document.documentElement.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
