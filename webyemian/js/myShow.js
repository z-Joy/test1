$(function(){
	var loginBtn=$("#loginBtn");
	var registerBtn=$("#registerBtn");
	loginBtn.on("click",function(){
		window.location.href="login.html";
	});
	registerBtn.on("click",function(){
		window.location.href="register.html";
	});
	var back=$("#back");
	back.on("touchstart",function(){
		window.history.back();		
	});
	
	var userName=document.getElementById("userName");
	sortSessionS();
});


function sortSessionS(){
	var userSign=sessionStorage.getItem("TempUserName");
//	console.log(userSign)
	if(userSign!=null){//console.log(1111)
		var getUserName=JSON.parse(userSign).userID;
		userName.innerText=getUserName;
	}
	else{
		userName.innerText="未登录";
	}
	
}
