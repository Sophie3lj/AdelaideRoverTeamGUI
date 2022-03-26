const testData = {x: 40, y: 10};

const ctx = document.getElementById('myChart');
const myChart = new Chart(ctx, {
    type: 'scatter',
    data: {
    datasets: [{
        label: 'Moisture Level',
        data: [],
        backgroundColor: '#DA5556'
    }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            },
            x: {
            type: 'linear',
            position:'bottom',
            beginAtZero: true
            }
        }
    }
});

x_axis = 0;
var readings = [];

function exportData() {
    var csvContent = '';
    for(i=0; i<readings.length; i++){
        csvContent += readings[i] + "\n";
    }
    filename = 'moistureData.csv';
    csvData = encodeURIComponent(csvContent);

    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + csvData);
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

function addData(chart, d) {
    console.log(d);
    /*newPoint = {x_axis, d};
    x_axis += 0.2;
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(newPoint);
    });
    chart.update();*/
}

function resetChart(chart) {
    chart.data.datasets = [{
        label: 'Moisture Level',
        data: [],
        backgroundColor: '#DA5556'
    }]
    x_axis = 0;
    readings = [];
    chart.update();
}

var recordData = false;

function startSensorSubscriber(){
    console.log("start");
    var dataListener = new ROSLIB.Topic({
        ros: ros,
          name : '/moisture_sensor_state',
        messageType : 'std_msgs/String'
    });

    var message = new ROSLIB.Message({
        data: 'start'
    });
    console.log(message);
    recordData = true;
    dataListener.publish(message);
    console.log("here 2");
}

function stopSensorSubscriber(){
    console.log("here");
    var dataListener = new ROSLIB.Topic({
        ros: ros,
          name : '/moisture_sensor_state',
        messageType : 'std_msgs/String'
    });
    var message = new ROSLIB.Message({
        data: "stop"
    });

    recordData = false;
  
    dataListener.publish(message);
}

function dataMode(mode)
{
    //var stat = document.getElementById("dataStatus");
    
    switch(mode){
        case "on":
            startSensorSubscriber();
            break;
        case "off":
            stopSensorSubscriber();
            break;
    }
}

function pushData(d){
    readings.push(d);
    document.getElementById("payloadOutput").innerHTML = readings;
    console.log("in pushData");
    console.log(d);
    console.log(readings);
    var temp = d;
    //addData(temp);
    newPoint = {x: x_axis, y: d};
    x_axis += 0.2;
    console.log(newPoint);
    myChart.data.datasets.forEach((dataset) => {
        dataset.data.push(newPoint);
    });
    myChart.update();
}

function payloadMode(mode)
{
    var stat = document.getElementById("payloadStatus");

    var payloadMode = new ROSLIB.Topic({
    	ros: ros,
  	    name : '/payload_actuator_state',
    	messageType : 'std_msgs/String'
    });
    
    var message = new ROSLIB.Message({
      data: mode
    });

    payloadMode.publish(message);
    
    switch(mode){
        case "lower":
            //startDrive();
            stat.innerHTML = "Currently in <b>LOWER</b> state";
            break;
        case "stop":
            //startArm();
            stat.innerHTML = "Currently in <b>STOP</b> state";
            break;
        case "raise":
            //startPayload();
            stat.innerHTML = "Currently in <b>RAISE</b> state";
            break;
    }
}

function payloadSubscribe() {
    var payloadListener = new ROSLIB.Topic({
        ros: ros,
        name : '/moisture_sensor_readings',
        messageType : 'std_msgs/Float64'
    });

    //sends true/false
    
    
    payloadListener.subscribe(function(message) {
        if(recordData){
            console.log(message.data);
            pushData(message.data);
        }
    });
}