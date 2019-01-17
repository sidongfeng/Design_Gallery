function hide_search_palette(){
	$('.search_palette_item_wrapper').css('visibility','hidden');
}
function show_search_palette(){
	$('.search_palette_item_wrapper').css('visibility','visible');
}

function _toggleSearchPalette(){
	var click_time = 0;
	$('.palette_search__main').on('mouseover mouseout', function(event){
		if (click_time % 2 == 0){
			setTimeout(show_search_palette,100);
		}else{
			setTimeout(hide_search_palette,570);
		}
		click_time += 1;
		$('.search').toggleClass('search_palette__opened');	
	})
}



_toggleSearchPalette();