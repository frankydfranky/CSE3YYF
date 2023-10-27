$(function(){
    var user=window.localStorage.getItem("user");
    if(user){
        user=JSON.parse(user);
        $("#dropdown").html(`
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                ${user.userName}
            </a>
            <ul class="dropdown-menu">
                <li onclick="loginOut()"><a class="dropdown-item" href="#">Login Out</a></li>
            </ul>
        `);
        console.log(user);
    }else{
        alert("Please log in first!");
        window.location.href="./login.html";
    }
});

function loginOut(){
    window.localStorage.removeItem("user");
    alert("Exit successfully!");
    window.location.href="./login.html";
}