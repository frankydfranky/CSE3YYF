const express = require('express')
const router = express.Router()
const knex =require('../config/Database');


router.post('/login', async (req, res) => {
    let {username} =req.body;
    let {password} =req.body; 
    if(username&&password){
        var result=await knex('users').select().where({username:username}).then(users => {return users[0]});
        if(!result){
            return res.status(401).json({ "error": true,message:"The username is faill."});
        }
        if(result.password==password){
            return res.status(200).json({
               "message":"Login Successfully!",
               "user":result
            });
        }else{
            return res.status(401).json({ "error": true,message:"Password mistake."});
        }
    }else{
        res.status(400).json({ "error": true,"message": "Request body incomplete, both username and password are required."});
    }
});

router.post('/updateTime', async (req, res) => {
    let {total1,duration1,total2,duration2,total3,duration3
       ,total4,duration4,total5,duration5,total6,duration6
       ,total7,duration7,total8,duration8,total9,duration9
       ,total10,duration10,uid} =req.body;
    var result=await knex('time').update({
        "week1_sum":total1,
        "week1_unhealthy":duration1,
        "week2_sum":total2,
        "week2_unhealthy":duration2,
        "week3_sum":total3,
        "week3_unhealthy":duration3,
        "week4_sum":total4,
        "week4_unhealthy":duration4,
        "week5_sum":total5,
        "week5_unhealthy":duration5,
        "week6_sum":total6,  
        "week6_unhealthy":duration6,  
        "week7_sum":total7,  
        "week7_unhealthy":duration7,  
        "week8_sum":total8,
        "week8_unhealthy":duration8,
        "week9_sum": total9, 
        "week9_unhealthy":  duration9,
        "week10_sum":  total10,
        "week10_unhealthy":duration10,
    }).where({uid:uid}).then(users => {
        return res.status(200).json({
            "message":"Update User Time Successfully!",
         });
    }).catch(reason => {
        return res.status(402).json({ "error": true,message:"Update Time mistake."});
    });
});

router.get('/:id', async (req, res) => {
    let {id} =req.params;
    var result=await knex('users').select().where({id:id}).then(users => {return users[0]});
    var message=await knex('user_message').select().where({uid:id}).then(users => {return users[0]});

    result={
        ...result,
        message
    }
    return res.status(200).json({
        "result":result,
    });
});

router.get('/firend/:id', async (req, res) => {
    let {id} =req.params;
    var result=await knex('users').select().where({}).then(users => {return users});
    var result_list=[];
    var now_result_list=[];
    var return_result_list=[];
    result.forEach(item=>{
        if(item.id!=id){
            result_list.push(item);
        }
    });
    var friends=await knex('friends').select().where({uid1:id}).orWhere({uid2:id}).then(friends => {return friends});
    var friends_list=[];
    friends.forEach(item=>{
        if(item.uid1==id){
            friends_list.push({
                "uid":item.uid2,
                "fid":item.fid,
            });
        }else if(item.uid2==id){
            friends_list.push({
                "uid":item.uid1,
                "fid":item.fid,
            });
        }
    });
    for(var i=0;i<result_list.length;i++){
        var message=await knex('user_message').select().where({uid:result_list[i].id}).then(users => {return users[0]});
        var bl=false;
        var fid=0;
        friends_list.forEach(item=>{
            if(item.uid==result_list[i].id){
                bl=true;
                fid=item.fid;
            }
        });
        var result={
            ...result_list[i],
            message,
            "bl":bl,
            "fid":fid
        };
        now_result_list.push(result);
    }    
    
    return res.status(200).json({
        "result_list":now_result_list,
    });
});

router.post('/firend', async (req, res) => {
    let {uid1} =req.body;
    let {uid2} =req.body;
    var result=await knex('friends').insert({
        "uid1":uid1,
        "uid2":uid2
    }).then(result=>{
       return res.status(200).json({
            "message":"Added friend successfully",
        })
    }).catch(reason => {
        return res.status(402).json({ "error": true,message:"Add Error."});
    });
});

router.delete('/firend', async (req, res) => {
    let {fid} =req.body;
    var result=await knex('friends').delete().where({
        "fid":fid
    }).then(result=>{
       return res.status(200).json({
            "message":"Delete friend successfully",
        })
    }).catch(reason => {
        return res.status(402).json({ "error": true,message:"Delete Error."});
    });
});


router.post('/time', async (req, res) => {
    let {uid} =req.body;
    var result=await knex('time').select().where({uid:uid}).then(users => {return users[0]});
    var time_list=await knex('time').select().where({}).then(times => {return times});
    var week1_sum=0;var week2_sum=0;var week3_sum=0;var week4_sum=0;var week5_sum=0;
    var week6_sum=0;var week7_sum=0;var week8_sum=0;var week9_sum=0;var week10_sum=0;
    
    time_list.forEach(element => {
       week1_sum=week1_sum*1-0+Math.abs(element.week1_sum);
       week2_sum=week2_sum*1-0+Math.abs(element.week2_sum);
       week3_sum=week3_sum*1-0+Math.abs(element.week3_sum);
       week4_sum=week4_sum*1-0+Math.abs(element.week4_sum);
       week5_sum=week5_sum*1-0+Math.abs(element.week5_sum);
       week6_sum=week6_sum*1-0+Math.abs(element.week6_sum);
       week7_sum=week7_sum*1-0+Math.abs(element.week7_sum);
       week8_sum=week8_sum*1-0+Math.abs(element.week8_sum);
       week9_sum=week9_sum*1-0+Math.abs(element.week9_sum);
       week10_sum=week10_sum*1-0+Math.abs(element.week10_sum);
    });
    var result_sum={
        "week1_sum":Math.round(week1_sum/time_list.length),
        "week2_sum":Math.round(week2_sum/time_list.length),
        "week3_sum":Math.round(week3_sum/time_list.length),
        "week4_sum":Math.round(week4_sum/time_list.length),
        "week5_sum":Math.round(week5_sum/time_list.length),
        "week6_sum":Math.round(week6_sum/time_list.length),  
        "week7_sum":Math.round(week7_sum/time_list.length),  
        "week8_sum":Math.round(week8_sum/time_list.length),
        "week9_sum": Math.round(week9_sum/time_list.length), 
        "week10_sum":  Math.round(week10_sum/time_list.length),
    };
    if(!result){
        return res.status(401).json({ "error": true,message:"The uid is faill."});
    }
    return res.status(200).json({
        "message":"Login Successfully!",
        "now_time":result,
        "result_sum":result_sum
    });
});

