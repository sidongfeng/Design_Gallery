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
	$('.palette_search:nth-child(2)').css('background-image', "url(../images/widgets/"+widgetlist["All"] );
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
		_setWidgetSearch($(this).data('widget'))
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

function _setWidgetSearch(widget){
	$('.palette_search:nth-child(2)').data('search',widget);
	$('.palette_search:nth-child(2)').css('background-image', "url(../images/widgets/"+widgetlist[widget] );
	var str = $('#go_search').attr('href').split('&');
	var location = "/search?btnType="+widget+"&"+str[1]+"&"+str[2]+"&"+str[3]+"&"+str[4]+"&"+str[5]+"&"+str[6];
	$('#go_search').attr('href',location); 
}

_widgetizePaletteItems();
_toggleWidgetPalette();
_initSetWidget();
