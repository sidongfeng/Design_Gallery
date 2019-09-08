var img_dict = {};
var split = {"p":{},"c":{},"a":{},"sf":{},"sl":{}}
const dict = {"platform": ['mobile','website'],
                    "color" : ['grey','brown','pink','black','white','green','blue','red','yellow'],
                    "app" : ['weather','social','sport','news','health','game','finance','travel','food','ecommerce','music'],
                    "screen_function" : ['profile','signup','checkout','landing'],
                    "screen_layout" : ['chart','grid','form','list','dashboard']};

yellow = ["yellow", "orange", "gold","golden"]
red = ["red","Maroon"]
blue = ["blue", "light blue","dark blue","darkblue","sky blue","azure","sky","indigo"]
green = ["green", "darkgreen","aquamarine"]
white = ["white","clean", "snow", "light white clean minimal theme", "black white", "#ffffff", "light mode"]
black = ["black", "dark","dark mode", "dark ui", "black dark theme blur", "night mode"]
pink = ["pink","rose", "blush", "coral"]
brown = ["brown","sandy", "chocolate", "sepia"]
grey = ["grey","silver", "darkGray", "dull", "gray"]
music = ["music", "music player", "musicplayer", "music_player","music-player","music players","musicplayers","music_players","apple_music", "apple music","apple-music","playlist", "music app","musicapp","music_app", "music application","music_applications", "music applications","music player app","music player ui"]
ecommerce = ["ecommerce","e commerce", "e-commerce", "commerce", " e_commerce", "e-shop","online_store","ikea", "eshop", "online_shop","adidas", "nike","footwear", "clothing", "clothes","webshop"]
food = ["salad","bakery", "steak", "cake","recipe","recipes","food","foods", "dessert", "juice","drink", "food_app","food app","food application", "foodapp","food_application","restaurant"]
travel = ["travel", "hiking","travelling","national_parks","national_park","travel_agency","tourist","travel_app", "tours","tourism","roadtrip","trip","vacation","travelapp","travel app","travelapps","travel application","travel applications","travel_applications"]
finance = ["bank", "finance", "banking","finances","finance_app","finance app","finance application","finance_app","finance_application","banking app","banding_app","bank application","bank app","bank_app","financial","investing","insurance","wallet"]
game = ["game","videogame","video game","games"]
health = ["health", "healthy","fitness"]
news = ["news","newspaper","news design",  "news grid",  "news list",  "newstemplate", "news app","news feed"]
sport = ["sport","sports","gym","workout","exercising","exercise","exercises"]
social=["socialnetwork", "social network", "social networking", "blog", "messenger", "facebook", 'instagram', 'dating', 'chat',"chatting"]
weather = ["weather","weather app","weather_app","temperature"]
medical = [ "medical", "healthcare", "hospital", "pharmacy", "medicine"]
book = ["magazine", "magazines", "reading", "bookstore", "digitalreading", "digital reading", "digital_reading", "digital bookstroe", "digital_bookstroe","digitalbookstroe", "book","books"]
landing = ["landing page", "landing pages","landingpage","landingpages","landing_pages","landing_page","landing"]
checkout = [ "check_out", "check out", "checkout", "payment"]
signup = ["sign up","signup","sign_up","login","log in","log_in","register"]
profile = ["profile"]
search = ["search", "searching"]
dashboard = ["dashboard"]
list = ["list","listing", "paylist", "todolist", "playlsit", "dropdown", "watchlist", "task list", "tracklist", "empty list", "project list", "wishlist", "shop list", "order list", "waitlist", "shopping list", "to-do list"]
form = ["form"]
grid = ["grid"]
chart = ["chart"]
simple = ["simple","clean", "minimal","minimalistic"]
flat = ["flat","flat design","flat_design","flatdesign","flat ui","flat_ui_design"]
gradient = ["color gradient", "color_gradient", "gradient color","gradient"]
illustration = ["illustration"]
ui = ["ui", "user interface","user-interface", "user_interface", "user interface design", "user_interface_design", "uidesign", "ui design", "ui_design", "uiuxdesign", "uxuidesign", "uiux design", "uxui design", "uiux_design", "uxui_design", "uiux-design", "uxui-design", "uiux", "uidesigner", "ui_ux", "ui.ux", "ux.ui", "uxui", "ui-ux", "ux-ui", "app-ui", "daily ui", "dailyui", "daily_ui", "30_days_of_ui", "30 days of ui"]
mobile = ["iphone", "iphonex","iphone_x", "iphone8", "iphone7", "ios_11","iphone_app","ipad_pro", "travelapp", "ios11","app", "application", "android app", "app-design",  "app design","app_design", "appdesign","ios app", "ios_app", "ios_design", "android_app", "app_development","mobile_application", "application_design", "mobile app","mobileapp","mobile", "mobile design", "mobiledesign", "mobile website", "mobilewebsite","mobile_web","ios"]
website = ["website","webdesigner", "web-design", "design_for_website","websitedesign", "web app", "webpage", "website", "web", "website design","webpage design"]
// "mobile_application","mobile app","mobileapp", "mobile", "mobile design", "mobiledesign",


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
}