router.put('/achieving_rate_bl', async (req, res) => {
    let {uid} = req.body;
    let {bl} = req.body;
    var result=await knex('user_message').update({
        "chat_bl":bl
    }).where({
        "uid":uid
    }).then(result=>{
       return res.status(200).json({
            "message":"ok",
        })
    }).catch(reason => {
        return res.status(402).json({ "error": true,message:"Error."});
    });
});

router.put('/updateCity', async (req, res) => {
    let {uid} = req.body;
    let {city} = req.body;
    var result=await knex('user_message').update({
        "city":city
    }).where({
        "uid":uid
    }).then(result=>{
       return res.status(200).json({
            "message":"Modified city success.",
        })
    }).catch(reason => {
        return res.status(402).json({ "error": true,message:"Error."});
    });
});

router.put('/updateReports', async (req, res) => {
    let {uid} = req.body;
    let {report} = req.body;
    var result=await knex('user_message').update({
        "aggressive":report
    }).where({
        "uid":uid
    }).then(result=>{
       return res.status(200).json({
            "message":"Modified report success.",
        })
    }).catch(reason => {
        return res.status(402).json({ "error": true,message:"Error."});
    });
});

router.put('/updateRate', async (req, res) => {
    let {uid} = req.body;
    let {rate} = req.body;
    var result=await knex('user_message').update({
        "achieving_rate_bl":rate
    }).where({
        "uid":uid
    }).then(result=>{
       return res.status(200).json({
            "message":"Modified Achievement Rate success.",
        })
    }).catch(reason => {
        return res.status(402).json({ "error": true,message:"Error."});
    });
});

router.put('/updateFriendFrequency', async (req, res) => {
    let {uid} = req.body;
    let {friend} = req.body;
    var result=await knex('user_message').update({
        "friend_frequency":friend
    }).where({
        "uid":uid
    }).then(result=>{
       return res.status(200).json({
            "message":"Mhanging the frequency of adding friends each week succeeded.",
        })
    }).catch(reason => {
        return res.status(402).json({ "error": true,message:"Error."});
    });
});


router.post('/getAddiction', async (req, res) => {
    let {uid} = req.body;
    var message=await knex('user_message').select().where({uid:uid}).then(users => {return users[0]});
    var time=await knex('time').select().where({uid:uid}).then(users => {return users[0]});
    var time_list=await knex('time').select().where({}).then(users => {return users});
    var Anumber=0;
    var sum3=0;
    var sum2=0;
    var sum1=0;
    time_list.forEach(item=>{
        sum1=sum1+item.week1_sum;
        sum2=sum2+item.week2_sum;
        sum3=sum3+item.week3_sum;
    })
    var week_time_avg1=Math.round(sum1/time_list.length);
    var week_time_avg2=Math.round(sum2/time_list.length);
    var week_time_avg3=Math.round(sum3/time_list.length);


    //时长判断
    if(time.week3_unhealthy*0.4>6){
        Anumber=Anumber+6;
    }else{
        Anumber=Anumber+time.week3_unhealthy*0.4;
    }

    if((time.week3_unhealthy-14)*0.15>0){
        if((time.week3_unhealthy-14)*0.15>3){
            Anumber=Anumber+3;
        }else{
            Anumber=Anumber+(time.week3_unhealthy-14)*0.15;
        }
    }

    if(time.week1_sum>=week_time_avg1 && time.week2_sum>=week_time_avg2 && time.week3_sum>=week_time_avg3){
        Anumber=Anumber+1; 
    }
    if(time.week2_sum-2>=time.week1_sum && time.week3_sum-2>=time.week2_sum && time.week4_sum-2>=time.week3_sum){
        Anumber=Anumber+1; 
    }

    if(time.week3_sum-week_time_avg3>0){
        Anumber=Anumber+(time.week3_sum-week_time_avg3)*0.25;
    }

    if(time.week3_unhealthy-1>=time.week2_unhealthy && time.week2_unhealthy-1>=time.week1_unhealthy && time.week4_unhealthy-1>=time.week3_unhealthy){
        Anumber=Anumber+1.5;
    }




    //其他判断
    if(message.achieving_rate_bl==1){
        Anumber=Anumber+0.5;
    }
    if(message.chat_bl==1){
        Anumber=Anumber+0.5;
    }
    if(message.aggressive>=4){
        Anumber=Anumber+0.5;
    }
    var friend_list=message.friend_frequency.split(",");
    var friend_number=0;
    friend_list.forEach(item=>{
        if(item>=3){
            friend_number=friend_number+1;
        }else{
            friend_number=0;
        }
    });
    if(friend_number>=4){
        Anumber=Anumber+friend_number*0.5;
    }


    return res.status(200).json({
        "message":"succeeded.",
        "Anumber":Anumber.toFixed(2),
    })
});

module.exports = router