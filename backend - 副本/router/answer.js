const express = require('express')
const router = express.Router()
const knex =require('../config/Database');

const uuid = require('node-uuid');

router.post('/', async (req, res) => {
    let {pid} =req.body;
    let {question_text} =req.body;
    let {answer_text} =req.body;
    let {notes_text} =req.body;
    let date=new Date();
    var result=await knex('answer').insert({
        "aid":uuid.v4(),
        "question_text":question_text,
        "answer_text":answer_text,
        "pid":pid,
        "notes_text":notes_text,
        "date":date
    }).then(result=>{
       return res.status(200).json({
            "message":"Added Answer Successfully!",
        })
    }).catch(reason => {
        return res.status(402).json({ "error": true,message:"Add Error."});
    });
});


module.exports = router