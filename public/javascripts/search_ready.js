
$(document).ready(function(){

	"use strict";

    

        /*==================================

* Author        : "ThemeSine"

* Template Name : Travel HTML Template

* Version       : 1.0

==================================== */


        /*=========== TABLE OF CONTENTS ===========

1. Scroll To Top
2. Range js

======================================*/
    

    // 1. Scroll To Top 

		$(window).on('scroll',function () {

			if ($(this).scrollTop() > 600) {

				$('.return-to-top').fadeIn();

			} else {

				$('.return-to-top').fadeOut();

			}

		});

		$('.return-to-top').on('click',function(){

				$('html, body').animate({

				scrollTop: 0

			}, 1500);

			return false;

		});

    // 2. range js
        var h_array;
        var w_array;
        if (document.URL.split("&").length<6){
            h_array = [0,1280];
            w_array = [0,800];
        }else{
            var height = document.URL.split("&")[4].split("=")[1]
            var width = document.URL.split("&")[5].split("=")[1]
            h_array = [height.split("+")[0],height.split("+")[2]]
            w_array = [width.split("+")[0],width.split("+")[2]]
        }
        
        $( "#slider-range" ).slider({
            range: true,
            min: 0,
            max: 1280,
            values: h_array,
            slide: function( event, ui ) {
            $( "#height-slider" ).val(ui.values[ 0 ] + " - " + ui.values[ 1 ] );
            }
        });
        $( "#height-slider" ).val( $( "#slider-range" ).slider( "values", 0 ) +
        " - " + $( "#slider-range" ).slider( "values", 1 ) );
        
        $( "#slider-range-1" ).slider({
            range: true,
            min: 0,
            max: 800,
            values: w_array,
            slide: function( event, ui ) {
            $( "#width-slider" ).val(ui.values[ 0 ] + " - " + ui.values[ 1 ] );
            }
        });
        $( "#width-slider" ).val( $( "#slider-range-1" ).slider( "values", 0 ) +
        " - " + $( "#slider-range-1" ).slider( "values", 1 ) );
        

});	

	