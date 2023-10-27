$(function(){
    onload();
})

function onload(){
    $.ajax({
        url:"http://localhost:3001/patient",
        method:"GET",
        success:function(res){
        //   console.log(res.patient_list);
          var str="";
          res.patient_list.forEach(element => {
            str+=`
                <option value="${element.pid}">${element.name}</option>
            `;
          });
          $("#patient").html(str);
        },
        error:function(err){
           alert(err.responseJSON.message);
        }
    });

    $.ajax({
        url:"http://localhost:3001/clinicalstudies",
        method:"GET",
        success:function(res){
        //   console.log(res.clinicalstudiess_list);
          var str="";
          res.clinicalstudiess_list.forEach(element => {
            str+=`
                <option value="${element.cid}">${element.studiesname}</option>
            `;
          });
          $("#studiesname").html(str);
        },
        error:function(err){
           alert(err.responseJSON.message);
        }
    });

    $.ajax({
        url:"http://localhost:3001/managestudies",
        method:"GET",
        success:function(res){
            var str="";
            res.managestudies_list.forEach(item=>{
                str+=`
                    <tr>
                        <th scope="row">1</th>
                        <td>${item.clinicalstudies.studiesname}</td>
                        <td>${item.patient.name}</td>
                        <td>${create(item.date)}</td>
                        <td><button type="button" class="btn btn-primary" onclick="remove('${item.cid}','${item.pid}')">Remove</button></td>
                    </tr>
                `;
            })
            $("#managestudies").html(str);          
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

function remove(cid,pid){
    $.ajax({
        url:"http://localhost:3001/managestudies",
        method:"DELETE",
        data:{"cid":cid,"pid":pid},
        success:function(res){
            alert(res.message);
            onload();
        },
        error:function(err){
           alert(err.responseJSON.message);
        }
    });
}

function mangeSubmit(){
    var cid=$("#studiesname").val();
    var pid=$("#patient").val();
    var date=$("#date").val();
    if(cid && pid && date){
        $.ajax({
            url:"http://localhost:3001/managestudies",
            method:"POST",
            data:{"cid":cid,"pid":pid,"date":date},
            success:function(res){
                alert(res.message);
                $("#patient").val("");
                $("#studiesname").val("");
                $("#date").val("");
                window.location.reload();
            },
            error:function(err){
               alert(err.responseJSON.message);
            }
        })
    }else{
        alert("The studiesname and patient and date cannot be empty!");
    }
}

function createPatient(){
    var patientname1=$("#patientname1").val();
    var gender=$("#gender").val();
    var age=$("#age").val();
    if(gender&&patientname1&&age){ 
        $.ajax({
            url:"http://localhost:3001/patient",
            method:"POST",
            data:{"gender":gender,"patientname":patientname1,"age":age},
            success:function(res){
                alert(res.message);
                $("#patientname1").val("");
                $("#gender").val("");
                $("#age").val("");
                window.location.reload();
            },
            error:function(err){
               alert(err.responseJSON.message);
            }
        })
    }else{
        alert("The age and gender and patient name cannot be empty!");
    }
}

function createClinical(){
    var studiesname1=$("#studiesname1").val();
    var description1=$("#description1").val();
    if(studiesname1&&description1){ 
        $.ajax({
            url:"http://localhost:3001/clinicalstudies",
            method:"POST",
            data:{"studiesname":studiesname1,"description":description1},
            success:function(res){
                alert(res.message);
                $("#studiesname1").val("");
                $("#description1").val("");
                window.location.reload();
            },
            error:function(err){
               alert(err.responseJSON.message);
            }
        })
    }else{
        alert("The studiesname and description cannot be empty!");
    }
}

function createTrialorganization(){
    var organizationname=$("#organizationname").val();
    var description2=$("#description2").val();
    if(description2&&organizationname){ 
        $.ajax({
            url:"http://localhost:3001/trialorganization",
            method:"POST",
            data:{"organizationname":organizationname,"description":description2},
            success:function(res){
                alert(res.message);
                $("#organizationname").val("");
                $("#description2").val("");
                window.location.reload();
            },
            error:function(err){
               alert(err.responseJSON.message);
            }
        })
    }else{
        alert("The organization name and description cannot be empty!");
    }
}