function categorization(){
    tags = ['mobile','website','ui','illustration','gradient','flat','simple','chart','grid','form','list','dashboard','search','profile','signup','checkout','landing','book','medical','weather','social','sport','news','health','game','finance','travel','food','ecommerce','music','grey','brown','pink','black','white','green','blue','red','yellow']
    d = {};
    for (i = 0; i < tags.length; i++) {
        t = tags[i];
        d[t] = eval(t);
    }
    return d
}

function normalize(listofString){
    var category = categorization()
    var result = [];
    for (i = 0; i < listofString.length; i++) {
        string = listofString[i]
        b = false
        Object.keys(category).forEach(function(key) {
            if (category[key].indexOf(string) > -1){
                result.push(key)
                b = true
            }
        });
        if (!b){result.push(string)}
    }
    return result
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function loadImages() { //loadSearchPage
    let ajaxData = {
        mode: getUrlParameter('mode'),
        text: getUrlParameter('text').toLowerCase().split('+').filter(function (el) {
            return el != "";
        }),
        platform : getUrlParameter('platform')=='1',
        color : getUrlParameter('color')=='1',
        app : getUrlParameter('app')=='1',
        screen_function : getUrlParameter('screen_function')=='1',
        screen_layout : getUrlParameter('screen_layout')=='1',
    };
    structure=false;
    if (ajaxData.platform|| ajaxData.color||ajaxData.app||ajaxData.screen_function||ajaxData.screen_layout){
        structure=true;
    }

    var return_imgs = {};
    for (let i = 0; i < ajaxData.text.length+1; i++) {return_imgs[i] = [];}
    if (ajaxData.mode=="gallery"){
        var search_text = normalize(ajaxData.text);
    }else{
        var search_text = ajaxData.text;
    }
    $.ajaxSettings.async = false;
    $.getJSON('./data/semantic.json',function(result){
        if (ajaxData.platform){for(let j = 0; j < dict['platform'].length; j++){split["p"][dict['platform'][j]]=[]}}
        if (ajaxData.color){for(let j = 0; j < dict['color'].length; j++){split["c"][dict['color'][j]]=[]}}
        if (ajaxData.app){for(let j = 0; j < dict['app'].length; j++){split["a"][dict['app'][j]]=[]}}
        if (ajaxData.screen_function){for(let j = 0; j < dict['screen_function'].length; j++){split["sf"][dict['screen_function'][j]]=[]}}
        if (ajaxData.screen_layout){for(let j = 0; j < dict['screen_layout'].length; j++){split["sl"][dict['screen_layout'][j]]=[]}}
        for (let i = 0; i < result.length; i++) {
            let img = result[i];
            let id = img["id"]
            let origin_tags = img['origin'];
            let normalize_tags = Object.keys(img["normalise"]);
            // let predict_tags = img['new']
            var title = img['title'].toLowerCase().split(' ');
            normalize_tags_plus = [];
            $.each(normalize_tags.concat(title), function(i, el){
                if($.inArray(el, normalize_tags_plus) === -1) normalize_tags_plus.push(el);
            });
            origin_tags_plus = [];
            $.each(origin_tags.concat(title), function(i, el){
                if($.inArray(el, origin_tags_plus) === -1) origin_tags_plus.push(el);
            });
            img_dict[id] = img
            
            if (ajaxData.mode=="gallery"){
                intersection_no = search_text.filter(value => -1 !== normalize_tags_plus.indexOf(value)).length;
                if (intersection_no==ajaxData.text.length){
                    mark = 0
                    for (let j = 0; j < ajaxData.text.length; j++) {mark += (img["normalise"][ajaxData.text[j]]==undefined ? 0.5 : img["normalise"][ajaxData.text[j]]);}
                    return_imgs[intersection_no].push(Array(id,mark));
                    if (ajaxData.platform){for(let j = 0; j < dict['platform'].length; j++){if (normalize_tags_plus.indexOf(dict['platform'][j])>-1){split["p"][dict['platform'][j]].push(id)}}}
                    if (ajaxData.color){for(let j = 0; j < dict['color'].length; j++){if (normalize_tags_plus.indexOf(dict['color'][j])>-1){split["c"][dict['color'][j]].push(id)}}}
                    if (ajaxData.app){for(let j = 0; j < dict['app'].length; j++){if (normalize_tags_plus.indexOf(dict['app'][j])>-1){split["a"][dict['app'][j]].push(id)}}}
                    if (ajaxData.screen_function){for(let j = 0; j < dict['screen_function'].length; j++){if (normalize_tags_plus.indexOf(dict['screen_function'][j])>-1){split["sf"][dict['screen_function'][j]].push(id)}}}
                    if (ajaxData.screen_layout){for(let j = 0; j < dict['screen_layout'].length; j++){if (normalize_tags_plus.indexOf(dict['screen_layout'][j])>-1){split["sl"][dict['screen_layout'][j]].push(id)}}}
                }
            }else{
                intersection_no = ajaxData.text.filter(value => -1 !== origin_tags_plus.indexOf(value)).length;
                if (intersection_no==ajaxData.text.length){
                    return_imgs[intersection_no].push(Array(id,ajaxData.text.length));
                    if (ajaxData.platform){for(let j = 0; j < dict['platform'].length; j++){if (origin_tags_plus.indexOf(dict['platform'][j])>-1){split["p"][dict['platform'][j]].push(id);}}}
                    if (ajaxData.color){for(let j = 0; j < dict['color'].length; j++){if (origin_tags_plus.indexOf(dict['color'][j])>-1){split["c"][dict['color'][j]].push(id)}}}
                    if (ajaxData.app){for(let j = 0; j < dict['app'].length; j++){if (origin_tags_plus.indexOf(dict['app'][j])>-1){split["a"][dict['app'][j]].push(id)}}}
                    if (ajaxData.screen_function){for(let j = 0; j < dict['screen_function'].length; j++){if (origin_tags_plus.indexOf(dict['screen_function'][j])>-1){split["sf"][dict['screen_function'][j]].push(id)}}}
                    if (ajaxData.screen_layout){for(let j = 0; j < dict['screen_layout'].length; j++){if (origin_tags_plus.indexOf(dict['screen_layout'][j])>-1){split["sl"][dict['screen_layout'][j]].push(id)}}}
                }
            }
        }
    })
    $.ajaxSettings.async = true;
    $(".spinner").remove();

    // for (let i = 0; i < Object.keys(return_imgs).length; i++) {return_imgs[i] = shuffle(return_imgs[i]);}
    result = return_imgs[Object.keys(return_imgs).length-1];
    result.sort(function(a, b){return b[1]-a[1]});
    R = []
    for (let i = 0; i < result.length; i++) {R.push(result[i][0]);}
    result = R;

    console.log("get "+return_imgs[Object.keys(return_imgs).length-1].length.toString()+" images");
    html = ""
    html += '<div class="container">'
    html += '   <div class="row">'
    html += '       <h1 class="pb-5">'
    if ((ajaxData.platform||ajaxData.color||ajaxData.app||ajaxData.screen_function||ajaxData.screen_layout)==false){
        html += ajaxData.mode+' - '+ajaxData.text.join(' ')+': '+result.length.toString()+' images'
    }else{
        html += ajaxData.mode+' - '+ajaxData.text.join(' ')
    }
    html += '       </h1>'
    html += '   </div>'
    html += '</div>'
    $(".demo").append(html);
    return [result,ajaxData]
}
function showImages(imgs, no, ajaxData){
    
    if ((ajaxData.platform||ajaxData.color||ajaxData.app||ajaxData.screen_function||ajaxData.screen_layout)==false){
        if (imgs.length != 0){
            let output;
            if (imgs.length>no){output = no;}else{output = imgs.length;}
            
            let html = '';
            for(let j = 0; j < output; j++){
                let id = imgs.shift();
                // let src = "https://storage.googleapis.com/ui-collection/Semantic/"+id.toString()+".png";
                // let dribbble_src = "https://www.dribbble.com/shots/"+id
                // var tags;
                // if (getUrlParameter('mode')=="gallery"){
                //     tags = [...new Set(img_dict[id][1])]
                // }else{
                //     tags = [...new Set(img_dict[id][0])]
                // }
                html = generate_html(html,id)
            }
    
            $(".demo").append(html);    // This will be the div where our content will be loaded
        }else{
            $("#endPage").removeClass("loader").append("End of Page.");
            $(window).unbind('scroll');
        }
    }else{
        let html = '';
        let thtml = '';
        count = 0
        html += '<div class="container">'
        if (ajaxData.color){

            thtml += '<div class="row">'
            thtml += '<div class="col-sm-12">'
            thtml += '<div class="d-flex justify-content-center">'
            thtml += '<div class="form-inline">'

            for(let j = 0; j < dict['color'].length; j++){
                let tag = dict['color'][j]
                if (split['c'][tag].length == 0){continue;}
                thtml += '<a class="btn btn-success m-2 p-2" href="#'+tag+'">'+tag+"</a>"

                html += '<div class="row" id="'+tag+'"><div class="col-sm-12"><hr /><h1>'
                html += tag+': '+split['c'][tag].length+' images'
                html += '</h1><hr /></div></div>'
                html += '<div class="row">'
                split['c'][tag] = shuffle(split['c'][tag])
                for(let z = 0; z < Math.min(split['c'][tag].length,32); z++){
                    // html += '<div class="col-sm-4">'
                    let id = split['c'][tag][z];
                    html = generate_html(html,id)
                    // html += '</div>'
                }
                html += '</div>'
            }

            thtml += '</div>'
            thtml += '</div>'
            thtml += '</div>'
            thtml += '</div>'
            count++;
        }
        if (ajaxData.app){
            thtml += '<div class="row">'
            thtml += '<div class="col-sm-12">'
            thtml += '<div class="d-flex justify-content-center">'
            thtml += '<div class="form-inline">'

            for(let j = 0; j < dict['app'].length; j++){
                let tag = dict['app'][j]
                if (split['a'][tag].length == 0){continue;}
                thtml += '<a class="btn btn-success m-2 p-2" href="#'+tag+'">'+tag+"</a>"

                html += '<div class="row" id="'+tag+'"><div class="col-lg-12"><hr /><h1>'
                html += tag+': '+split['a'][tag].length+' images'
                html += '</h1><hr /></div></div><div class="row">'
                for(let z = 0; z < Math.min(split['a'][tag].length,32); z++){
                    let id = split['a'][tag][z];
                    html = generate_html(html,id)
                }
                html += '</div>'
            }

            thtml += '</div>'
            thtml += '</div>'
            thtml += '</div>'
            thtml += '</div>'
            count++;
        }
        if (ajaxData.screen_function){
            thtml += '<div class="row">'
            thtml += '<div class="col-sm-12">'
            thtml += '<div class="d-flex justify-content-center">'
            thtml += '<div class="form-inline">'

            for(let j = 0; j < dict['screen_function'].length; j++){
                let tag = dict['screen_function'][j]
                if (split['sf'][tag].length == 0){continue;}
                thtml += '<a class="btn btn-success m-2 p-2" href="#'+tag+'">'+tag+"</a>"

                html += '<div class="row" id="'+tag+'"><div class="col-lg-12"><hr /><h1>'
                html += tag+': '+split['sf'][tag].length+' images'
                html += '</h1><hr /></div></div><div class="row">'
                for(let z = 0; z < Math.min(split['sf'][tag].length,32); z++){
                    let id = split['sf'][tag][z];
                    html = generate_html(html,id)
                }
                html += '</div>'
            }

            thtml += '</div>'
            thtml += '</div>'
            thtml += '</div>'
            thtml += '</div>'
            count++;
        }
        if (ajaxData.screen_layout){
            thtml += '<div class="row">'
            thtml += '<div class="col-sm-12">'
            thtml += '<div class="d-flex justify-content-center">'
            thtml += '<div class="form-inline">'

            for(let j = 0; j < dict['screen_layout'].length; j++){
                let tag = dict['screen_layout'][j]
                if (split['sl'][tag].length == 0){continue;}
                thtml += '<a class="btn btn-success m-2 p-2" href="#'+tag+'">'+tag+"</a>"

                html += '<div class="row" id="'+tag+'"><div class="col-sm-12"><hr /><h1>'
                html += tag+': '+split['sl'][tag].length+' images'
                html += '</h1><hr /></div></div><div class="row">'
                for(let z = 0; z < Math.min(split['sl'][tag].length,32); z++){
                    let id = split['sl'][tag][z];
                    html = generate_html(html,id)
                }
                html += '</div>'
            }

            thtml += '</div>'
            thtml += '</div>'
            thtml += '</div>'
            thtml += '</div>'
            count++;
        }
        if (ajaxData.platform){
            thtml += '<div class="row">'
            thtml += '<div class="col-sm-12">'
            thtml += '<div class="d-flex justify-content-center">'
            thtml += '<div class="form-inline">'

            for(let j = 0; j < dict['platform'].length; j++){
                let tag = dict['platform'][j]
                if (split['p'][tag].length == 0){continue;}
                thtml += '<a class="btn btn-success m-2 p-2" href="#'+tag+'">'+tag+"</a>"

                html += '<div class="row" id="'+tag+'"><div class="col-lg-12"><hr /><h1>'
                html += tag+': '+split['p'][tag].length+' images'
                html += '</h1><hr /></div></div><div class="row">'
                for(let z = 0; z < Math.min(split['p'][tag].length,32); z++){
                    let id = split['p'][tag][z];
                    html = generate_html(html,id)
                }
                html += '</div>'
            }

            thtml += '</div>'
            thtml += '</div>'
            thtml += '</div>'
            thtml += '</div>'
            count++;
        }
        html += '</div>'
        imgs = []
        $(".demo").append(html);
        $("#endPage").removeClass("loader").append("End of Page.");
        $(window).unbind('scroll');

        $(".service_inside").append(thtml);
        document.getElementById("service").style.height = (90+70*count).toString()+"px";
    }
}


function generate_html(html,id){
    // let src = "https://storage.googleapis.com/ui-collection/Semantic/"+id+".png";
    let src = "./images/dribbble_crawl_dataset/"+id+".png";
    let dribbble_src = "https://www.dribbble.com/shots/"+id
    let origin = img_dict[id]['origin']
    let news = img_dict[id]['new']
    let title = img_dict[id]['title']
    let by = img_dict[id]['by']
    let by_href = img_dict[id]['by_href']
    let fo = img_dict[id]['for']
    let fo_href = img_dict[id]['for_href']
    let colors = img_dict[id]['colors'].split("+")
    let views = img_dict[id]['views']
    let likes = img_dict[id]['likes']
    let saves = img_dict[id]['saves']
    let date = img_dict[id]['date']

    html += '<div id="img_'+ id + '" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="gridModalLabel" style="display: none;" aria-hidden="true">'
    html += '   <div class="modal-dialog modal-xl" role="document">'
    html += '       <div class="modal-content">'

    html += '           <div class="modal-header">'
    html += '               <div class="container">'
    html += '                   <div class="row">'
    html += '                       <div class="modal-title mb-1 h3">' + title + '</div>'
    html += '                       <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>'
    html += '                   </div>'
    html += '                   <div class="row">'
    html += '                       <p class="mr-1">by</p>'
    html += '                       <a class="mr-1" href="'+by_href+'">'+by+'</a>'
    if (fo != " "){
        html += '                   <p class="mr-1">for</p>'
        html += '                   <a href="'+fo_href+'">'+fo+'</a>'
    }
    html += '                   </div>'
    html += '               </div>'
    html += '           </div>'

    html += '           <div class="modal-body">'
    html += '               <div class="container-fluid">'
    html += '                   <div class="row">'
    html += '                       <div class="col-md-7" style="position:relative;">'
    html += '                           <a target="_blank" href="'+dribbble_src+'"><img src="' + src + '" style="width:1000px; cursor: hand;"/></a>'
    html += '                       </div>'
    html += '                       <div class="col-md-5">'
    html += '                           <table class="table table-borderless">'
    html += '                               <tbody>'
    html += '                                   <tr>'
    html += '                                       <th scope="row"><svg xmlns="http://www.w3.org/2000/svg" style="width:20px;" enable-background="new 0 0 24 24" viewBox="0 0 24 24" role="img" class="icon "><path d="m21.818 0h-7.644c-.574 0-1.125.226-1.534.629l-12.001 11.823c-.852.853-.852 2.234 0 3.087l7.823 7.823c.852.852 2.234.852 3.087 0l11.822-12.002c.403-.409.629-.96.629-1.534v-7.644c0-1.205-.977-2.182-2.182-2.182zm-3.818 8c-1.104 0-2-.896-2-2s.896-2 2-2 2 .896 2 2-.895 2-2 2z"></path></svg> Original</th>'
    html += '                                       <td>'
    for(let i = 0; i < origin.length; i++){
        html +=	'	    	                            <p class="d-inline-block" style="margin-right: 15px">' + origin[i] + '</p>';
    }
    html += '                                       </td>'
    html += '                                   </tr>'
    html += '                                   <tr>'
    html += '                                       <th scope="row"><svg xmlns="http://www.w3.org/2000/svg" style="width:20px;" enable-background="new 0 0 24 24" viewBox="0 0 24 24" role="img" class="icon "><path d="m21.818 0h-7.644c-.574 0-1.125.226-1.534.629l-12.001 11.823c-.852.853-.852 2.234 0 3.087l7.823 7.823c.852.852 2.234.852 3.087 0l11.822-12.002c.403-.409.629-.96.629-1.534v-7.644c0-1.205-.977-2.182-2.182-2.182zm-3.818 8c-1.104 0-2-.896-2-2s.896-2 2-2 2 .896 2 2-.895 2-2 2z"></path></svg> Predict</th>'
    html += '                                       <td>'
    for(let i = 0; i < news.length; i++){
        html +=	'	    	                            <p class="d-inline-block" style="margin-right: 15px">' + news[i] + '</p>';
    }
    html += '                                       </td>'
    html += '                                   </tr>'
    html += '                                   <tr>'
    html += '                                       <th scope="row"><svg style="width:20px;" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24" role="img" class="icon "><path d="m23.968 11.113c-.413-5.752-5.032-10.5-10.772-11.055-7.152-.692-13.174 4.9-13.196 11.904-.007 2.222 1.778 4.038 4 4.038h2.297c1.364 0 2.423 1.343 1.949 2.622-.236.638-.313 1.352-.183 2.092.341 1.939 2.135 3.311 4.104 3.285 6.843-.093 12.302-5.914 11.801-12.886zm-16.968-3.113c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2zm7-1c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2zm4 12c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2zm1-7c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2z"></path></svg> Color</th>'
    html += '                                       <td class="d-inline-block justify-content-center">'
    for(let i = 0; i < colors.length; i++){
        html +=	'	    	                            <p class="float-left" style="padding:10px 35px 10px 0px;background-color:'+colors[i]+'"></p>';
    }
    html += '                                       </td>'
    html += '                                   </tr>'
    html += '                                   <tr>'
    html += '                                       <th scope="row"><svg style="width:20px;" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24" role="img" class="icon "><path d="m12 3c-6.627 0-12 7.5-12 9s5.373 9 12 9 12-7.5 12-9-5.373-9-12-9zm0 13c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4z"></path></svg> Views</th>'
    html += '                                       <td><p>'+views+'</p></td>'
    html += '                                   </tr>'
    html += '                                   <tr>'
    html += '                                       <th scope="row"><svg style="width:20px;" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24" role="img" class="icon "><path d="m18.199 2.04c-2.606-.284-4.262.961-6.199 3.008-2.045-2.047-3.593-3.292-6.199-3.008-3.544.388-6.321 4.43-5.718 7.96.966 5.659 5.944 9 11.917 12 5.973-3 10.951-6.341 11.917-12 .603-3.53-2.174-7.572-5.718-7.96z"></path></svg> Likes</th>'
    html += '                                       <td><p>'+likes+'</p></td>'
    html += '                                   </tr>'
    html += '                                   <tr>'
    html += '                                       <th scope="row"><svg style="width:20px;" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24" role="img" class="icon "><path d="m22 5h-11l-2-3h-7c-1.104 0-2 .896-2 2v16c0 1.104.896 2 2 2h20c1.104 0 2-.896 2-2v-13c0-1.104-.896-2-2-2zm-6 10h-3v3c0 .55-.45 1-1 1s-1-.45-1-1v-3h-3c-.55 0-1-.45-1-1s.45-1 1-1h3v-3c0-.55.45-1 1-1s1 .45 1 1v3h3c.55 0 1 .45 1 1s-.45 1-1 1z"></path></svg> Saves</th>'
    html += '                                       <td><p>'+saves+'</p></td>'
    html += '                                   </tr>'
    html += '                                   <tr>'
    html += '                                       <th scope="row"><svg style="width:25px;" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24" role="img" class="icon "><path d="m0 22c0 1.105.896 2 2 2h20c1.105 0 2-.896 2-2v-11h-24zm22-20h-3v-1c0-.552-.448-1-1-1s-1 .448-1 1v1h-10v-1c0-.552-.448-1-1-1s-1 .448-1 1v1h-3c-1.104 0-2 .896-2 2v5h24v-5c0-1.104-.896-2-2-2zm-16 5c-.552 0-1-.448-1-1s.448-1 1-1 1 .448 1 1-.448 1-1 1zm12 0c-.552 0-1-.448-1-1s.448-1 1-1 1 .448 1 1-.448 1-1 1z"></path></svg> Date</th>'
    html += '                                       <td><p>'+date+'</p></td>'
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
    html += '<div class="col-md-3">'
    html += '   <img data-toggle="modal" data-target="#img_'+id+ '" class="img-fluid pb-4" src="' + src + '" style="width:1000px; cursor:pointer" />'
    html += '</div>'
    return html
}