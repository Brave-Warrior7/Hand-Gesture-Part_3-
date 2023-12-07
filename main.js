Webcam.set({
  width:350,
  height:300,
  image_format: 'png',
  png_quality:90
});

Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function (data_uri){
      document.getElementById("selfie_result").innerHTML= '<img id=captured_image width="350" height="266" src="'+data_uri+'"/>';
    });
}

console.log("ml5 version:", ml5.version);


classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/YBUu0mu08/model.json', modelLoaded);

function modelLoaded(){
    console.log("model Loaded")
}


function speak(){
  var synth=window.speechSynthesis;
  speak_data_1= "The prediction is"+ prediction_1;
  var utterThis= new SpeechSynthesisUtterance(speak_data_1);
  synth.speak(utterThis); 

}

function predict_selfie(){
  img =document.getElementById("captured_image");
  classifier.classify(img, gotResult); 
}

function gotResult(error, results){
  if(error){
      console.log(error);
  }
  else{
      console.log(results); 
      document.getElementById("prediction_result").innerHTML=results[0].label;
      prediction_1=results[0].label;
      speak();

      if(results[0].label=="like"){
          document.getElementById("prediction_emoji").innerHTML="&#128077;";
      }
      if(results[0].label=="amazing"){
          document.getElementById("prediction_emoji").innerHTML="&#128076;";
      }
      if(results[0].label=="victory"){
          document.getElementById("prediction_emoji").innerHTML="&#9996;";
      }
  }
}