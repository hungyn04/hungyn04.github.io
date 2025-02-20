let doc = document.getElementById("snowContainer");
function createSnow() {
  let elm = document.createElement("div");
  elm.className = "snow-flake";
  elm.style.marginLeft = Math.random() * 100 + "%";
  doc.append(elm);
  setTimeout(() => {
    elm.remove();
  }, 10000);
}

let a = setInterval(() => {
  createSnow();
}, (Math.random() + 1) * 250);
