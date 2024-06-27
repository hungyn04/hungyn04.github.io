var scrollx = 0;
var i = 0;
function hScrollStory() {
    const element = document.getElementById("viewContainer");
    const elementFixed = document.getElementById("fAddBttn").style;
    let x = element.scrollLeft;
    if (scrollx !== x) {
        if (x >= 35) {
            elementFixed.setProperty('visibility', 'visible');
        } else {
            elementFixed.setProperty('visibility', 'hidden');
        }
        if (x <= 90) {
            scrollx = x;
            scrollxcheck = (scrollx - 35) * (scrollx >= 35);
            elementFixed.setProperty('--anm', scrollx + 'px');
            elementFixed.setProperty('--anm2', scrollxcheck + 'px');
            elementFixed.setProperty('--anm3', scrollxcheck);
            i = 0;
        } else if (i == 0) {
            scrollx = 90;
            elementFixed.setProperty('--anm', '90px');
            elementFixed.setProperty('--anm2', '55px');
            elementFixed.setProperty('--anm3', '55');
            i = 1;
        }
    }
    requestAnimationFrame(hScrollStory);
}
hScrollStory();