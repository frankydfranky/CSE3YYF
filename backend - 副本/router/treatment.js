const express = require('express')
const router = express.Router()
const knex =require('../config/Database');

const uuid = require('node-uuid');

router.post('/', async (req, res) => {
    let {pid} =req.body;
    let {text} =req.body;
    let date=new Date();
    var result=await knex('treatment').insert({
        "trid":uuid.v4(),
        "pid":pid,
        "text":text,
        "date":date
    }).then(result=>{
       return res.status(200).json({
            "message":"Added Treatment Successfully!",
        })
    }).catch(reason => {
        return res.status(402).json({ "error": true,message:"Add Error."});
    });
});


module.exports = router