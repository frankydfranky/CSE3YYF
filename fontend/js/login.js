function login(){
    var password=$("#password").val();
    var username=$("#username").val();
    if(username&&password){ 
        $.ajax({
            url:"http://localhost:3001/user/login",
            method:"POST",
            data:{username:username,password:password},
            success:function(res){
                alert(res.message);
                window.localStorage.setItem("user",JSON.stringify(res.user));
                window.location.href="./index.html";
            },
            error:function(err){
               alert(err.responseJSON.message);
            }
        })
    }else{
        alert("The user name and password cannot be empty!");
    }
}