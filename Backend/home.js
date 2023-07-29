const form=document.getElementById("form");
const btn=document.getElementById("btn");
const output=document.getElementById("container");
const start=document.getElementById("start");
const input=document.getElementById("inputtext");


btn.addEventListener("click",(e)=>{
    e.preventDefault();

    let question=localStorage.getItem("ques");
    const obj={
        prompt:question,
        studentAnswer:form.inputtext.value
    }
    let div1=document.createElement("div");
        div1.setAttribute("class","each-div-ans");

        let ans1=document.createElement("h6");
        ans1.setAttribute("class","ans");
        ans1.innerText=obj.studentAnswer;
        
        div1.append(ans1);
        output.append(div1);
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
        // console.log(question);
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
const speechInput = document.getElementById('inputtext'); // input box where we want to show text
const startButton = document.getElementById('startButton'); // buttom to start voice command
const stopButton = document.getElementById('stopButton'); // button to stop voice command

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
