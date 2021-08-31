const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.get('/api/quotes/random',(req,res,next)=>{
    const quotesRandom = getRandomElement(quotes);
    res.status(200).json({"quote":quotesRandom});
});

app.get('/api/quotes/',(req,res,next)=>{

    if(!req.query.person)
     res.status(200).json({"quotes":quotes});
     else{
         const filteredArr = quotes.filter(t=>t.person==req.query.person);
         if(filteredArr.length===0){
             res.status(200).send(filteredArr);
         }
         res.status(200).json({"quotes":filteredArr});
     }
});

app.post('/api/quotes',(req,res,next)=>{
    const newPost = req.query;
    quotes.push(newPost);
    res.status(201).json({"quote":newPost});
})

app.listen(PORT);