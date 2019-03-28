var out = Array();
const _btnTypeArr = ["Button", "CheckBox", "Chronometer", "ImageButton", "ProgressBar", "RadioButton", "RatingBar", "SeekBar", "Spinner", "Switch", "ToggleButton"];
const colors = {"Cyan":"rgb(145,255,255)","Red":"#ff3030","Lime":"#ff9224", "Yellow":"#ffff6f","Green":"#53ff53","Blue":"#0080ff","Magenta":"#be77ff","Black":"#00000f","White":"#ffffff"};
var input_data_chart = {};
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
		var temp = {};
		for(let z = 0; z < _btnTypeArr.length; z++){
			for(let j = 0; j < out[i]['widgets'][_btnTypeArr[z]]['widgets'].length; j++){
				temp[out[i]['widgets'][_btnTypeArr[z]]['widgets'][j]['name']] = out[i]['widgets'][_btnTypeArr[z]]['widgets'][j];
			}
		}

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
					var temp2 = {};
					var temp2_order;
					for(let z = 0; z < out[i]['widgets']['Button']['names'].length; z++){
						temp2[out[i]['widgets']['Button']['names'][z]] = temp[out[i]['widgets']['Button']['names'][z]]['dimensions']['width'];
						// html = modal_img(html,temp[out[i]['widgets']['Button']['names'][z]])
						//html += '<img src="images/detail/'+out[i]['Developer']+'/'+out[i]['widgets']['Button']['names'][z]+'.png" style="max-width:250px">'
					}
					temp2_order = Object.keys(temp2).map(function(key) {
						return [key, temp2[key]];
					  });
					temp2_order.sort(function(first, second) {
					return first[1] - second[1];
					});
					// console.log(temp2_order)
					for(let z = 0; z < temp2_order.length; z++){
						html = modal_img(html,temp[temp2_order[z][0]])
					}
					html += '</div><br><br><hr>'
					html += '<div class="row">'
					html += '<div id="piechart_'+out[i]['Developer']+'_Button"></div>'
					input_data_chart['piechart_'+out[i]['Developer']+'_Button'] = out[i]["widgets"]["Button"]["colors"]
				}
				html += '</div>'
				html += '</li>'
			}else{
				html += '		<li class="'+class_name.toLowerCase()+'"><div class="row" style = "z-index:-1;">'
				if (out[i]['widgets'][class_name]['names'].length == 0){
					html += 'None';
				}else{
					var temp2 = {};
					var temp2_order;
					for(let z = 0; z < out[i]['widgets'][class_name]['names'].length; z++){
						temp2[out[i]['widgets'][class_name]['names'][z]] = temp[out[i]['widgets'][class_name]['names'][z]]['dimensions']['width'];
						// html = modal_img(html,temp[out[i]['widgets'][class_name]['names'][z]])
						// <img src="images/detail/'+out[i]['Developer']+'/'+out[i]['widgets'][class_name]['names'][z]+'.png" style="max-width:250px">
					}
					temp2_order = Object.keys(temp2).map(function(key) {
						return [key, temp2[key]];
					  });
					temp2_order.sort(function(first, second) {
					return first[1] - second[1];
					});
					// console.log(temp2_order)
					for(let z = 0; z < temp2_order.length; z++){
						html = modal_img(html,temp[temp2_order[z][0]])
					}
					html += '</div><br><br><hr>'
					html += '<div class="row">'
					html += '<div id="piechart_'+out[i]['Developer']+'_'+class_name+'"></div>'
					input_data_chart['piechart_'+out[i]['Developer']+'_'+class_name] = out[i]["widgets"][class_name]["colors"]
				}
				html += '</div>'
				html += '</li>'
			}
		}
		html += '	</ul>'
		html += '</li> <!-- .product -->'
	}
	$(".cd-products-columns").append(html);


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

	function compare2(property){
		return function(a,b){
			var value1 = a[property];
			var value2 = b[property];
			return value2 - value1;
		}
	}

	function modal_img(html,widget){
		var colors_Array = [];
		for (let i = 0; i < Object.keys(colors).length; i++){
			if (widget['color'][Object.keys(colors)[i]]>0.1){
				colors_Array.push({"c":Object.keys(colors)[i],"no":widget['color'][Object.keys(colors)[i]]});
			}
		}
		colors_Array.sort(compare2('no'))
		html += '<div id="'+ widget['name'] + '" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="gridModalLabel" style="display: none;" aria-hidden="true">'
		html += '   <div class="modal-dialog modal-xl" role="document">'
		html += '       <div class="modal-content">'
		
		html += '           <div class="modal-header">'
		html += '               <h5 class="modal-title"><a href="' + widget['url'] + '">' + widget['application_name'] + '</a></h5>'
		html += '               <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>'
		html += '           </div>'

		html += '           <div class="modal-body">'
		html += '               <div class="container-fluid">'
		html += '                   <div class="row">'
		html += '                       <div class="col-md-7" style="position:relative; zoom:0.5">'
		html += '                           <img src="images/detail/' + widget['Developer'] +'/widgets_SC_2/'+widget['src'].split('/')[widget['src'].split('/').length-1]+ '" style=" cursor: hand;"/>'
		html += '                       </div>'
		html += '                       <div class="col-md-5">'
		html += '                           <table class="table table-borderless">'
		html += '                               <tbody>'
		html += '                                   <tr>'
		html += '                                       <th scope="row">Package:</th>'
		html += '                                       <td style="word-break:break-all">' + widget['package_name'] + '</td>'
		html += '                                   </tr>'
		html += '                                   <tr>'
		html += '                                       <th scope="row">Category:</th>'
		html += '                                       <td>' + widget['category'] + '</td>'
		html += '                                   </tr>'
		html += '                                   <tr>'
		html += '                                       <th scope="row">Text:</th>'
		if(widget['text'] == 0){
			html +=	'	    	<td>' + " " + '</td>';
		}else{
			html +=	'	    	<td>' + widget['text'] + '</td>';
		}
		html += '                                   </tr>'
		html += '                                   <tr>'
		// html += '                                       <th scope="row">Font:</th>'
		// if(widget['font'] == ""){
		// 	html +=	'	    	<td>' + " " + '</td>';
		// }else{
		// 	html +=	'	    	<td>' + widget['font'] + '</td>';
		// }
		// html += '                                   </tr>'
		html += '                                   <tr>'
		html += '                                       <th scope="row">Class:</th>'
		html += '                                       <td>' + widget['widget_class'] + '</td>'
		html += '                                   </tr>'
		html += '                                   <tr>'
		html += '                                       <th scope="row">Coordinates:</th>'
		html += '                                       <td class="coords">[' + widget['coordinates']['from'] + '][' + widget['coordinates']['to'] + ']</td>'
		html += '                                   </tr>'
		html += '                                   <tr>'
		html += '                                       <th scope="row">Size:</th>'
		let btnSize = widget['dimensions']['width'] + 'x' + widget['dimensions']["height"];
		html += '                                       <td class="widSize">' + btnSize + '</td>'
		html += '                                   </tr>'
		html += '                                   <tr>'
		html += '                                       <th scope="row">Color:</th>'
		html += '                                       <td>'
		for (let z = 0; z < colors_Array.length; z++){
			html += '                                       <div class="row">'+'<div class="circle" style="background-color:'+colors[colors_Array[z]['c']]+'"></div>'
		}
		html += '                                       </td>'
		html += '                                   </tr>'
		html += '                                   <tr>'
		html += '                                       <th scope="row">Developer:</th>'
		html += '                                       <td>' + widget['Developer']+ '</td>'
		html += '                                   </tr>'
		// html += '                                   <tr>'
		// html += '                                       <th scope="row">Downloads:</th>'
		// html += '                                       <td>' + widget['downloads'] + '</td>'
		// html += '                                   </tr>'
		html += '                                   <tr>'
		html += '                                       <td align="center" colspan="2"><i>We only annotate the selected UI elements in the image.</i></td>'
		html += '                                   </tr>'
		html += '                               </tbody>'
		html += '                           </table>'
		html += '                       </div>'
		html += '                   </div>'
		html += '               </div>'
		html += '           </div>'

		html += '           <div class="modal-footer">'
		html += '               <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>'
		html += '           </div>'
		
		html += '       </div>'
		html += '   </div>'
		html += '</div>'
		html += '<div class="col-md-auto">'
		html += '   <img data-toggle="modal" data-target="#'+widget['name'] + '" class="img-fluid pb-1" src="images/detail/'+widget['Developer']+'/' + widget['name'] + '.png" style="max-width:250px; max-height:300px;cursor:pointer" />'
		html += '</div>'

		return html
	}

	google.charts.load('current', {'packages':['corechart']});
	google.charts.setOnLoadCallback(drawChart);
	function drawChart() {
		$.each(input_data_chart, function(k, v) {
			var data = google.visualization.arrayToDataTable([
				['Color', '%'],
				['Black', v['Black']],
				['Blue', v['Blue']],
				['Cyan', v['Cyan']],
				['Green', v['Green']],
				['Lime', v['Lime']],
				['Magenta', v['Magenta']],
				['Red', v['Red']],
				['White', v['White']],
				['Yellow', v['Yellow']]
			  ]);

			var options = {'title':'Color', 
			'width':280, 'height':170,
			pieSliceText: 'none',
			colors: ['#0d0e0e', '#6e8cd5', '#0fe7e7', '#26aa0c', 'rgb(243, 151, 14)','#bd32aa','rgb(194,24,7)','#fff','rgb(239,253,95)'],
			pieSliceTextStyle: {
					color: 'black'
				},
			is3D: true,
			};
			var chart = new google.visualization.PieChart(document.getElementById(k));
			chart.draw(data, options);
		});
	  }
});