const express = require('express')
const router = express.Router()
const knex =require('../config/Database');
const uuid = require('node-uuid');

router.get('/', async (req, res) => {
    var result=await knex('clinicalstudies').select().where({}).then(clinicalstudies => {return clinicalstudies});
    return res.status(200).json({
        "message":"Clinicalstudies Successfully!",
        "clinicalstudiess_list":result
     });
});

router.post('/', async (req, res) => {
    let {description} =req.body;
    let {studiesname} =req.body;
    var result=await knex('clinicalstudies').insert({
        "cid":uuid.v4(),
        "studiesname":studiesname,
        "description":description
    }).then(result=>{
       return res.status(200).json({
            "message":"Added Clinical Studies Successfully!",
        })
    }).catch(reason => {
        return res.status(402).json({ "error": true,message:"Add Error."});
    });
});


module.exports = router