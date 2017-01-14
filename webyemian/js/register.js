$(function(){
	var R_loginBtn=$("#R_loginBtn");
	R_loginBtn.on("click",function(){
		window.location.href="login.html";
	});
	var back=$("#back");
	back.on("touchstart",function(){
		window.history.back();		
	});
	
});
function _register(){
	var userName=$("#user_name");
	var userPsw=$("#user_psw");
	var userRePsw=$("#user_repsw");
	if(userName.val()==""){
		alert("用户名不能为空");
	}
	else if(userPsw.val()==""){
		alert("密码不能为空");
	}
	else if(userPsw.val()!=userRePsw.val()){
		alert("两次输入的密码不一样");
	}
	else{
		var user=_user(userName.val(),userPsw.val());
		getData(user);
	}
}

function _user(name,passW){
	return {
		userId:name,
		password:passW
	}
}

function getData(user){
//	console.log(user.userId)
	$.ajax({
		type:"post",
		url:"http://datainfo.duapp.com/shopdata/userinfo.php",
		data:{status:"register",userID:user.userId,password:user.password},
		success:function(data){
			if(data==0){
				alert("该用户名太受欢迎了");
			}
			else if(data==1){
				alert("注册成功");
			}
			else if(data==2){
				alert("你的浏览器奔溃了，请重试");
			}
		}
	});
}

