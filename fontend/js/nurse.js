$(function(){
    onload();
})
function onload(){
    $.ajax({
        url:"http://localhost:3001/patient",
        method:"GET",
        success:function(res){
          var str="";
          res.patient_list.forEach(element => {
            str+=`
                <option value="${element.pid}">${element.name}</option>
            `;
          });
          $("#patient1").html(str);
          $("#patient2").html(str);
          $("#patient3").html(str);

        },
        error:function(err){
           alert(err.responseJSON.message);
        }
    });
}

function create(time){
    var date=new Date(time);
    return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
}

function createObservations(){
    var pid=$("#patient1").val();
    var text=$("#observations").val();
    if(pid && text){
        $.ajax({
            url:"http://localhost:3001/observations",
            method:"POST",
            data:{"pid":pid,"text":text},
            success:function(res){
                alert(res.message);
                $("#patient1").val("");
                $("#observations").val("");
                window.location.reload();
            },
            error:function(err){
               alert(err.responseJSON.message);
            }
        })
    }else{
        alert("The Patient name and observation cannot be empty!");
    }
}

function createTreatment(){
    var pid=$("#patient2").val();
    var text=$("#treatment").val();
    if(pid && text){
        $.ajax({
            url:"http://localhost:3001/treatment",
            method:"POST",
            data:{"pid":pid,"text":text},
            success:function(res){
                alert(res.message);
                $("#patient2").val("");
                $("#treatment").val("");
                window.location.reload();
            },
            error:function(err){
               alert(err.responseJSON.message);
            }
        })
    }else{
        alert("The Patient name and observation cannot be empty!");
    }
}

function createAnswer(){
    var pid=$("#patient3").val();
    let question_text =$("#question_text").val();
    let answer_text =$("#answer_text").val();
    let notes_text =$("#notes_text").val();
    if(pid && question_text && answer_text && notes_text){
        $.ajax({
            url:"http://localhost:3001/answer",
            method:"POST",
            data:{"pid":pid,"answer_text":answer_text,"notes_text":notes_text,"question_text":question_text},
            success:function(res){
                alert(res.message);
                $("#question_text").val("");
                $("#answer_text").val("");
                $("#notes_text").val("");
                window.location.reload();
            },
            error:function(err){
               alert(err.responseJSON.message);
            }
        })
    }else{
        alert("The Patient name and notes and answer and question cannot be empty!");
    }
}