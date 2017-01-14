$(function(){
	scrollLoad();
	getShopCarData();
	
	//阻止滑动的默认行为
	document.addEventListener("touchmove",function(e){
		e.preventDefault();
//		console.log(111)
	});
});
var myscroll;
function scrollLoad(){
	 myscroll = new IScroll("#wrapper",{
		mouseWheel:true,
		scrollbars:true
	});
}

/*<div class="product">
							<div class="Img">
								<img src="img/gouwc1.jpg"/>
							</div>
							<div class="jieshao">
								<div class="jieshao_1">
									<p>ESPRIT 气质V领玫红T恤</p>
									<p>单价：<span>￥199</span></p>
									<p>数量：<input type="button" value="-"/><input type="text" name="" id="" value="1" /><input type="button" name="" id="" value="+" /></p>
								</div>
								<div class="jieshao_2">
									<div class="cancel">
										<i class="fa fa-trash"></i>
									</div>
									<div class="daxiao">
										L
									</div>
								</div>
							</div>
						</div>*/
function getShopCarData(){
	var userSign=sessionStorage.getItem("TempUserName");
	if(userSign!=null){
		var userName=JSON.parse(userSign).userID;
		$.ajax({				
			type:"get",
			dataType:"jsonp",
			url:"http://datainfo.duapp.com/shopdata/getCar.php",
			async:true,
			data:{userID:userName},
			success:function(data){
				var $scrollBar=$("#scrollBar");
				var allPro=$('#allPro');
				var allPrice=$("#allPrice");
				var total=0;
				var sum=0;
				$.each(data, function(index) {
//					console.log(data[0])
					var $product=$('<div class="product"></div>');
					var $imgBox=$('<div class="Img">图片加载中......</div>');
					var $img=$('<img src="'+data[index].goodsListImg+'"></img>');
					var $jieshao=$('<div class="jieshao"></div>');
					var $jieshao_1=$('<div class="jieshao_1"></div>');
					var $p1=$('<p>'+data[index].goodsName+'</p>');
					var $p2=$('<p>单价：<span>￥'+data[index].price+'</span></p>');
					var $p3=$('<p>数量：</p>');
					var $p3_1=$('<input type="button" value="-"/>');
					var $p3_2=$('<input type="text" name="" id="" value="'+data[index].number+'" />');
					var $p3_3=$('<input type="button" name="" id="" value="+" />');
					var $jieshao_2=$('<div class="jieshao_2"></div>');
					var $cancel=$('<div class="cancel"><i class="fa fa-trash"></i></div>');
					var $size=$('<div class="daxiao">'+"L"+'</div>');
					
					total +=parseInt(data[index].number);
					sum +=Number(data[index].number)*Number(data[index].price);
					$product.append($imgBox);
					$img.on("load",function(){
						//再次刷新
						myscroll.refresh();
						$imgBox.empty();
						$imgBox.append($img);
					});
					$product.append($jieshao);
					$jieshao.append($jieshao_1);
					$jieshao_1.append($p1);
					$jieshao_1.append($p2);
					$p3.append($p3_1);
					$p3.append($p3_2);
					$p3.append($p3_3);
					$jieshao_1.append($p3);
					$jieshao_2.append($cancel);
					$jieshao_2.append($size);
					$jieshao.append($jieshao_2);
					$scrollBar.append($product);
					
					$p1.on("tap",function(){
		//				console.log(1111)
						window.location.href = "detailsImg.html?goodsID="+encodeURI(data[index].goodsID);
					});
					$img.on("tap",function(){
						window.location.href = "detailsImg.html?goodsID="+encodeURI(data[index].goodsID);
					});
					$cancel.on("tap",function(){
						var id=data[index].goodsID;
						var num=Number(data[index].number);
						var price=Number(data[index].price);
//						console.log(111)
						cancelCar(id,num,price,$(this));
					});
					$p3_1.on("tap",function(){
						var id=data[index].goodsID;
						getProNum_change(id,-1,$(this));
					});
					$p3_3.on("tap",function(){
						var id=data[index].goodsID;
						getProNum_change(id,1,$(this));
					});
					
					
				});
				allPro.text(total);
				allPrice.text("￥"+sum);
				$("#num").text(total);
			}
		});
	}
	else{
		window.location.href="noProduct.html";
	}
}

function cancelCar(id,num,price,that){
	var userSign=sessionStorage.getItem("TempUserName");
	if(userSign!=null){
		var userName=JSON.parse(userSign).userID;
			$.ajax({
				type:"post",
				url:"http://datainfo.duapp.com/shopdata/updatecar.php",
				async:true,
				data:{userID:userName,goodsID:id,number:0},
				success:function(data){
					//console.log(222)
					$("#allPro").text($("#allPro").text()-num);
					$("#allPrice").text("￥"+Number($("#allPrice").text().substring(1))-num*price);
					myscroll.refresh();
					that.parent().parent().parent().remove();
				}
			});
	}
}


function changeProNum(userName,id,fuhao,that,proNum,price,allProNum,allProprice){
	proNum=proNum+(1*Number(fuhao));
	if(proNum<=1){
		proNum=1;
	}
//	console.log(proNum);
	$.ajax({
		type:"post",
		url:"http://datainfo.duapp.com/shopdata/updatecar.php",
		async:true,
		data:{userID:userName,goodsID:id,number:proNum},
		success:function(data){
//			console.log(222)
			if(data==1){
				if(proNum<1){
					proNum=1;
				}
				else{
						$(that.parent().children("input").get(1)).val(proNum);
						$("#allPro").text(allProNum+fuhao);
						$("#num").text(allProNum+fuhao);
						$("#allPrice").text("￥"+(allProprice+(fuhao*price)));
					
				}
			}
		}
	});
}

function getProNum_change(id,fuhao,that){
	var userSign=sessionStorage.getItem("TempUserName");
	if(userSign!=null){
//		console.log(111)
		var userName=JSON.parse(userSign).userID;
		var proNum=0;
		var price=0;
		var allProNum=0;
		var allProPrice=0;
		$.ajax({				
			type:"get",
			dataType:"jsonp",
			url:"http://datainfo.duapp.com/shopdata/getCar.php",
			async:true,
			data:{userID:userName},
			success:function(data){
				if(data!=0){
		//			console.log(data[0]);
					$.each(data, function(index){
						if(parseInt(data[index].goodsID)==id){
		//					console.log(data[index].number)
							proNum=Number(data[index].number);
							price=Number(data[index].price);
						}
						allProNum +=Number(data[index].number);
						allProPrice +=Number(data[index].price)*Number(data[index].number);
					});
					changeProNum(userName,id,fuhao,that,proNum,price,allProNum,allProPrice);
				}
			}
		});
					
	}
			
}

function getProSign(){
	var userSign=sessionStorage.getItem("TempUserName");
	var allProNum=0;
	var allProPrice=0;
	if(userSign!=null){
//		console.log(111)
		var userName=JSON.parse(userSign).userID;
		var proNum=0;
		var price=0;
		$.ajax({				
			type:"get",
			dataType:"jsonp",
			url:"http://datainfo.duapp.com/shopdata/getCar.php",
			async:true,
			data:{userID:userName},
			success:function(data){
				if(data!=0){
		//			console.log(data[0]);
					$.each(data, function(index){
						allProNum +=Number(data[index].number);
						allProPrice +=Number(data[index].price)*Number(data[index].number);
					});
				}
			}
		});
					
	}
}
