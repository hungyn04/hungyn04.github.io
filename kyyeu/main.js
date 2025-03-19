let button = document.querySelectorAll("button");

button.forEach((ib) => {
  ib.addEventListener("touchstart", () => {
    ib.classList.add("pressed");
  });
  ib.addEventListener("touchend", () => {
    ib.classList.remove("pressed");
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
  topBttn.style.display = "none";
  document.documentElement.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
