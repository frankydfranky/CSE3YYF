const express = require('express')
const router = express.Router()
const knex =require('../config/Database');
const uuid = require('node-uuid');


router.get('/', async (req, res) => {
    var result=await knex('managestudies').select().where({}).then(managestudies => {return managestudies});
    var managestudies=[];
    for(var i=0;i<result.length;i++){
        var clinicalstudies=await knex('clinicalstudies').select().where({cid:result[i].cid}).then(clinicalstudies => {return clinicalstudies[0]});
        var patient=await knex('patient').select().where({pid:result[i].pid}).then(patient => {return patient[0]});
        managestudies.push({
            ...result[i],
            "clinicalstudies":clinicalstudies,
            "patient":patient
        })
    };
    return res.status(200).json({
        "message":"Managestudies Successfully!",
        "managestudies_list":managestudies
     });
});

router.post('/find', async (req, res) => {
    let {cid} =req.body;
    var managestudies=await knex('managestudies').select().where({cid:cid}).then(clinicalstudies => {return clinicalstudies});
    var now_list=[];
    for(var i=0;i<managestudies.length;i++){
        var patient=await knex('patient').select().where({pid:managestudies[i].pid}).then(patient => {return patient[0]});
        now_list.push({
            ...managestudies[i],
            "patient":patient
        });
    }
    return res.status(200).json({
        "message":"Find Successfully!",
        "now_list":now_list
     });

})


router.post('/', async (req, res) => {
    let {pid} =req.body;
    let {cid} =req.body;
    let {date} =req.body;
    var result=await knex('managestudies').insert({
        "cid":cid,
        "pid":pid,
        "date":date
    }).then(result=>{
       return res.status(200).json({
            "message":"Added manage studies Successfully!",
        })
    }).catch(reason => {
        return res.status(402).json({ "error": true,message:"This patient has been added to the current study, please do not add again!"});
    });
});

router.delete('/', async (req, res) => {
    let {pid} =req.body;
    let {cid} =req.body;
    var result=await knex('managestudies').delete().where({
        "cid":cid,
        "pid":pid
    }).then(result=>{
       return res.status(200).json({
            "message":"Delete manage studies Successfully!",
        })
    }).catch(reason => {
        return res.status(402).json({ "error": true,message:"This patient has been added to the current study, please do not add again!"});
    });
});

module.exports = router