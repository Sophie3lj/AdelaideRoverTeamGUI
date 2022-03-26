
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
    
    var controlMode = new ROSLIB.Topic({
    	ros: ros,
  	name : '/controller_mode',
    	messageType : 'std_msgs/String'
    });
    
    var message = new ROSLIB.Message({
      data: mode
    });

    controlMode.publish(message);
    
    switch(mode){
        case "drive":
            //startDrive();
            stat.innerHTML = "Currently in <b>DRIVE<b> state";
            break;
        case "arm":
            //startArm();
            stat.innerHTML = "Currently in <b>ARM</b> state";
            break;
        case "payload":
            //startPayload();
            stat.innerHTML = "Currently in <b>PAYLOAD</b> state";
            break;
    }
}


function driveMode(mode)
{
    var stat = document.getElementById("driveStatus");

    
    var driveMode = new ROSLIB.Topic({
    	ros: ros,
  	name : '/drive_system_mode',
    	messageType : 'std_msgs/String'
    });
    
    var message = new ROSLIB.Message({
      data: mode
    });

    driveMode.publish(message);
    
    switch(mode){
        case "straight":
            //startDrive();
            stat.innerHTML = "Currently in <b>STRAIGHT</b> state";
            break;
        case "arc":
            //startArm();
            stat.innerHTML = "Currently in <b>ARC</b> state";
            break;
        case "rotate":
            //startPayload();
            stat.innerHTML = "Currently in <b>ROTATE</b> state";
            break;
    }
}

function initialiseRos() {
	payloadSubscribe()
}
 /*
function payloadSubscribe() {
  var payloadListener = new ROSLIB.Topic({
    ros: ros,
    name : '/probe_readings',
    messageType : 'std_msgs/String'
  });

  payloadListener.subscribe(function(message) {
    document.getElementById("payloadOutput").innerHTML = message.data;
  });
}*/
