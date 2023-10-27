const express = require('express')
const router = express.Router()
const knex =require('../config/Database');
const uuid = require('node-uuid');

router.get('/', async (req, res) => {
    var result=await knex('patient').select().where({}).then(patients => {return patients});
    return res.status(200).json({
        "message":"Patient Successfully!",
        "patient_list":result
     });
});

router.post('/', async (req, res) => {
    let {gender} =req.body;
    let {patientname} =req.body;
    let {age} =req.body;
    var result=await knex('patient').insert({
        "pid":uuid.v4(),
        "gender":gender,
        "name":patientname,
        "age":age
    }).then(result=>{
       return res.status(200).json({
            "message":"Added patient successfully",
        })
    }).catch(reason => {
        return res.status(402).json({ "error": true,message:"Add Error."});
    });
});

router.post('/findName', async (req, res) => {
    let {search_text} =req.body;
    var result=await knex('patient').select().where({name:search_text}).then(patients => {return patients[0]});
    var now_patient={};
    if(result){
        var answer=await knex('answer').select().where({pid:result.pid}).then(answer => {return answer});
        var treatment=await knex('treatment').select().where({pid:result.pid}).then(treatment => {return treatment});
        var observations=await knex('observations').select().where({pid:result.pid}).then(observations => {return observations});
        var managestudies=await knex('managestudies').select().where({pid:result.pid}).then(managestudies => {return managestudies});
        var managestudies_list=[];
        for(var i=0;i<managestudies.length;i++){
            var clinicalstudies=await  knex('clinicalstudies').select().where({cid:managestudies[i].cid}).then(clinicalstudies => {return clinicalstudies[0]});
            managestudies_list.push({
                ...managestudies[i],
                "clinicalstudies":clinicalstudies
            })
        }
        now_patient={
            ...result,
            "answer_list":answer,
            "treatment_list":treatment,
            "observations_list":observations,
            "managestudies_list":managestudies_list
        }
    }
    return res.status(200).json({
        "message":"Patient Successfully!",
        "now_patient":now_patient
     });
});




module.exports = router