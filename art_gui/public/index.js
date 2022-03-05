
var inMemeMode = false;

function memeMode() {
    var body = document.getElementById("body");
    var logo = document.getElementById("logo");
    if (!inMemeMode){
        body.classList.add("meme-mode");
        logo.src = "MemeLogo.jpeg";
        document.getElementById("memes").innerHTML = '<h2><button class="pure-button button-autonomous" onclick="memeMode()">Im Feeling Boring</button></h2>';
        inMemeMode = true;
    } else {
        body.classList.remove("meme-mode");
        logo.src = "Logo.png";
        document.getElementById("memes").innerHTML = '<h2><button class="pure-button button-autonomous" onclick="memeMode()">Im Feeling Lucky</button></h2>';
        inMemeMode = false;
    }
}

function controllerMode(mode)
{
    var stat = document.getElementById("controllerStatus");
    switch(mode){
        case "drive":
            //startDrive();
            stat.innerHTML = "Currently in <b>Drive<b> state";
            break;
        case "arm":
            //startArm();
            stat.innerHTML = "Currently in <b>Arm</b> state";
            break;
        case "payload":
            //startPayload();
            stat.innerHTML = "Currently in <b>Payload</b> state";
            break;
    }
}