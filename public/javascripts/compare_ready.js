var out = Array();
const color_threshold = 0.25;
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
    $.getJSON('./data/developers.json',function(result){
        for(let i = 0; i < result.length; i++){
            let p = result[i];
            for (let z = 0; z < ajaxData.colors.length; z++){
                if (p['colors'][ajaxData.colors[z]]>color_threshold){
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
        html += '               <img src="images/compare/big/'+d['icons']+'" alt="images/compare/small/'+d['icons']+'" />'
        html += '               <div class="image_overlay"></div>'
        html += '               <div class="add_to_cart">Add to Compare</div>'
        html += '               <div class="view_gallery">View gallery</div>  '              
        html += '               <div class="stats">'    	
        html += '                   <div class="stats-container">'
        html += '                       <span class="product_price">☆'+d['rating']+'</span>'
        html += '                       <span class="product_name">'+d['Developer']+'</span>'   
        html += '                       <p></p><p></p>'   
        //html += '                       <p>'+d['Developer']+'</p>'                                                          
        html += '                       <div class="product-options">'
        html += '                            <strong>Apps</strong>'
        for(let j = 0; j < Math.min(d['apps'].length,2); j++){
            html += '                            <span>'+d['apps'][j]+'</span>'
        };
        html += '                            <strong>COLORS</strong>'
        html += '                            <div class="colors">'
        // Create items array
        var items = Object.keys(d['colors']).map(function(key) {
            return [key, d['colors'][key]];
        });
        
        // Sort the array based on the second element
        items.sort(function(first, second) {
            return second[1] - first[1];
        });
        
        // Create a new array with only the first 5 items
        //console.log(items.slice(0, 5));
        for(let j = 0; j < 4; j++){
            html += '                                <div class="c-'+items[j][0].toLowerCase()+'"><span></span></div>'
        };
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
            html += '                   <li><img src="https://storage.googleapis.com/ui-collection/MyCompare/ '+src+'.png" alt="" /></li>'
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

	