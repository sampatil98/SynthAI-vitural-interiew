// const { application } = require("express");

const form=document.getElementById("form");
const btn=document.getElementById("btn");
const output=document.getElementById("container");
const start=document.getElementById("start");
const end=document.getElementById("end")
const input=document.getElementById("inputtext");

let count=0;
let sum=0



end.addEventListener("click",()=>{
    console.log("end")
    let score=JSON.parse(localStorage.getItem("score"))
    let avg=score.sum/score.count
    
    let obj={
      avgScore:avg
    }
    fetch("http://localhost:8080/feed-back",{
      method:"POST",
      headers:{
        "content-type":"application/json"

      },
      body:JSON.stringify(obj)

    })
    .then((res)=>res.json())
    .then((data)=>{
      output.innerText=`You have Completed Your Interview \n Total Question Attempted ${score.count} \n Your Average Score is:- ${avg.toFixed(2)} \n FEEDBACK:-\n
      ${data.question} `
    })

    sum=0;
    count=0;
    localStorage.clear();
})
btn.addEventListener("click",(e)=>{
    e.preventDefault();

    // output.innerHTML=null;
    let question=localStorage.getItem("ques");
    const obj={
        prompt:question,
        studentAnswer:form.inputtext.value
    }
    document.dataform.reset();
    fetch("http://localhost:8080/submit-ans",{
        method:"POST",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify(obj)
    })
    .then((res)=>{
        return res.json();
    })
    .then((data)=>{
        let div=document.createElement("div");
        div.setAttribute("class","each-div");

        let ans=document.createElement("h6");
        ans.setAttribute("class","ans");
        ans.innerText=data.data;
        
        div.append(ans);
        output.append(div);
        getQquestion();
        let regex=/Score: (\d+)\/10/;
        let feedbackScore=data.data.match(regex);
        if (feedbackScore) {
            const score = parseInt(feedbackScore[1]);
            sum = sum + score;
            count = count + 1;
            let scoreData={sum:sum,count:count}
            localStorage.setItem("score",JSON.stringify(scoreData))
            console.log("Avg score", sum / count);
           
          } else {
            console.log("Score pattern not found in the data.");
          }
    })
});

start.addEventListener("click",()=>{

    getQquestion();
});


function getQquestion(){
  
    fetch("http://localhost:8080/getQuestion")
    .then((res)=>{
        return res.json();
    })
    .then((data)=>{
        // let question=JSON.stringify(data);
        console.log(data);
        localStorage.setItem("ques",data.question);
       let div=document.createElement("div");
        div.setAttribute("class","each-div");
        let image=document.createElement("img");
        image.setAttribute("class","logo");
        image.src="https://looka.com/s/139260762"
        let q=document.createElement("p");
        q.setAttribute("class","question");
        q.innerText=data.question;

        div.append(q);
        output.append(div);
       
    })
}

// speact to text

// script.js
const speechInput = document.getElementById('inputtext');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');

let recognition;

if ('webkitSpeechRecognition' in window) {
  // Create the speech recognition object
  recognition = new webkitSpeechRecognition();
  recognition.continuous = true;

  // Handle speech recognition result
  recognition.onresult = (event) => {
    const transcript = event.results[event.results.length - 1][0].transcript;
    speechInput.value = transcript;
  };

  // Handle speech recognition error
  recognition.onerror = (event) => {
    console.error('Speech recognition error:', event.error);
  };
} else {
  console.error('Speech recognition is not supported in this browser.');
}

startButton.addEventListener('click', () => {
  if (recognition) {
    recognition.start();
    startButton.disabled = true;
    stopButton.disabled = false;
  }
});

stopButton.addEventListener('click', () => {
  if (recognition) {
    recognition.stop();
    startButton.disabled = false;
    stopButton.disabled = true;
  }
});