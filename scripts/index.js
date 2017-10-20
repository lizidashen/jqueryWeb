// JavaScript Document
//搜索框文字效果
$(function(){
	$("#inputSearch").focus(function(){
		$(this).addClass("focus");
		if($(this).val() == this.defaultValue){
			$(this).val("");
		}
	}).blur(function(){
		$(this).removeClass("focus");
		if($(this).val() == ""){
			$(this).val(this.defaultValue);
		}
	}).keyup(function(e){
		if(e.which==13){
			alert('回车提交表单');
		}
	})
})

//网页换肤
$(function(){
	var $li=$("#skin li");//取出li元素
	$li.click(function(){//当点击li元素的时候调用函数
		switchSkin(this.id);//启动函数switchSkin  自变量为当前li元素的di，即skin_*
	});
	//var cookie_skin=$.cookie("MyCssSkin");//获取cookie 的值
	/*if(cookie_skin){
		switchSkin(cookie_skin);
	}*/
});
function switchSkin(skinName){
	$("#"+skinName).addClass("selected")//此处应记住引号只包括#，不包括skinName，不然就成了#skinName字符串
		.siblings().removeClass("selected");//选中当前li 并取消其他li的选中
	$("#cssfile").attr("href","styles/skin/" +skinName+".css");//对于id=cssfile的 link链接 更换css样式，载入文件skinName.css
	//$.coolie("MyCssSkin",skinName,{path:'/',expires:10});//计入cookie
}

//导航效果
$(function(){
	$("#nav li").hover(function(){
		$(this).find(".jnNav").show();
	},function(){
		$(this).find(".jnNav").hide();
	});
});

//商品分类热销效果
$(function(){
	$(".jnCatainfo .promoted").append("<span class='hot'></span>");//一定要注意单引号和双引号的问题
});

//大屏广告效果

$(function(){
	var $imgrolls = $("#jnImageroll div a");
	var index = 0;
	$imgrolls.mouseover(function(){
		index = $(this).index();
		showImg(index);
	}).eq(0).mouseover();
	
	/*
	 $('#jnImageroll').hover(function(){
			if(adTimer){ 
				clearInterval(adTimer);
			}
		 },function(){
			adTimer = setInterval(function(){
			    showImg(index);
				index++;
				if(index==len){index=0;}
			} , 5000);
	}).trigger("mouseleave");
	 */
})

function showImg(index){
	var $imgrolls02 = $("#jnImageroll div a");
	var newhref = $imgrolls02.eq(index).attr("href");//获取到当前划过的超链接
	$("#JS_imgWrap").attr("href",newhref)//把大图连接到之前获得的链接上
		.find("img").eq(index).stop(true,true).fadeIn().siblings().fadeOut();
		//获得所有图片，选取index符合的图片，清空其动画，并让其显示，同时让其他同胞元素消失
}

//右侧最新动态增加超链接提示
$(function(){
	var x = 10;
	var y = 20;
	$("a.tooltip").mouseover(function(e){//选中class为tooltip的对象时，激发函数
		this.myTitle = this.title;//定义全局变量 myTitle
		this.title = "";//this.title初始化
		var tooltip="<div id='tooltip'>" + this.myTitle + "</div>";
		$("body").append(tooltip);
		$("#tooltip")
			.css({
				"top":(e.pageY+y)+"px",
				"left":(e.pageX+x)+"px"
			}).show("fast");
	}).mouseout(function(){
		this.title=this.myTitle;//此时再把this.Title初始化
		$("#tooltip").remove();
	}).mousemove(function(e){   //tooltip跟随鼠标移动
		$("#tooltip")
			.css({
				"top":(e.pageY+y)+"px",
				"left":(e.pageX+x)+"px"
			});
	});
})


//右侧下部横向滚动条
$(function(){
	$("#jnBrandTab li a").click(function(){//为分类链接绑定点击事件
		var idx = $("#jnBrandTab li a").index(this);//新建变量idx为当前元素的值，this的用法要留意
		showBrandList(idx);//触发函数showBrandList(index)，变量即目前选的值
		return false;
	}).eq(0).click();//初始化到第一个
});
//显示不同的模块
function showBrandList(index){
	var $rollobj = $("#jnBrandList"); //获取图片的父元素
	var rollWidth = $rollobj.find("li").outerWidth();//新建变量,为图片的宽度
	rollWidth = rollWidth*4;//图片宽度四倍
	$rollobj.stop(true,false).animate({ left : -rollWidth*index}, 1000);
	//停止当前动画，即停止之后的动画（true） 跳过当前动画（false）
}

// 滑过图片出现放大镜效果 
$(function(){
	$("#jnBrandList li").each(function(index){
		var $img = $(this).find("img");
		var img_w = $img.width();
		var img_h = $img.height();
		var spanHtml = '<span style="position:absolute;top:0;left:5px;width:'+img_w+'px;height:'+img_h+'px;" class="imageMask"></span>';
		$(spanHtml).appendTo(this);
	})
})



//详细页==================================================================================================

//产品点击小图换大图


//产品选项卡
$(function(){
	var $div_li = $("div.tab_menu ul li");
	$div_li.click(function(){
		$(this).addClass("selected").siblings().removeClass("selected");
		//当前元素激活“selected”效果，其他移除
		var index = $div_li.index(this);
		//获得当前元素的索引
		$("div.tab_box > div")
				.eq(index).show()
				.siblings().hide();	//显示对应元素，其他元素隐藏		
	})
})
//产品颜色更换


//产品尺寸切换
$(function(){
	$(".pro_size li").click(function(){
		$(this).addClass("cur").siblings().removeClass("cur");//点击激活"cur"样式
		$(this).parent("ul").siblings("strong").text( $(this).text() );	//更换元素的text部分
	})
})
//产品的数量和价格联动
$(function(){
	var $span = $(".pro_price strong");
	var price = $span.text();//先取得总计的数值，此时因为数量为1 ，所以也就是单价
	$("#num_sort").change(function(){
		var num=$(this).val();//取得数量option的值val（）
		var amount = num*price;
		$span.text( amount );//把amount的值重新计入总计里
	});
})


//右侧产品评分的效果
$(function(){
	$("ul.rating li a").click(function(){//点击任何一个a标签都会激活函数
		var title = $(this).attr("title");//获得当前元素a的title标签
		alert("您给此商品的评分为："+title);
		var cl = $(this).parent().attr("class");//获取当前元素a的父元素 li 的class标签，即one等
		$(this).parent().parent().removeClass().addClass("rating " + cl +"star");
		//令当前元素a的父元素的父元素，即ul，移除class标签，新增class标签如 rating onestar
		//而不同的新增标签 如 onestar twostar，有不同的css样式，变成了绿色星
		$(this).blur();//去掉超链接的虚线框
		return false;//避免页面跳转
	})
})

/*最终购买输出*/
$(function(){
    var $product = $(".jnProDetail");
	$("#cart a").click(function (e) {        
		var pro_name = $product.find("h4:first").text();
		var pro_size = $product.find(".pro_size strong").text();
		var pro_color =  $(".color_change strong").text();
		var pro_num = $product.find("#num_sort").val();
	    var pro_price = $product.find(".pro_price strong").text();
		var dialog = "感谢您的购买。\n您购买的产品是："+pro_name+"；\n"+
				"尺寸是："+pro_size+"；\n"+
				"颜色是："+pro_color+"；\n"+
				"数量是："+pro_num+"；\n"+
				"总价是："+pro_price +"元。";
		alert(dialog);
		return false;//避免页面跳转
	});
})

//<div style='font-size:12px;font-weight:400;'></div>"