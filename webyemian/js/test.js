var myscroll;
var navScoll;
$(function(){
	scrollLoad();
	getData(1);
//	navScrolLoad();
	getIconData();
	navScrolLoad();
	//touchstart 触摸开始时
	//touchmove 触摸移动时 
	//touchend  触摸结束时
	
	//组织它默认事件
    document.addEventListener("touchmove",function(e){
    	e.preventDefault();
    })
	
	
	document.addEventListener("touchend",function(){
	  //下拉刷新
	 if(myscroll.y>0){
	    $("#scrollbar").empty();
	    getData(1);
	 }
	 //无限加载
	 if(myscroll.y<myscroll.maxScrollY-50){
	 	getData(2);	
	 }
		
	})
})


function scrollLoad(){
	 myscroll = new IScroll("#wrapper",{
		mouseWheel:true,
		scrollbars:true
	})
}

function navScrolLoad(){
	navScoll = new IScroll("#main_nav",{
		scrollX:true,
		click:true
	})
}


function getData(id){
	$.ajax({
		type:"get",
		dataType:"jsonp",
		url:"http://datainfo.duapp.com/shopdata/getGoods.php",
		data:{classID:id},
		async:true,
		success:function(data){
//			console.log(data)
			if(data.length){
				var $scrollBar = $("#scrollbar");
				//进行遍历
				$.each(data, function(index) {
//			   <div class="prodbox">
//					<div class="imgBox"><img src=""/></div>
//					<div class="proname"></div>
//					<div class="product"></div>
//				</div>
                    //获取dom元素
					var $prodbox = $("<div class='prodbox'></div>");
					var imgBox = $("<div class='imgBox'>图片正在加载中....</div>");
					var thisImg= $("<img src='"+data[index].goodsListImg+"' width='100%'/>");
					var proname = $("<div class='proname'>"+data[index].goodsName+"</div>");
					var proprice = $("<div class='proprice'>"+data[index].price+"</div>");
					$prodbox.append(imgBox);
					//图片预加载
					thisImg.on("load",function(){
						//再次刷新
						myscroll.refresh();
						imgBox.empty();
						imgBox.append(thisImg);
					})
					$prodbox.append(proname);
					$prodbox.append(proprice);
					$scrollBar.append($prodbox);
				});
			}
			
		}
	});
}

function getIconData(){
	$.ajax({
		type:"get",
		url:"http://datainfo.duapp.com/shopdata/getclass.php",
		async:true,
		success:function(data){
			console.log(data);
			var thisdata = JSON.parse(data)
			var length = thisdata.length;
			var navWidth = 0;
			var iconGroup = $("#iconGroup");
//			for(var i=0;i<length;i++){
			$.each(thisdata,function(i){
				navWidth+=50;
				var iconBox = $("<i class='icon iconfont iconBox'>"+thisdata[i].icon+"</i>");
				iconGroup.append(iconBox);
				iconBox.on('touchstart',function(){
					$('#scrollbar').empty();
					getData(thisdata[i].classID);
				})
			})
			iconGroup.width(navWidth);
			navScoll.refresh();
		}
	});
	
	
	
	
}