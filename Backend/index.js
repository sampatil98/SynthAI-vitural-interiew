const express=require("express");
const {openai}=require("./config")
const app=express();
const cors = require('cors')
app.use(express.json());
app.use(cors());


app.post("/submit-ans",async (req,res)=>{
    try {
        const {prompt,studentAnswer}=req.body;
        let data= await callChatGPT(prompt,studentAnswer);
        console.log(data);
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
});

app.get('/getQuestion', async (req, res) => {
    try {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `ask 1 question on nodejs `,
        max_tokens: 3000
      });
  
      const question = response.data.choices[0].text.trim();
      res.json({ question });
    } catch (error) {
      console.error('Error fetching question:', error.message);
      res.status(500).json({ error: 'Server error' });
    }
  });

  app.get('/feed-back', async (req, res) => {
    try {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: ` `,
        max_tokens: 3000
      });
  
      const question = response.data.choices[0].text.trim();
      res.json({ question });
    } catch (error) {
      console.error('Error fetching question:', error.message);
      res.status(500).json({ error: 'Server error' });
    }
  });


async function callChatGPT(text,studentAnswer){
    try {
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `Question:${text}\nStudent Answer: ${studentAnswer}\n compare studentAnswer with actual answer and give proper feedback as Ai responce: \n in next line give score out of 10 based on studentAnswer like technical score obtained score/10`,
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






















