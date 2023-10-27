$(function(){
    onload();
});

function onload(){
    $.ajax({
        url:"http://localhost:3001/trialorganization",
        method:"GET",
        success:function(res){
            var str="";
            res.trialorganization_list.forEach(element => {
                str+=`
                <div class="card">
                    <div class="card-body">
                    <h5 class="card-title">${element.organizationname}</h5>
                    <p class="card-text">${element.description}</p>          
                    </div>
                </div>
                `;
            });
            $("#trialorganization").html(str);
        },
        error:function(err){
           alert(err.responseJSON.message);
        }
    });
}


function search(){
    var search_text=$("#search_text").val();
    if(search_text){
        $.ajax({
            url:"http://localhost:3001/patient/findName",
            method:"POST",
            data:{"search_text":search_text},
            success:function(res){
              console.log(res);
              if(res.now_patient.pid){
                create_onload();
                create_answer(res.now_patient);
                create_treatment(res.now_patient);
                create_observation(res.now_patient);
                create_managestudies(res.now_patient);
              }else{
                $("#content_box").html(`<h2 class="text_align_center">None found</h2> `);
              }
            },
            error:function(err){
               alert(err.responseJSON.message);
            }
        });
    }else{
        alert("The patient name cannot be empty.");
    }
}

function createTime(time){
    var date=new Date(time);
    return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
}
function createTime2(time){
    var date=new Date(time);
    return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
}

function create_onload(){
    $("#content_box").html(`
        <div class="contnet_item">
            <h4 style="margin-bottom: 2vh;">Patient Answer</h4>
            <table class="table table-striped">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Question</th>
                <th scope="col">Answer</th>
                <th scope="col">Notes</th>
                <th scope="col">Date</th>
                </tr>
            </thead>
            <tbody id="answer"></tbody>
            </table>
        </div>

        <div class="contnet_item">
            <h4 style="margin-bottom: 2vh;">Patient Studies</h4>
            <table class="table table-striped">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Studies name</th>
                <th scope="col">Description</th>
                <th scope="col">Date</th>
                </tr>
            </thead>
            <tbody id="studies"></tbody>
            </table>
        </div>

        <div class="contnet_item">
            <h4 style="margin-bottom: 2vh;">Patient Treatment</h4>
            <table class="table table-striped">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Treatment Text</th>
                <th scope="col">Date</th>
                </tr>
            </thead>
            <tbody id="treatment"></tbody>
            </table>
        </div>

        <div class="contnet_item">
            <h4 style="margin-bottom: 2vh;">Observations</h4>
            <table class="table table-striped">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Observation Text</th>
                <th scope="col">Date</th>
                </tr>
            </thead>
            <tbody id="observations"></tbody>
            </table>
        </div>
    `);
}

function create_answer(now_patient){
    var str="";
    now_patient.answer_list.forEach((item,index)=>{
        str+=`
            <tr>
                <th scope="row">${index+1}</th>
                <td>${item.question_text}</td>
                <td>${item.answer_text}</td>
                <td>${item.notes_text}</td>
                <td>${createTime(item.date)}</td>
            </tr>
        `;
    });
    $("#answer").html(str);
}

function create_managestudies(now_patient){
    var str="";
    now_patient.managestudies_list.forEach((item,index)=>{
        str+=`
            <tr>
                <th scope="row">${index+1}</th>
                <td>${item.clinicalstudies.studiesname}</td>
                <td>${item.clinicalstudies.description}</td>
                <td>${createTime2(item.date)}</td>
            </tr>
        `;
    });
    $("#studies").html(str);
}


function create_treatment(now_patient){
    var str="";
    now_patient.treatment_list.forEach((item,index)=>{
        str+=`
            <tr>
                <th scope="row">${index+1}</th>
                <td>${item.text}</td>
                <td>${createTime(item.date)}</td>
            </tr>
        `;
    });
    $("#treatment").html(str);
}


function create_observation(now_patient){
    var str="";
    now_patient.observations_list.forEach((item,index)=>{
        str+=`
            <tr>
                <th scope="row">${index+1}</th>
                <td>${item.text}</td>
                <td>${createTime(item.date)}</td>
            </tr>
        `;
    });
    $("#observations").html(str);
}

