
$(document).ready(function(){

    // Share
    !function(){function getStyles(config){ return "<style>"+config.selector+"{width:90px;height:20px}"+config.selector+" [class*=entypo-]:before{font-family:entypo,sans-serif}"+config.selector+" label{font-size:16px;cursor:pointer;margin:0;padding:5px 10px;border-radius:5px;background:"+config.button_background+";color:"+config.button_color+";-webkit-transition:all .3s ease;transition:all .3s ease}"+config.selector+" label:hover{opacity:.8}"+config.selector+" label span{text-transform:uppercase;font-size:.85em;font-family:Lato,sans-serif;font-weight:900;-webkit-font-smoothing:antialiased;padding-left:6px}"+config.selector+" .social{-webkit-transform-origin:50% 0;-ms-transform-origin:50% 0;transform-origin:50% 0;-webkit-transform:scale(0) translateY(-190px);-ms-transform:scale(0) translateY(-190px);transform:scale(0) translateY(-190px);opacity:0;-webkit-transition:all .4s ease;transition:all .4s ease;margin-left:-15px}"+config.selector+" .social.active{opacity:1;-webkit-transition:all .4s ease;transition:all .4s ease}"+config.selector+" .social.active.center{margin-left:-45px}"+config.selector+" .social.active.left{margin-left:-115px}"+config.selector+" .social.active.right{margin-left:10px}"+config.selector+" .social.active.top{-webkit-transform:scale(1) translateY(-90px);-ms-transform:scale(1) translateY(-90px);transform:scale(1) translateY(-90px)}"+config.selector+" .social.active.top.center ul:after{margin:35px auto;border-top:20px solid #6cdfea}"+config.selector+" .social.active.top.left ul:after{margin:35px 0 0 129px;border-top:20px solid #e34429}"+config.selector+" .social.active.top.right ul:after{margin:35px 0 0 10px;border-top:20px solid #6cdfea}"+config.selector+" .social.active.bottom{-webkit-transform:scale(1) translateY(45px);-ms-transform:scale(1) translateY(45px);transform:scale(1) translateY(45px);margin-top:-14px}"+config.selector+" .social.active.bottom.center ul:after{margin:-10px auto;border-bottom:20px solid #3b5998}"+config.selector+" .social.active.bottom.left ul:after{margin:-10px 0 0 129px;border-bottom:20px solid #e34429}"+config.selector+" .social.active.bottom.right ul:after{margin:-10px 0 0 10px;border-bottom:20px solid #6cdfea}"+config.selector+" .social ul{position:relative;left:0;right:0;width:180px;height:46px;color:#fff;background:#3b5998;margin:auto;padding:0;list-style:none}"+config.selector+" .social ul li{font-size:20px;cursor:pointer;width:60px;margin:0;padding:12px 0;text-align:center;float:left;display:block;height:22px;position:relative;z-index:2;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;-webkit-transition:all .3s ease;transition:all .3s ease}"+config.selector+" .social ul li:hover{color:rgba(0,0,0,.5)}"+config.selector+" .social ul:after{content:'';display:block;width:0;height:0;position:absolute;left:0;right:0;border-left:20px solid transparent;border-right:20px solid transparent}"+config.selector+" .social li[class*=twitter]{background:#6cdfea;padding:12px 0}"+config.selector+" .social li[class*=gplus]{background:#e34429;padding:12px 0}</style>"};var $;

    $ = jQuery;

    $.fn.share = function(opts) {
    var $body, $head;
    if ($(this).length === 0) {
        console.log("Share Button: No elements found.");
        return;
    }
    $head = $('head');
    $body = $('body');
    return $(this).each(function(i, el) {
        var $sharer, bubble, bubbles, click_link, close, config, open, parent, paths, protocol, set_opt, toggle,
        _this = this;
        $sharer = $(this);
        $sharer.addClass("sharer-" + i);
        $sharer.hide();
        if (opts == null) {
        opts = {};
        }
        config = {};
        config.url = opts.url;
        config.package_url = $sharer.parent()[0].innerHTML.split('href="')[1].split('">')[0];
        // config.text = opts.text || $('meta[name=description]').attr('content') || '';
        config.text = $('meta[name=description]').attr('content')
        config.app_id = opts.app_id;
        config.package_id = $sharer.parent()[0].textContent.split('       ')[2];
        config.image = $sharer.parent().parent()[0].childNodes[3].innerHTML.split('<img src="')[1].split('"')[0];
        config.flyout = opts.flyout || 'top center';
        config.button_color = opts.color || '#333';
        config.button_background = opts.background || '#e1e1e1';
        config.button_icon = opts.icon || 'export';
        config.button_text = typeof opts.button_text === 'string' ? opts.button_text : 'Share';
        set_opt = function(base, ext) {
        if (opts[base]) {
            return opts[base][ext] || config[ext];
        } else {
            return config[ext];
        }
        };
        config.twitter_url = set_opt('twitter', 'package_url');
        config.twitter_text = set_opt('twitter', 'text');
        config.twitter_image = set_opt('twitter', 'image');
        config.fb_url = set_opt('facebook', 'package_url');
        config.fb_caption = set_opt('facebook', 'caption');
        config.fb_text = set_opt('facebook', 'text');
        config.fb_image = set_opt('facebook', 'image');
        config.tumblr_url = set_opt('tumblr', 'package_url');
        config.tumblr_text = set_opt('tumblr', 'text');
        config.tumblr_image = set_opt('tumblr', 'image');
        config.pinterest_url = set_opt('pinterest', 'url');
        config.pinterest_image = set_opt('pinterest', 'image');
        config.pinterest_text = set_opt('pinterest', 'text');
        config.selector = "." + ($sharer.attr('class').split(" ").join("."));
        config.twitter_text = encodeURIComponent(config.twitter_text);
        if (typeof config.app_id === 'integer') {
        config.app_id = config.app_id.toString();
        }
        if (!$('link[href="http://weloveiconfonts.com/api/?family=entypo"]').length) {
        $("<link />").attr({
            rel: "stylesheet",
            href: "http://weloveiconfonts.com/api/?family=entypo"
        }).appendTo($("head"));
        }
        if (!$('link[href="http://fonts.googleapis.com/css?family=Lato:900"]').length) {
        $("<link />").attr({
            rel: "stylesheet",
            href: "http://fonts.googleapis.com/css?family=Lato:900"
        }).appendTo($("head"));
        }
        if (!$("meta[name='sharer" + config.selector + "']").length) {
        $('head').append(getStyles(config)).append("<meta name='sharer" + config.selector + "'>");
        }
        $(this).html("<label class='entypo-" + config.button_icon + "'><span>" + config.button_text + "</span></label><div class='social " + config.flyout + "'><ul><li class='entypo-tumblr' data-network='tumblr'></li><li class='entypo-twitter' data-network='twitter'></li><li class='entypo-pinterest' data-network='pinterest'></li></ul></div>");
        if (!window.FB && config.app_id && ($('#fb-root').length === 0)) {
        protocol = ['http', 'https'].indexOf(window.location.href.split(':')[0]) === -1 ? 'https://' : '//';
        $body.append("<div id='fb-root'></div><script>(function(a,b,c){var d,e=a.getElementsByTagName(b)[0];a.getElementById(c)||(d=a.createElement(b),d.id=c,d.src='" + protocol + "connect.facebook.net/en_US/all.js#xfbml=1&appId=" + config.app_id + "',e.parentNode.insertBefore(d,e))})(document,'script','facebook-jssdk');</script>");
        }
        paths = {
        twitter: "http://twitter.com/intent/tweet?text=" +config.package_id+" from "+config.twitter_text +" Image Link: "+ "&url=" + config.twitter_image + '&hashtags=MobileUIGallery,'+config.package_id.replace(/\s/g, ''),
        facebook: "https://www.facebook.com/sharer/sharer.php?u="+config.fb_url,
        tumblr: "https://www.tumblr.com/widgets/share/tool?url=" + config.tumblr_image+"&tags=MobileUIGallery,"+config.package_id+"&caption="+config.package_id+" from "+config.tumblr_text,
        pinterest: "http://pinterest.com/pin/create/button/?url=" + config.pinterest_url + "&media=" + config.pinterest_image + "&description=" + config.package_id+" from "+config.pinterest_text,
        };
        parent = $sharer.parent();
        bubbles = parent.find(".social");
        bubble = parent.find("" + config.selector + " .social");
        toggle = function(e) {
        e.stopPropagation();
        return bubble.toggleClass('active');
        };
        open = function() {
        return bubble.addClass('active');
        };
        close = function() {
        return bubble.removeClass('active');
        };
        click_link = function() {
        var link, popup;
        link = paths[$(this).data('network')];
        if (($(this).data('network') === 'facebook')) {
            window.fbAsyncInit = function () {
                FB.init({
                    appId: config.app_id, // App ID : Insert the APP ID of the APP you created here
                    status: true,
                });
            }
            if (!window.FB) {
            console.log("The Facebook JS SDK hasn't loaded yet.");
            return;
            }
            window.FB.ui({
                method: 'feed',
                link: config.fb_url,
                // picture: config.image,
                // name: config.package_id,
                // caption: config.fb_caption,
                // description: config.fb_text,
                display: 'popup',
            },function(response){});
            // Load the SDK Asynchronously. This is a very important part. It loads the Facebook javascript SDK automatically.
            (function (d) {
                var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
                if (d.getElementById(id)) { return; }
                js = d.createElement('script'); js.id = id; js.async = true;
                js.src = "//connect.facebook.net/en_US/all.js";
                ref.parentNode.insertBefore(js, ref);
            } (document));
        } else {
            popup = {
            width: 500,
            height: 350
            };
            popup.top = (screen.height / 2) - (popup.height / 2);
            popup.left = (screen.width / 2) - (popup.width / 2);
            window.open(link, 'targetWindow', "toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,left=" + popup.left + ",top=" + popup.top + ",width=" + popup.width + ",height=" + popup.height);
        }
        return false;
        };
        $sharer.find('label').on('click', toggle);
        $sharer.find('li').on('click', click_link);
        $body.on('click', function() {
        return bubbles.removeClass('active');
        });
        setTimeout((function() {
        return $sharer.show();
        }), 250);
        return {
        toggle: toggle.bind(this),
        open: open.bind(this),
        close: close.bind(this),
        options: config,
        self: this
        };
    });
    };
    }.call(this)

    // ---Share

	"use strict";

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

        }, 200);

        return false;

    });

    // 2. range js
        var h_array;
        var w_array;
        if (document.URL.split("&").length<6){
            h_array = [0,1280];
            w_array = [0,800];
        }else{
            var height = document.URL.split("&")[5].split("=")[1]
            var width = document.URL.split("&")[6].split("=")[1]
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

	