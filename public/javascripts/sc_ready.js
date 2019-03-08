var out = Array();
const color_threshold = 0.5;
$(document).ready(function(){
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

    let ajaxData = {
        colors: getUrlParameter('color').split('+')
    };
    //console.log(ajaxData.colors)
    
    $.ajaxSettings.async = false;
    $.getJSON('./data/test.json',function(result){
        for(let i = 0; i < result.length; i++){
            let p = result[i];
            for (let z = 0; z < ajaxData.colors.length; z++){
                if (p['color'][ajaxData.colors[z]]>color_threshold){
                    out.push(p);
                    break;
                }
            }
        }
    });

    console.log(out)
    var html = '';

    for(let i = 0; i < out.length; i++){
        var d = out[i];
        html += '<div class="product">'
        /*
        html += '   <div class="info-large">'
        html += '       <h4>'+out['package_name']+'</h4>'
        html += '       <div class="sku">'
        html += '           PRODUCT SKU: <strong>89356</strong>'
        html += '       </div>'
        html += '       <div class="price-big">'
        html += '           <span>$43</span> $39'
        html += '       </div>'     
        html += '       <h3>COLORS</h3>'
        html += '       <div class="colors-large">'
        html += '            <ul>'
        html += '               <li><a href="" style="background:#222"><span></span></a></li>'
        html += '               <li><a href="" style="background:#6e8cd5"><span></span></a></li>'
        html += '           </ul>'
        html += '       </div>'

        html += '       <h3>SIZE</h3>'
        html += '       <div class="sizes-large">'
        html += '           <span>XS</span>'
        html += '       </div>'
        html += '       <button class="add-cart-large">Add To Cart</button>'                      
        html += '   </div>'
        */

        html += '   <div class="make3D">'
        html += '       <div class="product-front">'
        html += '           <div class="shadow"></div>'
        //html += '               <img src="'+d['ico-large']+'" alt="'+d['ico-small']+'" />'
        html += '               <img src="img/9.jpg" alt="img/3a2cc5c24d1adaf8ec79fb4693a16a71_icon.png" />'
        html += '               <div class="image_overlay"></div>'
        html += '               <div class="add_to_cart">Add to Compare</div>'
        html += '               <div class="view_gallery">View gallery</div>  '              
        html += '               <div class="stats">'    	
        html += '                   <div class="stats-container">'
        html += '                       <span class="product_price">☆'+d['rate']+'</span>'
        html += '                       <span class="product_name">'+d['application_name']+'</span>'    
        html += '                       <p>'+d['Developer']+'</p>'                                                          
        html += '                       <div class="product-options">'
        html += '                            <strong>Category</strong>'
        html += '                            <span>'+d['category']+'</span>'
        html += '                            <strong>COLORS</strong>'
        html += '                            <div class="colors">'
        html += '                                <div class="c-blue"><span></span></div>'
        html += '                                <div class="c-red"><span></span></div>'
        html += '                                <div class="c-white"><span></span></div>'
        html += '                                <div class="c-green"><span></span></div>'
        html += '                           </div>'
        html += '                       </div>'                 
        html += '                   </div>'          
        html += '               </div>'
        html += '           </div>'

        html += '       <div class="product-back">'
        html += '           <div class="shadow"></div>'
        html += '           <div class="carousel">'
        html += '               <ul class="carousel-container">'
        for(let j = 0; j < 4; j++){
            var src = d['uis'][j];
            html += '                   <li><img src="'+src+'" alt="" /></li>'
        };
        html += '               </ul>'
        html += '               <div class="arrows-perspective">'
        html += '                   <div class="carouselPrev">'
        html += '                       <div class="y"></div>'
        html += '                       <div class="x"></div>'
        html += '                   </div>'
        html += '                   <div class="carouselNext">'
        html += '                       <div class="y"></div>'
        html += '                       <div class="x"></div>'
        html += '                   </div>'
        html += '               </div>'
        html += '           </div>'
        html += '           <div class="flip-back">'
        html += '               <div class="cy"></div>'
        html += '               <div class="cx"></div>'
        html += '           </div>'
        html += '       </div>'
        html += '    </div>'
        html += '</div>'
    }
    $("#grid").append(html); 
    
    var products = document.getElementsByClassName("product");
    var height = products[products.length-1].offsetTop + 250;

    if (height>800){
        $("#grid").css("height",height+"px");
        $("#sidebar").css("height",height+"px");
    }
    

});	

	