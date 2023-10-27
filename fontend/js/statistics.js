$(function(){
    onload();
});

function onload(){
    $.ajax({
        url:"http://localhost:3001/clinicalstudies",
        method:"GET",
        success:function(res){
          var str="";
          res.clinicalstudiess_list.forEach(element => {
            str+=`
                <option value="${element.cid}">${element.studiesname}</option>
            `;
          });
          $("#study").html(str);
        },
        error:function(err){
           alert(err.responseJSON.message);
        }
    });
}

function studySubmit(){
    var cid=$("#study").val();
    console.log(study);
    $.ajax({
        url:"http://localhost:3001/managestudies/find",
        method:"POST",
        data:{"cid":cid},
        success:function(res){
            createBox();
            total(res.now_list);
            blAge(res.now_list);
        },
        error:function(err){
           alert(err.responseJSON.message);
        }
    });
}

function createBox(){
    $("#content").html(`
        <div class="item_box" style="width: 100%;">
            <div class="item_content flex_content" style="background: white;">
            <div id="total_text"></div>
            <div id="main"></div>
            </div>
        </div>

        <div class="item_box" style="width: 100%;">
            <div class="item_content" style="background: white;">
            <div id="line"></div>
            </div>
        </div>
    `);
}

function createTime(time){
    var date=new Date(time);
    return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
}

function dateData(property, bol) {
	return function(a, b) {
		var value1 = a[property];
		var value2 = b[property];
		if (bol) {
			// 升序
			return Date.parse(value1) - Date.parse(value2);
		} else {
			// 降序
			return Date.parse(value2) - Date.parse(value1)
		}
	}
}

function total(now_list){
    var total_num=now_list.length;
    let total_list=[];
    for(var i=0;i<now_list.length;i++){
        var time=createTime(now_list[i].date);
        var bl=true;
        for(var j=0;j<total_list.length;j++){
            if(time==total_list[j].date){
                total_list[j].num=total_list[j].num+1;
                bl=false;
            }
        }
        if(bl){
            total_list.push({
                date:createTime(now_list[i].date),
                num:1
            });
        }
    }
    total_list=total_list.sort(dateData("date", true));
    $("#total_text").html(`
        <h6>Total Patients</h6>
        <h3>${total_num}</h3>
    `);

    let date_list=[];
    let number_list=[];
    total_list.forEach(item=>{
        date_list.push(item.date);
        number_list.push(item.num);
    })
    createChart(date_list,number_list);
}

function blAge(now_list){
    let age_list=[];
    let now_age_list=[];
    for(var i=0;i<now_list.length;i++){
        var time=createTime(now_list[i].date);
        var bl=true;
        for(var j=0;j<age_list.length;j++){
            if(time==age_list[j].date){
                var s_list=age_list[j].patient_list;
                s_list.push(now_list[i].patient);
                age_list[j].num=age_list[j].num+1;
                age_list[j].patient_list=s_list;
                bl=false;
            }
        }
        if(bl){
            var patient_list=[];
            patient_list.push(now_list[i].patient);
            age_list.push({
                date:createTime(now_list[i].date),
                "patient_list":patient_list,
                num:1
            });
        }
    }
    age_list.forEach(item=>{
        var old=0;
        var yong=0;
        item.patient_list.forEach(jtem=>{
            if(jtem.age>=60){
                old=old+1;
            }else{
                yong=yong+1;
            }
        })
        now_age_list.push({
            "date":item.date,
            "num":item.num,
            "old":old,
            "yong":yong
        });
    });
    now_age_list=now_age_list.sort(dateData("date", true));
    let date_list=[];
    let old_list=[];
    let yong_list=[];
    
    now_age_list.forEach(item=>{
        date_list.push(item.date);
        old_list.push(item.old);
        yong_list.push(item.yong);
    });
    createLineChart(date_list,old_list,yong_list);
}

function createChart(date_list,number_list){
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'));
    // 指定图表的配置项和数据
    var option = {
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
            type: 'category',
            data:date_list
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
              data: number_list,
              type: 'bar'
            }
        ]
      };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}


function createLineChart(date_list,old_list,yong_list){
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('line'));
    // 指定图表的配置项和数据
    var option = {
        title: {
            text: 'Patient age study statistics'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ["Yong Patients","Old Patients"]
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: date_list
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name: 'Yong Patients',
              type: 'line',
              stack: 'Total',
              data: yong_list
            },
            {
              name: 'Old Patients',
              type: 'line',
              stack: 'Total',
              data: old_list
            },
          ]
      };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}