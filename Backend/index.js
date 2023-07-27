const express=require("express");
const {openai}=require("./config")
const app=express();
const cors = require('cors')
app.use(express.json());
app.use(cors());


app.post("/",async (req,res)=>{
    try {
        const {prompt}=req.body
        let data= await callChatGPT(prompt);

        res.status(200).send({
            isError:false,
            data:data
        });
        
    } catch (error) {
        res.status(401).send({
            isError:true,
            error:"internal server error"
        });
    }
})


async function callChatGPT(text){
    try {
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: text,
            max_tokens: 3000
        })
        return (completion.data.choices[0].text);
    }catch (e) {
        return e
    }
    
}


app.listen(8080,async()=>{
    try {
        console.log("server is running");
    } catch (error) {
        console.log(error);
    }
})






















