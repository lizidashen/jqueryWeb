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
	$("#"+skinName).addClass("selected")//此处应记住引号只包括#，不包括skinName
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
	var index=0;
	$("#jnImageroll div a").mouseover(function(){
		showImg(index);
	}).eq(0).mouseover();
})

function showImg(index){
	var $rollobj=$("#jnImgeroll");
	
}
	
			
