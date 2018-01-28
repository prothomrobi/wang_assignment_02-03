fs= require('fs');
express= require('express');
bodyParser = require('body-parser');
app= express();
app.use(bodyParser.json());  

var Validator = require('jsonschema').Validator;
var valid = new Validator();

version=1;

var schemaRead= fs.readFileSync("./schema.txt");
schemaRead = JSON.parse(schemaRead);

app.put('/'+version+'/:sensor', function(req, res){
    var sensor = req.params.sensor;
    var sensorData="";
    var bodyString= JSON.stringify(req.body);  
    var bodyJason= JSON.parse(bodyString);
    var result = valid.validate(bodyJason,schemaRead);
    if(result.errors ==""){
        console.log(bodyJason);
        switch(sensor.toLowerCase()){
            case  "temparature" :{
               
                var data=fs.readFileSync('./db.json')
                var x= JSON.parse(data);
                x.database.push(bodyJason);
                fs.writeFileSync("./db.json",JSON.stringify(x));
                
                break;
            }
            case  "light" :{
                var data=fs.readFileSync('./db.json')
                    var x= JSON.parse(data);
                    x.database.push(bodyJason);
                    fs.writeFileSync("./db.json",JSON.stringify(x));
                  
                  break;
               
               
            }
            case  "sound" :{
                var data=fs.readFileSync('./db.json')
                var x= JSON.parse(data);
                x.database.push(bodyJason);
                fs.writeFileSync("./db.json",JSON.stringify(x));
                  break;
              
            }
        }

    }else{
        console.log(result.errors);
    }
   // console.log(sensor);
    // console.log(JSON.stringify(req.body));  
    // var t= JSON.stringify(req.body);  
    // var m= JSON.parse(t)
    // console.log(m.temp);      // your JSON
    res.end();
    
  });
  
  app.get("/"+version+'/:sensor',function(req,res){
    var sensor = req.params.sensor;
    var id = req.params.id;
    
    data= fs.readFileSync("./db.json");
    data= JSON.parse(data);
    var jsonObject="";
    for(i=0;i<data.database.length;i++){
        if(data.database[i].sensor_name==sensor){
            jsonObject+=JSON.stringify(data.database[i])+"\n";
        }
    }

    // data.datas.find(function(item,i){
    //     if(item.name==sensor){
    //         jsonObject+=JSON.stringify(item)+"\n";
    //     }
    // });

    res.end(jsonObject);

    


});


var server = app.listen(8081, function () {
    
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
    
});