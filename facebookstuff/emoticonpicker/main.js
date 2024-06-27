const likeButton = document.querySelector("#likeButton");
const emoticonPicker = document.querySelector("#pckrCtner");
//let emoticonNumber = 7;

function setPickerWidth() {
    emoticonNumber = document.getElementsByClassName("emoticon").length;
    //emoticonPicker.style.setProperty('--height', 2 * emoticonNumber + "px");
    emoticonPicker.style.width = 59 * emoticonNumber + "px";
}
setPickerWidth();

/*function appear(status) {
    emoticonPicker.style.opacity = status;
}
likeButton.addEventListener("mouseover", () => {
    setTimeout(() => {
        appear(1);
    }, 500);
});
likeButton.addEventListener("mouseout", () => {
    appear(0);
});*/