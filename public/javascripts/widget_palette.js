var _$widget_paletteElement = $('.palette_widget');
const widgetlist = {"All": "All.png", "Chronometer":"Chronometer.png", "CompoundButton": "CompoundButton.png","ProgressBar":"ProgressBar.png", "CheckBox":"CheckBox.png", 
				"Button": "Button.png", "RadioButton":"RadioButton.png",  "RatingBar":"RatingBar.png", "SeekBar":"SeekBar.png", "Spinner":"Spinner.png", 
				"Switch":"Switch.png", "ToggleButton":"ToggleButton.png","ImageButton":"ImageButton.png"}

function hide_widget_palette(){
	$('.widget_palette_item_wrapper').css('visibility','hidden');
}
function show_widget_palette(){
	$('.widget_palette_item_wrapper').css('visibility','visible');
}

function _widgetizePaletteItems(){
	$.each(_$widget_paletteElement, function(i){ 
		$(this).css('background-image', "url(../images/widgets/"+widgetlist[$(this).data('widget')] );
	})
}

function _toggleWidgetPalette(){
	var click_time = 0;
	$('.palette_widget__main').on('click', function(){
		if (click_time % 2 == 0){
			setTimeout(show_widget_palette,100);
		}else{
			setTimeout(hide_widget_palette,570);
		}
		click_time += 1;
		$('.widget').toggleClass('widget_palette__opened');	
	})
}

function _initSetWidget(){
	$('.palette_widget').on('click', function(){
		_setWidget($(this).data('widget'));
	})
}

function _setWidget(widget){
	$('.palette_widget__main').css('background-image', "url(../images/widgets/"+widgetlist[widget]);
}

function _findWidget(){
	let str = $('.palette_widget__main').css('background-image');
	str = str.split('/')[5];
	str = str.split('.')[0];
	return str
}

_widgetizePaletteItems();
_toggleWidgetPalette();
_initSetWidget();
