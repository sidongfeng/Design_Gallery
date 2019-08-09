$(document).ready(function(){
    const catArr = ["EDUCATION", "LIFESTYLE", "ENTERTAINMENT", "MUSIC_AND_AUDIO", "TOOLS", "PERSONALIZATION", "TRAVEL_AND_LOCAL", "NEWS_AND_MAGAZINES", "BOOKS_AND_REFERENCE", "BUSINESS", "FINANCE", "GAME", "SPORTS", "PRODUCTIVITY", "PHOTOGRAPHY", "HEALTH_AND_FITNESS", "TRANSPORTATION", "COMMUNICATION", "SOCIAL", "MEDIA_AND_VIDEO", "SHOPPING", "MEDICAL", "WEATHER", "LIBRARIES_AND_DEMO", "COMICS",
                    "MAPS_AND_NAVIGATION",
                    "VIDEO_PLAYERS_AND_EDITORS",
                    "GAME_CARD",
                    "FOOD_AND_DRINK",
                    "DATING",
                    "EVENTS",
                    "AUTO_AND_VEHICLES",
                    "ART_AND_DESIGN",
                    "PARENTING",
                    "HOUSE_AND_HOME",
                    "BEAUTY"];

    var images_urls = {};
    for (let i = 0; i < catArr.length; i++) {
        images_urls[catArr[i]] = [];
    }

    $.getJSON('./data/fake.json',function(result){
        for (let i = 0; i < result.length; i++) {
            let widget = result[i];
            setTimeout(function() {
                if (widget['category'].includes('GAME') && widget['category'] != 'GAME_CARD'){
                    images_urls['GAME'].push([widget['src'],widget['application_name']]);
                }else{
                    images_urls[widget['category']].push([widget['src'],widget['application_name']]);
                }
            },5000);
        }
    })
    console.log(images_urls)
    var html = "";
    for (let i = 0; i < catArr.length; i++) {
        html += '<figure class="effect-oscar  wowload fadeInUp">'
        html += '   <img src="../images/gallery/'+(i+1).toString()+'.jpg" alt="img01"/>'
        html += '   <figcaption>'
        html += '       <h2>'+catArr[i]+'</h2>'
        html += '       <p><br>'

        var max=5;
        if (images_urls[catArr[i]].length < max){
            max = images_urls[catArr[i]].length;
        }
        var img;
        for (let j = 0; j < max; j++) {
            img = images_urls[catArr[i]][[Math.floor(Math.random()*images_urls[catArr[i]].length)]];
            if (j==0){
                html += '       <a href="'+img[0]+'" title="'+img[1]+'" data-gallery="#blueimp-gallery-'+catArr[i]+'" class="gallery">VIEW MORE</a>'
            }else{
                html += '       <a href="'+img[0]+'" title="'+img[1]+'" data-gallery="#blueimp-gallery-'+catArr[i]+'" class="hide"></a>'
            }
        }
        html += '       </p>'
        html += '   </figcaption>'            
        html += '</figure>'
    }
    $( "#works" ).append(html)
	"use strict";

});	

	