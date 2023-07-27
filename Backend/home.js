const form=document.getElementById("form");
const btn=document.getElementById("btn");
const output=document.getElementById("output");


btn.addEventListener("click",(e)=>{

    e.preventDefault();
    // output.innerHTML=null;
    const obj={
        "prompt":form.prompt.value
    }
    fetch("http://localhost:8080/",{
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
        let h1=document.createElement("p");
        h1.innerText=obj.prompt;
        let h3=document.createElement("h6");
        h3.innerText=data.data
        output.append(h1,h3);
    })
})