
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

setInterval(rfidSubscribe, 5000);

function rfidSubscribe() {
  console.log("subscribe rfid");

  var rfidListener = new new ROSLIB.Topic({
    ros: ros,
    name : '/...',
    messageType : 'std_msgs/String'
  });

  rfidListener.subscribe(function(message) {
    document.getElementById("rfidOutput").innerHTML = message.data;
    rfidListener.unsubscribe();
  });
}

function rfidPublish() {
  console.log("publish rfid");

  var rfidMessage = new new ROSLIB.Topic({
    ros: ros,
    name : '/rfid_new_message',
    messageType : 'std_msgs/String'
  });

  var rfidBlock = new new ROSLIB.Topic({
    ros: ros,
    name : '/rfid_block',
    messageType : 'std_msgs/Int8'
  });

  var rfidString = new ROSLIB.Message({
    data: document.getElementById("rfidString").value
  });

  var rfidInt = new ROSLIB.Message({
    data: document.getElementById("rfidInt").value
  });

  rfidMessage.publish(rfidString);
  rfidBlock.publish(rfidInt);
}