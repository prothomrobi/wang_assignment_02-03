
var request = require("request");
const mraa = require('mraa');

var analogPin0 = new mraa.Aio(0);
var analogPin1 = new mraa.Aio(1);
var analogPin2 = new mraa.Aio(2);

function sensorValueRead(sensorName){

    if(sensorName=="temparature"){
        var analogValue = analogPin0.read(); 
        var analogValueFloat = analogPin0.readFloat();
        
        return Math.round( analogValueFloat * 1e2 ) / 1e2;
    }
    if(sensorName=="sound"){
        var analogValue = analogPin1.read(); 
        var analogValueFloat = analogPin1.readFloat();
        return Math.round( analogValueFloat * 1e2 ) / 1e2;
    }
    if(sensorName=="light"){
        var analogValue = analogPin2.read(); 
        var analogValueFloat = analogPin2.readFloat();
        return Math.round( analogValueFloat * 1e2 ) / 1e2;
    }
}

var  rowCount=1;

var json=  {
	
	id: 0,
    sensor_name: "",
    sensor_value: 0,
    timestamp: ""
    
}

function dataSendToServer(sensorName){
    json.id=rowCount++;
    json.sensor_name=sensorName;
    json.sensor_value= sensorValueRead(sensorName);
    json.timestamp = new Date();
    request({
        method: "PUT",
        url: "http://192.168.4.58:8081/1/"+sensorName,
        json:true,
        headers: {
            "content-type" : "application/json",
        },
        body: json
    
    
    },function(err,res,body){
        
    });
}


setInterval(function(){
    dataSendToServer('temparature');
},5000);
setInterval(function(){
    dataSendToServer('light');
},5000);
setInterval(function(){
    dataSendToServer('sound');
},5000);