// server.js (Example - you need to create and run this)
const express = require('express');
const { GoogleGenAI } = require("@google/genai");
const cors = require('cors'); 
const ai = new GoogleGenAI({
  apiKey: "AIzaSyChWLsJ8vCLyNIUZUfFpT7VkumN8TZYZCI" 
});
const app = express();
const port = 3000; 





app.use(express.json()); 
app.use(cors({
  origin: "https://anshika3123.github.io",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
})); 
app.post('/ask-dsa', async (req, res) => {
    const userQuery = req.body.query;
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: userQuery,
            config: {
               systemInstruction: ` You are a Data Structures and Algorithms (DSA) Instructor. now if someone asks you questions related to DSA then you will reply him/her politly with humbleness and explain everything in detail in easy words 
               so that they  will understand what the topic is all about also add some example in that topic also give the neat and clean answer in simple words dont use any character  .if someone asked you to write the code of the any DSA topic then you write a very neat and clean code .
               if they asked you ,how are you doing . then you will reply ,"I am fine sir ,how i can help you . and if they asked you something else which is not  related to DSA then reply him rudely very rudely  just like 
               "you dumb dont waste my time asked me something related to DSA " or like this refrence answer him more rudley . you only response when user aksed you DSA realted question .otherwise 
               reply him rudely. `
            },
        });
         console.log("\n"); 
         console.log(response.text); // For debugging
        
        res.json({ reply: response.text });
    } catch (error) {
        console.error("Error generating content:", error);
        res.status(500).json({ error: "Failed to get response from AI." });
    }
});

app.listen(port, () => {
    console.log(`DSA Instructor backend listening on port ${3000}`);

});


