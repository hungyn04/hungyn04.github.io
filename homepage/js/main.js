const documentElm = document.documentElement;
let scrolly;

function pushPropToDoc(prop, val) {
  documentElm.style.setProperty(prop, val);
}
function scrollPrg() {
  scrolly = window.scrollY;
  pushPropToDoc("--scroll-progress", scrolly);
  pushPropToDoc("--scroll-progress-px", scrolly + "px");
}
window.onscroll = scrollPrg;

function fadeOut() {
  var doc = document.querySelector("html").style;
  doc.animation = "slide-out 0.3s cubic-bezier(0.94, 0, 0.99, 0.01), fade-out 0.3s 0.05s";
}

function copy() {
  navigator.clipboard.writeText("<empty clipboard>");
}

window.onbeforeunload = fadeOut;
