const express = require('express')
const router = express.Router()
const knex =require('../config/Database');
const uuid = require('node-uuid');

router.post('/', async (req, res) => {
    let {organizationname} =req.body;
    let {description} =req.body;
    var result=await knex('trialorganization').insert({
        "tid":uuid.v4(),
        "organizationname":organizationname,
        "description":description
    }).then(result=>{
       return res.status(200).json({
            "message":"Added Trial Organization Successfully!",
        })
    }).catch(reason => {
        return res.status(402).json({ "error": true,message:"Add Error."});
    });
});

router.get('/', async (req, res) => {
    var result=await knex('trialorganization').select().where({}).then(clinicalstudies => {return clinicalstudies});
    return res.status(200).json({
        "message":"Clinicalstudies Successfully!",
        "trialorganization_list":result
     });
});

module.exports = router