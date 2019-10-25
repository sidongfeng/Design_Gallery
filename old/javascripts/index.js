$(document).ready(function(){
	img_dict = {}
	/* load database images */
	$.ajaxSettings.async = false;
	$.getJSON('./data/compo.json',function(result){
		for (let i = 0; i < result["compos"].length; i++) {
			let idx = result["compos"][i]["id"];
			let c = result["compos"][i]["class"];
			let html = '<li><img src="images/clip/'+c+'/'+idx+'.png" /></li>';
			$("#"+c).append(html);
			img_dict[c+idx] =result["compos"][i];
		}
	});
	console.log(img_dict)

	/* load upload images */
	$.ajaxSettings.async = false;
	$.getJSON('./data/compo.json',function(result){
		// bg
		var node = document.createElement("DIV");
		node.setAttribute("id", 'bg');
		node.setAttribute("class", 'position-absolute');
		var img = document.createElement("IMG");
		img.src = "images/clip/bg.jpg";
		node.append(img)
		document.getElementsByClassName("box")[0].appendChild(node);
		
		for (let i = 0; i < result["compos"].length; i++) {
			let c = result["compos"][i]["class"]
			let idx = result["compos"][i]["id"]
			let height = result["compos"][i]["height"]
			let width = result["compos"][i]["width"]
			let x = result["compos"][i]["row_min"]
			let y = result["compos"][i]["column_min"]	
			// if (c=="bg"){
			// 	html += ''
			// }
			
			let id = 'draggable_'+c+'_'+idx;
			let html = "";
			html += '	<div id="'+id+'" class="draggable position-absolute" style="top: '+x+'px; left: '+y+'px">';
			html += '		<a class="objects" data-toggle="tooltip" data-placement="top" title="'+c+': '+width+'x'+height+'">'
			html += '			<img class="image" src="images/clip/'+c+'/'+idx+'.png" id="'+id+'header">'
			html += '		</a>'
			html += '</div>'
			$(".box").append(html)

			// add hover and click 
			click_hoverElement('#'+id+'header');
		} 
	})

	/* allow tooltip */
	$(function () {
		$('[data-toggle="tooltip"]').tooltip()
	});

	/*选择纯色*/
	$(".boxbg td").click(function() {
		$(".boxbg td").removeClass("active");
		var c = $(this).attr("bgcolor");
		$(".boxbg td[bgcolor='"+c+"']").addClass("active");;
		$(".llll").css({
			"background": c
		});
	});
	/*选择图片*/
	load_pic_click()
	
	//tab
	//:eq() 选择器选取带有指定 index 值的元素。
	//index 值从 0 开始，所有第一个元素的 index 值是 0（不是 1）
	//siblings() 获得匹配集合中每个元素的同胞，通过选择器进行筛选是可选的。
	$(".type li").click(function () {
		$(".type li").eq($(this).index()).addClass("active").siblings().removeClass('active');
		$(".pic>ul").removeClass('on').eq($(this).index()).addClass("on");
		var firstli = $(".pic>ul").eq($(this).index()).children().first();
		var firstimg = firstli.children("img").attr('src');
		$(".llll").css({
			"background": "url("+firstimg+")",
			"background-size":"100% auto",
			"background-position":"center center ",
			"background-repeat":"no-repeat"
		});
	});
});
/*custom image*/
function change() {
	var pic = document.getElementById("preview"),
		file = document.getElementById("f");

	var ext=file.value.substring(file.value.lastIndexOf(".")+1).toLowerCase();

	// gif在IE浏览器暂时无法显示
	if(ext!='png'&&ext!='jpg'&&ext!='jpeg'){
		alert("Image support format: jpg, png");
		return;
	}
	var isIE = navigator.userAgent.match(/MSIE/)!= null,
		isIE6 = navigator.userAgent.match(/MSIE 6.0/)!= null;

	if(isIE) {
		file.select();
		var reallocalpath = document.selection.createRange().text;

		// IE6浏览器设置img的src为本地路径可以直接显示图片
		if (isIE6) {
			pic.src = reallocalpath;
		}else {
			// 非IE6版本的IE由于安全问题直接设置img的src无法显示本地图片，但是可以通过滤镜来实现
			pic.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='image',src=\"" + reallocalpath + "\")";
			// 设置img的src为base64编码的透明图片 取消显示浏览器默认图片
			pic.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';
		}
	}else {
		html5Reader(file);
	}
}

function html5Reader(file){
	var file = file.files[0];
	var reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onload = function(e){
		html = '<img src="'+this.result+'" />'
		$(".add").append(html)
		load_pic_click()
		// var pic = document.getElementById("preview");
		// pic.src=this.result;	
	}
}

// click element in red
// hover element in blue
function click_hoverElement(id){
	$(id).hover(function(){
		$(this).css("border-style", "solid");
		// $(this).css("border-width", "5px");
		$(this).css("border-color", "lightblue");
		
		}, function(){
			if (!$(this).hasClass('active1')) {
				$(this).css("border-style", "none");
			}else{
				$(this).css("border-color", "red");
			}
	});
	$(id).click(function(){
		if ($(this).hasClass('active1')) {
			$(this).removeClass('active1');
		} else {
			$(this).addClass('active1');
			$(this).css("border-color", "red");
		}
	});
}

function load_pic_click(){
	$(".pic li img").click(function(){
		var url = $(this).attr('src');
		img_info = img_dict[url.split('/')[2]+url.split('/')[3].split('.')[0]]
		if (img_info==undefined){
			// custom image
			var c = 'custom';
			var idx = 0;
			var height = 0;
			var width = 0;
		}else{
			// database image
			var c = img_info["class"]
			var idx = img_info["id"]
			var height = img_info["height"]
			var width = img_info["width"]
			var x = img_info["row_min"]
			var y = img_info["column_min"]
			url = 'images/clip/'+c+'/'+idx+'.png'
		}
		let id = 'draggable_'+c+'_'+idx;
		count = idx;
		while (document.getElementById(id)!=null){
			count++;
			id = 'draggable_'+c+'_'+count;
		}
		var activeNode = document.getElementsByClassName("active1");
		let html = "";
		if (activeNode.length>1 || activeNode.length==0){
			html += '	<div id="'+id+'" class="draggable position-absolute" style="top: 0px; left: 0px">';
			html += '		<a class="objects" data-toggle="tooltip" data-placement="top" title="'+c+': '+width+'x'+height+'">'
			html += '			<img class="image" src="'+url+'" id="'+id+'header">'
			html += '		</a>'
			html += '</div>'
			$(".box").append(html);
			click_hoverElement('#'+id+'header');
		}else{
			ele = document.getElementById(activeNode[0].id)
			clientWidth = $(ele.parentNode.parentNode).attr('data-original-title').replace(" ","").split(":")[1].split("x")[0];
			clientHeight = $(ele.parentNode.parentNode).attr('data-original-title').split("x")[1];
			//set a href title
			$(ele.parentNode.parentNode).attr('data-original-title',c+': '+clientWidth+'x'+clientHeight);
			// replace image
			$("#"+activeNode[0].id).attr("src", url);
		};
	});
}