
var inMemeMode = false;

function memeMode() {
    var body = document.getElementById("body");
    var logo = document.getElementById("logo");
    if (!inMemeMode) {
        body.classList.add("meme-mode");
        logo.src = "MemeLogo.jpeg";
        inMemeMode = true;
    } else {
        body.classList.remove("meme-mode");
        logo.src = "Logo.png";
        inMemeMode = false;
    }
}