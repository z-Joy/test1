$(function(){
	getUser();
	
	var L_registerBtn=$("#L_registerBtn");
	L_registerBtn.on("click",function(){
		window.location.href="register.html";
	});
	
	var back=$("#back");
	back.on("touchstart",function(){
		window.history.back();		
	});
});	

function getUser(){
	var str=localStorage.getItem("user");
	var userData=JSON.parse(str);
//	console.log(userData==null)
//	console.log($("#checkBox").attr("checked"))
	if(userData!=null){
		$("#checkBox")[0].checked=true;
		$("#login_name").val(userData.userID);
		$("#login_psw").val(userData.password);
	}
}

function _login(){
	var userName=$("#login_name");
	var userPsw=$("#login_psw");
	if(userName.val()==""){
		alert("用户名不能为空");
	}
	else if(userPsw.val()==""){
		alert("密码不能为空");
	}
	else{
		getData(userName,userPsw);
	}
}


function getData(userName,userPsw){
	$.ajax({
		type:"post",
		url:"http://datainfo.duapp.com/shopdata/userinfo.php",
		data:{status:"login",userID:userName.val(),password:userPsw.val()},
		async:true,
		success:function(data){
//			console.log(data)
			if(data==0){
				alert("用户名不存在");
			}
			else if(data==2){
				alert("用户名密码不符");
			}
			else if(data.charAt(0)=="{"){
				alert("登录成功");
				saveUser(userName.val(),userPsw.val());
			}
		}
	});
}

function saveUser(userName,passW){
	if($("#checkBox")[0].checked){
		localStorage.setItem("user",'{"userID":"'+userName+'","password":"'+passW+'"}');
		sessionStorage.setItem("TempUserName",'{"userID":"'+userName+'"}');
		window.location.href="myShow.html";
	}
	else{
		localStorage.removeItem("user");
		localStorage.setItem("TempUserName",'{"userID":"'+userName+'"}');
		window.location.href="myShow.html";
	}
}

