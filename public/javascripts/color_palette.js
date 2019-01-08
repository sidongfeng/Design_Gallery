var _$color_paletteElement = $('.palette_color');
const colorlist = {"#All":"All", "#ff3030":"Red","#ff9224": "Lime","#ffff6f": "Yellow","#53ff53":"Green","#0080ff":"Blue","#be77ff":"Purple","#00000f":"Black","#ffffff":"White"};

function hide_color_palette(){
	$('.color_palette_item_wrapper').css('visibility','hidden');
}
function show_color_palette(){
	$('.color_palette_item_wrapper').css('visibility','visible');
}

function _colorizePaletteItems(){
	$.each(_$color_paletteElement, function(i){ 
		if (colorlist[$(this).data('color')] == "All"){
			$(this).css('background',"linear-gradient(to right, #eea2a2 0%, #bbc1bf 19%, #57c6e1 42%, #b49fda 79%, #7ac5d8 100%)");
			//background-image: linear-gradient(to right, #00dbde 0%, #fc00ff 100%);
		}
		$(this).css('background-color', $(this).data('color') );
	})
}

function _toggleColorPalette(){
	var click_time = 0;
	$('.palette_color__main').on('click', function(){
		if (click_time % 2 == 0){
			setTimeout(show_color_palette,100);
		}else{
			setTimeout(hide_color_palette,570);
		}
		click_time += 1;
		$('.color').toggleClass('color_palette__opened');	
	})
}

function _initSetColor(){
	$('.palette_color').on('click', function(){
		var color = colorlist[$(this).data('color')];
		//console.log(color)
		if (color == "All"){
			_setColor("linear-gradient(to right, #eea2a2 0%, #bbc1bf 19%, #57c6e1 42%, #b49fda 79%, #7ac5d8 100%)");
		}else{
			_setColor($(this).data('color'));
		}
	})
}

function _setColor(color){
	$('.palette_color__main').css('background', color);
}

function colorRGBtoHex(color) {
    var rgb = color.split(',');
    var r = parseInt(rgb[0].split('(')[1]);
    var g = parseInt(rgb[1]);
    var b = parseInt(rgb[2].split(')')[0]);
    var hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    return hex;
 }

function _findColor(){
	if (colorRGBtoHex($('.palette_color__main').css('background')) == "#000000"){
		return "All"
	}else{
		return colorlist[colorRGBtoHex($('.palette_color__main').css('background'))]
	}
}

_colorizePaletteItems();
_toggleColorPalette();
_initSetColor();
