var out = Array();
const _btnTypeArr = ["Button", "CheckBox", "Chronometer", "ImageButton", "ProgressBar", "RadioButton", "RatingBar", "SeekBar", "Spinner", "Switch", "ToggleButton"];
jQuery(document).ready(function($){
	function productsTable( element ) {
		this.element = element;
		this.table = this.element.children('.cd-products-table');
		this.tableHeight = this.table.height();
		this.productsWrapper = this.table.children('.cd-products-wrapper');
		this.tableColumns = this.productsWrapper.children('.cd-products-columns');
		this.products = this.tableColumns.children('.product');
		this.productsNumber = this.products.length;
		this.productWidth = this.products.eq(0).width();
		this.productsTopInfo = this.table.find('.top-info');
		this.featuresTopInfo = this.table.children('.features').children('.top-info');
		this.topInfoHeight = this.featuresTopInfo.innerHeight() + 30;
		this.leftScrolling = false;
		this.filterBtn = this.element.find('.filter');
		this.resetBtn = this.element.find('.reset');
		this.filtering = false,
		this.selectedproductsNumber = 0;
		this.filterActive = false;
		this.navigation = this.table.children('.cd-table-navigation');
		// bind table events
		this.bindEvents();
	}

	productsTable.prototype.bindEvents = function() {
		var self = this;
		//detect scroll left inside producst table
		self.productsWrapper.on('scroll', function(){
			if(!self.leftScrolling) {
				self.leftScrolling = true;
				(!window.requestAnimationFrame) ? setTimeout(function(){self.updateLeftScrolling();}, 250) : window.requestAnimationFrame(function(){self.updateLeftScrolling();});
			}
		});
		//select single product to filter
		self.products.on('click', '.top-info', function(){
			var product = $(this).parents('.product');
			if( !self.filtering && product.hasClass('selected') ) {
				product.removeClass('selected');
				self.selectedproductsNumber = self.selectedproductsNumber - 1;
				self.upadteFilterBtn();
			} else if( !self.filtering && !product.hasClass('selected') ) {
				product.addClass('selected');
				self.selectedproductsNumber = self.selectedproductsNumber + 1;
				self.upadteFilterBtn();
			}
		});
		//filter products
		self.filterBtn.on('click', function(event){
			event.preventDefault();
			if(self.filterActive) {
				self.filtering =  true;
				self.showSelection();
				self.filterActive = false;
				self.filterBtn.removeClass('active');
			}
		});
		//reset product selection
		self.resetBtn.on('click', function(event){
			event.preventDefault();
			if( self.filtering ) {
				self.filtering =  false;
				self.resetSelection();
			} else {
				self.products.removeClass('selected');
			}
			self.selectedproductsNumber = 0;
			self.upadteFilterBtn();
		});
		//scroll inside products table
		this.navigation.on('click', 'a', function(event){
			event.preventDefault();
			self.updateSlider( $(event.target).hasClass('next') );
		});
	}

	productsTable.prototype.upadteFilterBtn = function() {
		//show/hide filter btn
		if( this.selectedproductsNumber >= 2 ) {
			this.filterActive = true;
			this.filterBtn.addClass('active');
		} else {
			this.filterActive = false;
			this.filterBtn.removeClass('active');
		}
	}

	productsTable.prototype.updateLeftScrolling = function() {
		var totalTableWidth = parseInt(this.tableColumns.eq(0).outerWidth(true)),
			tableViewport = parseInt(this.element.width()),
			scrollLeft = this.productsWrapper.scrollLeft();

		( scrollLeft > 0 ) ? this.table.addClass('scrolling') : this.table.removeClass('scrolling');

		if( this.table.hasClass('top-fixed') && checkMQ() == 'desktop') {
			setTranformX(this.productsTopInfo, '-'+scrollLeft);
			setTranformX(this.featuresTopInfo, '0');
		}

		this.leftScrolling =  false;

		this.updateNavigationVisibility(scrollLeft);
	}

	productsTable.prototype.updateNavigationVisibility = function(scrollLeft) {
		( scrollLeft > 0 ) ? this.navigation.find('.prev').removeClass('inactive') : this.navigation.find('.prev').addClass('inactive');
		( scrollLeft < this.tableColumns.outerWidth(true) - this.productsWrapper.width() && this.tableColumns.outerWidth(true) > this.productsWrapper.width() ) ? this.navigation.find('.next').removeClass('inactive') : this.navigation.find('.next').addClass('inactive');
	}

	productsTable.prototype.updateTopScrolling = function(scrollTop) {
		var offsetTop = this.table.offset().top,
			tableScrollLeft = this.productsWrapper.scrollLeft();
		
		if ( offsetTop <= scrollTop && offsetTop + this.tableHeight - this.topInfoHeight >= scrollTop ) {
			//fix products top-info && arrows navigation
			if( !this.table.hasClass('top-fixed') && $(document).height() > offsetTop + $(window).height() + 200) { 
				this.table.addClass('top-fixed').removeClass('top-scrolling');
				if( checkMQ() == 'desktop' ) {
					this.productsTopInfo.css('top', '0');
					this.navigation.find('a').css('top', '0px');
				}
			}

		} else if( offsetTop <= scrollTop ) {
			//product top-info && arrows navigation -  scroll with table
			this.table.removeClass('top-fixed').addClass('top-scrolling');
			if( checkMQ() == 'desktop' )  {
				this.productsTopInfo.css('top', (this.tableHeight - this.topInfoHeight) +'px');
				this.navigation.find('a').css('top', (this.tableHeight - this.topInfoHeight) +'px');
			}
		} else {
			//product top-info && arrows navigation -  reset style
			this.table.removeClass('top-fixed top-scrolling');
			this.productsTopInfo.attr('style', '');
			this.navigation.find('a').attr('style', '');
		}

		this.updateLeftScrolling();
	}

	productsTable.prototype.updateProperties = function() {
		this.tableHeight = this.table.height();
		this.productWidth = this.products.eq(0).width();
		this.topInfoHeight = this.featuresTopInfo.innerHeight() + 30;
		this.tableColumns.css('width', this.productWidth*this.productsNumber + 'px');
	}

	productsTable.prototype.showSelection = function() {
		this.element.addClass('filtering');
		this.filterProducts();
	}

	productsTable.prototype.resetSelection = function() {
		this.tableColumns.css('width', this.productWidth*this.productsNumber + 'px');
		this.element.removeClass('no-product-transition');
		this.resetProductsVisibility();
	}

	productsTable.prototype.filterProducts = function() {
		var self = this,
			containerOffsetLeft = self.tableColumns.offset().left,
			scrollLeft = self.productsWrapper.scrollLeft(),
			selectedProducts = this.products.filter('.selected'),
			numberProducts = selectedProducts.length;

		selectedProducts.each(function(index){
			var product = $(this),
				leftTranslate = containerOffsetLeft + index*self.productWidth + scrollLeft - product.offset().left;
			setTranformX(product, leftTranslate);
			
			if(index == numberProducts - 1 ) {
				product.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
					setTimeout(function(){
						self.element.addClass('no-product-transition');
					}, 50);
					setTimeout(function(){
						self.element.addClass('filtered');
						self.productsWrapper.scrollLeft(0);
						self.tableColumns.css('width', self.productWidth*numberProducts + 'px');
						selectedProducts.attr('style', '');
						product.off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
						self.updateNavigationVisibility(0);
					}, 100);
				});
			}
		});

		if( $('.no-csstransitions').length > 0 ) {
			//browser not supporting css transitions
			self.element.addClass('filtered');
			self.productsWrapper.scrollLeft(0);
			self.tableColumns.css('width', self.productWidth*numberProducts + 'px');
			selectedProducts.attr('style', '');
			self.updateNavigationVisibility(0);
		}
	}
	
	productsTable.prototype.resetProductsVisibility = function() {
		var self = this,
			containerOffsetLeft = self.tableColumns.offset().left,
			selectedProducts = this.products.filter('.selected'),
			numberProducts = selectedProducts.length,
			scrollLeft = self.productsWrapper.scrollLeft(),
			n = 0;

		self.element.addClass('no-product-transition').removeClass('filtered');

		self.products.each(function(index){
			var product = $(this);
			if (product.hasClass('selected')) {
				n = n + 1;
				var leftTranslate = (-index + n - 1)*self.productWidth;
				setTranformX(product, leftTranslate);
			}
		});

		setTimeout(function(){
			self.element.removeClass('no-product-transition filtering');
			setTranformX(selectedProducts, '0');
			selectedProducts.removeClass('selected').attr('style', '');
		}, 50);
	}

	productsTable.prototype.updateSlider = function(bool) {
		var scrollLeft = this.productsWrapper.scrollLeft();
		scrollLeft = ( bool ) ? scrollLeft + this.productWidth : scrollLeft - this.productWidth;

		if( scrollLeft < 0 ) scrollLeft = 0;
		if( scrollLeft > this.tableColumns.outerWidth(true) - this.productsWrapper.width() ) scrollLeft = this.tableColumns.outerWidth(true) - this.productsWrapper.width();
		
		this.productsWrapper.animate( {scrollLeft: scrollLeft}, 200 );
	}


	// Todo: ***************

    let ajaxData = {
        developers: getUrlParameter('apps').split('+')
	};
	if (ajaxData.developers.includes('applockcheetah')){
		// Find and remove applockcheetah from an array
		var ii = ajaxData.developers.indexOf("applockcheetah");
		if(ii != -1) {
			ajaxData.developers.splice(ii, 1);
		}
		ajaxData.developers.push('Cheetah Mobile (AppLock &amp; AntiVirus)')
	}
    $.ajaxSettings.async = false;
    $.getJSON('./data/comparsion_widgets-2.json',function(result){
        for(let i = 0; i < result.length; i++){
            let p = result[i];
            for (let z = 0; z < ajaxData.developers.length; z++){
                if (p['Developer']==decodeURIComponent(ajaxData.developers[z])){
                    out.push(p);
                    break;
                }
            }
        }
	});
	// console.log(out)

	/* sort order of class to show more components */
	var class_order = {};
	for(let i = 0; i < _btnTypeArr.length; i++){
		class_order[_btnTypeArr[i]] = 0;
	};
	for(let i = 0; i < out.length; i++){
		for(let j = 0; j < _btnTypeArr.length; j++){
			class_order[_btnTypeArr[j]] += out[i]['widgets'][_btnTypeArr[j]]['names'].length;
		}
	}
	var class_order = Object.keys(class_order).map(function(key) {
		return [key, class_order[key]];
	  });
	class_order.sort(function(first, second) {
	return second[1] - first[1];
	});
	console.log(class_order);
	let html = '';
	for(let i = 0; i < class_order.length; i++){
		var class_name = class_order[i][0];
		if (class_name == 'Button'){
			html += '<li class="button1">Button</li>'
		}else{
			html += '<li class="'+class_name.toLowerCase()+'">'+class_name+'</li>'
		}
	}
	$(".cd-features-list").append(html);

	html = '';
    for(let i = 0; i < out.length; i++){

		html += '<li class="product">'
		html += '	<div class="top-info"">'
		html += '		<div class="check"></div>'
		html += '		<img src="images/compare/small/'+out[i]['icons']+'" alt="">'
		html += '		<h3>'+out[i]['Developer']+'</h3>'
		html += '	</div> <!-- .top-info -->'

		html += '	<ul class="cd-features-list">'
		html += '		<li class="apps"><br>'
		for(let j = 0; j < out[i]['apps'].length; j++){
			html += out[i]['apps'][j]+'<br><br>'
		}
		html += '		</li>'
		html += '		<li class="category"><br>'
		for(let j = 0; j < out[i]['category'].length; j++){
			html += out[i]['category'][j]+'<br><br>'
		}
		html += '		</li>'
		html += '		<li class="rating">☆ '+out[i]['rating']+'</li>'
		
		for(let j = 0; j < class_order.length; j++){
			var class_name = class_order[j][0];
			if (class_name == 'Button'){
				html += '		<li class="button1"><div class="row" style = "z-index:-1;">'
				if (out[i]['widgets']['Button']['names'].length == 0){
					html += 'None';
				}else{
					for(let z = 0; z < out[i]['widgets']['Button']['names'].length; z++){
						html += '<div class="col-auto"><img src="images/detail/'+out[i]['Developer']+'/'+out[i]['widgets']['Button']['names'][z]+'.png" style="max-width:250px"></div>'
					}
				}
				html += '</div></li>'
			}else{
				html += '		<li class="'+class_name.toLowerCase()+'"><div class="row" style = "z-index:-1;">'
				if (out[i]['widgets'][class_name]['names'].length == 0){
					html += 'None';
				}else{
					for(let z = 0; z < out[i]['widgets'][class_name]['names'].length; z++){
						html += '<div class="col-auto"><img src="images/detail/'+out[i]['Developer']+'/'+out[i]['widgets'][class_name]['names'][z]+'.png" style="max-width:250px"></div>'
					}
				}
				html += '</div></li>'
			}
		}

		

		// html += '		<li class="imagebutton"><div class="row">'
		// for(let j = 0; j < out[i]['widgets']['ImageButton']['names'].length; j++){
		// 	html += '<div class="col-auto"><img src="images/detail/'+out[i]['Developer']+'/'+out[i]['widgets']['ImageButton']['names'][j]+'.png"></div>'
		// }
		// html += '</div></li>'
		// html += '		<li>47.6</li>'
		// html += '		<li></li>'
		// html += '		<li></li>'
		// html += '		<li></li>'
		// html += '		<li>1</li>'
		// html += '		<li>3</li>'
		// html += '		<li></li>'
		html += '	</ul>'
			html += '</li> <!-- .product -->'
	}
	$(".cd-products-columns").append(html);
	// html += '	<ul class="cd-features-list">'
	// html += '		<li class="apps"><br>'
	// for(let j = 0; j < out[i]['apps'].length; j++){
	// 	html += out[i]['apps'][j]+'<br><br>'
	// }
	// html += '		</li>'
	// html += '		<li class="category"><br>'
	// for(let j = 0; j < out[i]['category'].length; j++){
	// 	html += out[i]['category'][j]+'<br><br>'
	// }
	// html += '		</li>'
	// html += '		<li class="rating">☆ '+out[i]['rating']+'</li>'
	// html += '		<li class="button"><div class="row">'
	// for(let j = 0; j < out[i]['widgets']['Button']['names'].length; j++){
	// 	html += '<div class="col-auto"><img src="images/detail/'+out[i]['Developer']+'/'+out[i]['widgets']['Button']['names'][j]+'.png"></div>'
	// }
	// html += '</div></li>'
	// html += '		<li class="imagebutton"><div class="row">'
	// for(let j = 0; j < out[i]['widgets']['ImageButton']['names'].length; j++){
	// 	html += '<div class="col-auto"><img src="images/detail/'+out[i]['Developer']+'/'+out[i]['widgets']['ImageButton']['names'][j]+'.png"></div>'
	// }
	// html += '</div></li>'
	// html += '		<li>47.6</li>'
	// html += '		<li></li>'
	// html += '		<li></li>'
	// html += '		<li></li>'
	// html += '		<li>1</li>'
	// html += '		<li>3</li>'
	// html += '		<li></li>'
	// html += '	</ul>'

	// Todo: ***************

	var comparisonTables = [];
	$('.cd-products-comparison-table').each(function(){
		//create a productsTable object for each .cd-products-comparison-table
		comparisonTables.push(new productsTable($(this)));
	});
	
	var windowScrolling = false;
	//detect window scroll - fix product top-info on scrolling
	$(window).on('scroll', function(){
		if(!windowScrolling) {
			windowScrolling = true;
			(!window.requestAnimationFrame) ? setTimeout(checkScrolling, 250) : window.requestAnimationFrame(checkScrolling);
		}
	});

	var windowResize = false;
	//detect window resize - reset .cd-products-comparison-table properties
	$(window).on('resize', function(){
		if(!windowResize) {
			windowResize = true;
			(!window.requestAnimationFrame) ? setTimeout(checkResize, 250) : window.requestAnimationFrame(checkResize);
		}
	});

	function getUrlParameter(sParam) {
        let sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;
        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    };

	function checkScrolling(){
		var scrollTop = $(window).scrollTop();
		comparisonTables.forEach(function(element){
			element.updateTopScrolling(scrollTop);
		});

		windowScrolling = false;
	}

	function checkResize(){
		comparisonTables.forEach(function(element){
			element.updateProperties();
		});

		windowResize = false;
	}

	function checkMQ() {
		//check if mobile or desktop device
		return window.getComputedStyle(comparisonTables[0].element.get(0), '::after').getPropertyValue('content').replace(/'/g, "").replace(/"/g, "");
	}

	function setTranformX(element, value) {
		element.css({
		    '-moz-transform': 'translateX(' + value + 'px)',
		    '-webkit-transform': 'translateX(' + value + 'px)',
			'-ms-transform': 'translateX(' + value + 'px)',
			'-o-transform': 'translateX(' + value + 'px)',
			'transform': 'translateX(' + value + 'px)'
		});
	}
});