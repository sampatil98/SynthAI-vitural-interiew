let nextBtn=document.getElementById("nextBtn");
let main=document.getElementById("learn-main");
nextBtn.addEventListener("click",()=>{
    fetch("http://localhost:8080/study-getQuestion")
    .then((res)=>res.json())
    .then((data)=>{
        main.innerHTML=null;
        let container=document.createElement("div")
        let question=document.createElement("h2");
        question.innerText=`Question ${data.question}`
        question.setAttribute("id","question")
        let ans=document.createElement("p");
        ans.innerText=`Answer ${data.answer}`
        ans.setAttribute("id","ans")
        container.append(question,ans);
        main.append(container);
    })
})