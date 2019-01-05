var _$paletteElement = $('.palette_color');
const colorlist = {"#All":"All", "#FF3030":"Red","#FF9224": "Lime","#FFFF6F": "Yellow","#53FF53":"Green","#0080FF":"Blue","#BE77FF":"Purple","#000000":"Black","#FFFFFF":"White"};

function sleep(numberMillis) {
    var now = new Date();
    var exitTime = now.getTime() + numberMillis;
    while (true) {
        now = new Date();
        if (now.getTime() > exitTime)
            return;
    }
}
function hide_palette(){
	$('.palette_item_wrapper').css('visibility','hidden');
}
function show_palette(){
	$('.palette_item_wrapper').css('visibility','visible');
}

function _colorizePaletteItems(){
	$.each(_$paletteElement, function(i){ 
		if (colorlist[$(this).data('color')] == "All"){
			$(this).css('background',"linear-gradient(to right, #eea2a2 0%, #bbc1bf 19%, #57c6e1 42%, #b49fda 79%, #7ac5d8 100%)");
			//background-image: linear-gradient(to right, #00dbde 0%, #fc00ff 100%);
		}
		$(this).css('background-color', $(this).data('color') );
	})
}

function _togglePalette(){
	var click_time = 0;
	$('.palette_color__main').on('click', function(){
		if (click_time % 2 == 0){
			setTimeout(show_palette,100);
		}else{
			setTimeout(hide_palette,570);
		}
		click_time += 1;
		$('.palette').toggleClass('palette__opened');	
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
	//$('.wrapper').css('background', color);
}

_colorizePaletteItems();
_togglePalette();
_initSetColor();