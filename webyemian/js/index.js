var myscroll;
var navScoll;
$(function(){
	scrollLoad();
	navScrolLoad();
	getData(1);
	bannerImg();
	getIconData();
	var i=1;
	
	document.addEventListener("touchend",function(){
		//下拉 刷新
		if(myscroll.y>30){
			$("#scrollBar").empty();
			i=1;
			getData(i);
		}
		//上拉 加载  
		if(myscroll.y<myscroll.maxScrollY-49){
			i++
		 	getData(i);
	//	 	console.log(myscroll.maxScrollY)
		}
		
	});
	//阻止滑动的默认行为
	document.addEventListener("touchmove",function(e){
		e.preventDefault();
//		console.log(111)
	});
	
					
});

//设置列表滚动
function scrollLoad(){
	 myscroll = new IScroll("#wrapper",{
		mouseWheel:true,
		scrollbars:true
	});
}
//设置分类水平滚动
function navScrolLoad(){
	navScoll = new IScroll("#main_nav",{
		scrollX:true,
		scrollY:false,
		click:true
	});
}

/*<dl class="product">
 * <dt><img src="img/product.jpg"/> </dt>
 * <dd> <span><a href="###">0元大抽奖！走秀携古尔莎为你开启，价值28880元的土耳其啦啦啦啦啦啦啦啦啦啦啦啦啦</a></span> 
 * <span class="price">￥0</span> <span class="price1">￥28880</span> <span>0折</span> <a class="gwc"> <i class="fa fa-cart-arrow-down"></i> </a> </dd> </dl>*/
function getData(id){
	$.ajax({
		type:"get",
		dataType:"jsonp",
		url:"http://datainfo.duapp.com/shopdata/getGoods.php",
		async:false,
		data:{classID:id},
		success:function(data){
			sortData(data);
		}
	});
	
}

function sortData(data){
//	console.log(data)
	if(data.length){
		var $scrollBar=$("#scrollBar");
		$.each(data, function(index){
			var $product=$('<dl class="product"></dl>');
			var $dt=$('<dt>图片加载中。。。</dt>');
			var $img=$('<img src="'+data[index].goodsListImg+'" class="images"/>');
			var $dd=$('<dd></dd>');
			var $productName=$('<span><a href="###">'+data[index].goodsName+'</a></span>');
			var $productPrice=$('<span class="price">￥'+data[index].price+'</span><span class="price1">￥28880</span>');
			var $disCount=$('<span>'+data[index].discount+'折</span>');
			var $gwc=$('<a class="gwc" index='+data[index].goodsID+'> <i class="fa fa-cart-arrow-down"></i> </a>');
			$product.append($dt);
			$img.on("load",function(){
				//再次刷新
				myscroll.refresh();
				$dt.empty();
				$dt.append($img);
			});
			$product.append($dd);
			$dd.append($productName);
			$dd.append($productPrice);
			$dd.append($disCount);
			$dd.append($gwc);
			$scrollBar.append($product);
		
			$productName.on("tap",function(){
//				console.log(1111)
				window.location.href = "detailsImg.html?goodsID="+encodeURI(data[index].goodsID);
			});
			$img.on("tap",function(){
				window.location.href = "detailsImg.html?goodsID="+encodeURI(data[index].goodsID);
			});	
		});
		
		shopCar();
//				flag=true;
	}
	//加入没有用each方法，而是用for循环则必须等到数据获取并加载完毕之后才可以去获取html中的元素，否则为null，用定时器起到监听的作用，加载完毕之后获取元素并且关闭定时器。
	/*var timer=setInterval(function(){
		if(flag){
			$(".images").on("touchstart",function(){
				var index=$(".images").index(this);
				window.location.href = "detailsImg.html?goodsID="+encodeURI(data[index].goodsID);
			});
			clearInterval(timer);
		}
	},100);*/
}

function bannerImg(){
	
	var swiper= new Swiper("#index",{
		autoplay:3000,
		loop:true,
		pagination:".swiper-pagination",
		paginationClickable:true
	});
}

function getIconData(){
	$.ajax({
		type:"get",
		url:"http://datainfo.duapp.com/shopdata/getclass.php",
		async:true,
		success:function(data){
//			console.log(data);
			var thisdata = JSON.parse(data)
			var length = thisdata.length;
			var navWidth = 0;
			var iconGroup = $("#iconGroup");
			$.each(thisdata,function(i){
				navWidth+=50;
				var iconBox = $("<i class='icon iconfont iconBox'>"+thisdata[i].icon+"</i>");
				iconGroup.append(iconBox);
				iconBox.on('touchstart',function(){
					$('#scrollBar').empty();
					getData(thisdata[i].classID);
				})
			});
			iconGroup.width(navWidth);
			navScoll.refresh();
		}
	});
	
}
//var flag=false;


function shopCar(){
	var gwcArr=$(".gwc");
//	console.log($(".gwc"));
	gwcArr.on('tap',function(){
		var id=$(this).attr("index");
		getProNum_add(id);
	});
}



function addCar(userName,id,proNum,sum){
//	console.log(111)
	proNum++;
//	console.log(proNum);
	$.ajax({
		type:"post",
		url:"http://datainfo.duapp.com/shopdata/updatecar.php",
		async:true,
		data:{userID:userName,goodsID:id,number:proNum},
		success:function(data){
//			console.log(222)
			if(data==1){
				 $("#num").text(sum+1);
			}
		}
	});
}

function getProNum_add(id){
	var userSign=sessionStorage.getItem("TempUserName");
	if(userSign!=null){
		var userName=JSON.parse(userSign).userID;
		var proNum=0;
		var sum=0;
		$.ajax({				
			type:"get",
			dataType:"jsonp",
			url:"http://datainfo.duapp.com/shopdata/getCar.php",
			async:true,
			data:{userID:userName},
			success:function(data){
				if(data!=0){
		//			console.log(data[0]);
					$.each(data, function(index) {
						if(parseInt(data[index].goodsID)==id){
		//					console.log(data[index].number)
							proNum=data[index].number;
						}
						sum +=Number(data[index].number);
					});
					addCar(userName,id,proNum,sum);
				}
				else{
					addCar(userName,id,proNum,sum);
				}
			}
		});
					
	}
	else{
		window.location.href="login.html";
	}
}
