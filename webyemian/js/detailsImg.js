
$(function(){
	
	var id=getQuertString("goodsID");
	id=id||1;
	getXQImg(id);
	
	var main=document.getElementById("main");
		function changeMain(){
			var Height=main.offsetHeight;
			main.style.height=Height+"px";
//			console.log(main.style.height)
	    }
	
	    var timer = null;
	    window.onresize = function(){
	        timer && clearTimeout(timer);
	        setTimeout(function(){
	            changeMain();
	        },10);
	    }
	    changeMain();
	    
	    var back=$("#back");
		back.on("touchstart",function(){
			window.history.back();		
		});
		
});

//获取url参数
function getQuertString(name){
	//设置查找name前缀
	var reg = new RegExp("(^|&)"+name+"=([^&]*)(&|$)");
	//进行查找
	var r=window.location.search.substr(1).match(reg);
	if(r!=null){
		return decodeURI(r[2]);
	}
	else{
		return null;
	}
}

/*<div class="swiper-slide"><img src="img/xiangqing1.jpg" width="100%" height="100%"/></div>*/
function getXQImg(id){
	$.ajax({
		type:"get",
		url:"http://datainfo.duapp.com/shopdata/getGoods.php",
		async:true,
		dataType:"jsonp",
		data:{goodsID:id},
		success:function(data){
			sortData(data);
			swiperLoad();
		}
	});
}
function swiperLoad(){
	var swiper=new Swiper(".swiper-container",{
		autoplay:2000,
		loop:true,
		pagination:".swiper-pagination",
		paginationClickable:true
	});
}
function sortData(data){
	var $img=data[0].goodsBenUrl;
	console.log(data[0])
	var imgSrc=$img.split('["')[1].split('"]')[0].split('","');
	console.log(imgSrc)
	$("#swiper-wrapper").empty();
	$.each(imgSrc, function(index) {
		var $swiperSlide=$('<div class="swiper-slide"><img src="'+imgSrc[index]+'" width="100%" height="100%"/></div>');
		$("#swiper-wrapper").append($swiperSlide);
	});
	
}
		

