var _$paletteElement = $('.palette_category');
const categorylist = {"ALL": "ALL.png", "EDUCATION":"EDUCATION.png", "LIFESTYLE": "LIFESTYLE.png","ENTERTAINMENT":"ENTERTAINMENT.png", "MUSIC_AND_AUDIO":"MUSIC_AND_AUDIO.png", "BACK":"BACK.png",
				"TOOLS": "TOOLS.png", "PERSONALIZATION":"PERSONALIZATION.png",  "FINANCE":"FINANCE.png", "SPORTS":"SPORTS.png", "PHOTOGRAPHY":"PHOTOGRAPHY.png","BEAUTY":"BEAUTY.png",
				"NEWS_AND_MAGAZINES": "NEWS_AND_MAGAZINES.png", "BOOKS_AND_REFERENCE":"BOOKS_AND_REFERENCE.png",  "BUSINESS":"BUSINESS.png", "PRODUCTIVITY":"PRODUCTIVITY.png", "HEALTH_AND_FITNESS":"HEALTH_AND_FITNESS.png", 
				"TRANSPORTATION": "TRANSPORTATION.png", "COMMUNICATION":"COMMUNICATION.png",  "SOCIAL":"SOCIAL.png", "MEDIA_AND_VIDEO":"MEDIA_AND_VIDEO.png", "SHOPPING":"SHOPPING.png", 
				"MEDICAL": "MEDICAL.png", "WEATHER":"WEATHER.png",  "LIBRARIES_AND_DEMO":"LIBRARIES_AND_DEMO.png", "COMICS":"COMICS.png", "MAPS_AND_NAVIGATION":"MAPS_AND_NAVIGATION.png", 
				"VIDEO PLAYERS_AND_EDITORS": "VIDEO PLAYERS_AND_EDITORS.png", "FOOD_AND_DRINK":"FOOD_AND_DRINK.png",  "DATING":"DATING.png", "EVENTS":"EVENTS.png", "AUTO_AND_VEHICLES":"AUTO_AND_VEHICLES.png", 
				"GAME":"GAME.png", "MORE":"MORE.png","TRAVEL_AND_LOCAL":"TRAVEL_AND_LOCAL.png","ART_AND_DESIGN":"ART_AND_DESIGN.png", "PARENTING":"PARENTING.png","HOUSE_AND_HOME":"HOUSE_AND_HOME.png"}

function hide_category_palette(){
	$('.category_palette_item_wrapper').css('visibility','hidden');
}
function show_category_palette(){
	$('.category_palette_item_wrapper').css('visibility','visible');
}

function _categoryizePaletteItems(){
	$.each(_$paletteElement, function(i){ 
		$(this).css('background-image', "url(../images/category/"+categorylist[$(this).data('category')] );
	})
}

function _toggleCategoryPalette(){
	var click_time = 0;
	$('.palette_category__main').on('click', function(){
		if (click_time % 2 == 0){
			setTimeout(show_category_palette,100);
		}else{
			setTimeout(hide_category_palette,515);
		}
		click_time += 1;
		$('.category_palette').toggleClass('palette__opened');	
	})
}

function _initSetCategory(){
	var page = 0;
	$('.palette_category').on('click', function(){
		if ($(this).data('category') == 'MORE'){
			if (page == 0){
				$('.palette_category:nth-child(1)').data('category',"NEWS_AND_MAGAZINES");
				$('.palette_category:nth-child(2)').data('category',"BOOKS_AND_REFERENCE");
				$('.palette_category:nth-child(3)').data('category',"BUSINESS");
				$('.palette_category:nth-child(4)').data('category',"PRODUCTIVITY");
				$('.palette_category:nth-child(5)').data('category',"HEALTH_AND_FITNESS");
				$('.palette_category:nth-child(6)').data('category',"TRANSPORTATION");
				$('.palette_category:nth-child(7)').data('category',"COMMUNICATION");
				$('.palette_category:nth-child(8)').data('category',"SOCIAL");
				$('.palette_category:nth-child(9)').data('category',"GAME");
			}else if(page == 1){
				$('.palette_category:nth-child(1)').data('category',"LIBRARIES_AND_DEMO");
				$('.palette_category:nth-child(2)').data('category',"COMICS");
				$('.palette_category:nth-child(3)').data('category',"MAPS_AND_NAVIGATION");
				$('.palette_category:nth-child(4)').data('category',"VIDEO PLAYERS_AND_EDITORS");
				$('.palette_category:nth-child(5)').data('category',"BEAUTY");
				$('.palette_category:nth-child(6)').data('category',"DATING");
				$('.palette_category:nth-child(7)').data('category',"EVENTS");
				$('.palette_category:nth-child(8)').data('category',"AUTO_AND_VEHICLES");
				$('.palette_category:nth-child(9)').data('category',"ART_AND_DESIGN");
			}else if (page ==2){
				$('.palette_category:nth-child(1)').data('category',"PHOTOGRAPHY");
				$('.palette_category:nth-child(2)').data('category',"MEDIA_AND_VIDEO");
				$('.palette_category:nth-child(3)').data('category',"SHOPPING");
				$('.palette_category:nth-child(4)').data('category',"MEDICAL");
				$('.palette_category:nth-child(5)').data('category',"PARENTING");
				$('.palette_category:nth-child(6)').data('category',"HOUSE_AND_HOME");
				$('.palette_category:nth-child(7)').data('category',"TRAVEL_AND_LOCAL");
				$('.palette_category:nth-child(8)').data('category',"WEATHER");
				$('.palette_category:nth-child(9)').data('category',"SPORTS");
				$('.palette_category:nth-child(10)').data('category',"BACK");
			}
			_categoryizePaletteItems();
			page += 1;
		}else if ($(this).data('category') == 'BACK'){
			$('.palette_category:nth-child(1)').data('category',"ALL");
			$('.palette_category:nth-child(2)').data('category',"EDUCATION");
			$('.palette_category:nth-child(3)').data('category',"LIFESTYLE");
			$('.palette_category:nth-child(4)').data('category',"ENTERTAINMENT");
			$('.palette_category:nth-child(5)').data('category',"MUSIC_AND_AUDIO");
			$('.palette_category:nth-child(6)').data('category',"TOOLS");
			$('.palette_category:nth-child(7)').data('category',"PERSONALIZATION");
			$('.palette_category:nth-child(8)').data('category',"FINANCE");
			$('.palette_category:nth-child(9)').data('category',"FOOD_AND_DRINK");
			$('.palette_category:nth-child(10)').data('category',"MORE");
			_categoryizePaletteItems();
			page = 0;
		}else{
			_setCategory($(this).data('category'));
		}
	})
}

function _setCategory(category){
	//$('.palette_category__main').html(category);
	$('.palette_category__main').css('background-image', "url(../images/category/"+categorylist[category]);
}

function _findCategory(){
	let str = $('.palette_category__main').css('background-image');
	str = str.split('/')[5];
	str = str.split('.')[0];
	return str
}

_categoryizePaletteItems();
_toggleCategoryPalette();
_initSetCategory();
