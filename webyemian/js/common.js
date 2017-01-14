window.onload=function(){
	loadCar();
	//阻止滑动的默认行为
	document.addEventListener("touchmove",function(e){
		e.preventDefault();
//		console.log(111)
	});
}
var total=0;
function loadCar(){
	var userSign=sessionStorage.getItem("TempUserName");
	var num=document.getElementById("num");
	if(userSign!=null){
		var userName=JSON.parse(userSign).userID;
		$.ajax({				
			type:"get",
			dataType:"jsonp",
			url:"http://datainfo.duapp.com/shopdata/getCar.php",
			async:true,
			data:{userID:userName},
			success:function(data){
//			console.log(data);
				$.each(data, function(index) {
					total=total+parseInt(data[index].number);
				});
				if(total==0){
					num.style.display="none";
				}
				else{
					num.style.display="block";
					num.innerText=total;	
				}
			}
				
		});
	}
}
