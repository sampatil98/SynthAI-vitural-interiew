const express=require("express");
const {openai}=require("./config")
const cors = require('cors');
const app=express();

app.use(express.json());
app.use(cors());


app.post("/submit-ans",async (req,res)=>{
    try {
        const {prompt,studentAnswer}=req.body;
        let data= await callChatGPT(prompt,studentAnswer);
        res.status(200).send({
            isError:false,
            data:data
        });
        
    } catch (error) {
        res.status(401).send({
            isError:true,
            error:error
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
    const data=[{
      question:"What is the purpose of using the EventEmitter class in Node.js?",
      candidatesAnswer:"i dont know"
    },
    {
      question:"What is the difference between Node.js and JavaScript?",
      candidatesAnswer:"nodejs is the runtime invirnment where actual javascript run outside the browser and javascript is the server side scripting language this is the main difference between node.js and javascript"
    },
    {
      question:"What is Node.js and why is it important?",
      candidatesAnswer:"nodeJS is the runtime environment we are the actual JavaScript Run so the importance of node chess is that using not just we can create the server like we can create the complex way the applications"
    }];
    
    
    try {
      let text="";
    data.forEach((ele)=>{
      text+="question :"+`${ele.question}\n`;
      text+="candidatesAnswer :"+`${ele.candidatesAnswer}\n`;
    });
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${text} this is a data wich contains question and the candidatesAnswer analise these data and give feed back about how correctly answers are given by candidate and give feed back for improvement and also give score besed on candidates performance on the scale of 10`,
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




// trail new route

app.get('/study-getQuestion', async (req, res) => {
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `give 1 question with proper answer with explaination on node.js`,
      max_tokens: 3000
    });
    // console.log(response.data);
    const question = response.data.choices[0].text.trim();
    let array=question.trim().split("\n");
    let Q=array[0];
    let A=array.slice(1).join("");
    res.json({"question":Q,"answer":A});
  } catch (error) {
    console.error('Error fetching question:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

















