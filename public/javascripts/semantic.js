var img_dict = {};
var split = {"p":{},"c":{},"a":{},"sf":{},"sl":{}}
const dict = {"platform": ['mobile','website'],
                    "color" : ['grey','brown','pink','black','white','green','blue','red','yellow'],
                    "app" : ['weather','social','sport','news','health','game','finance','travel','food','ecommerce','music'],
                    "screen_function" : ['profile','signup','checkout','landing'],
                    "screen_layout" : ['chart','grid','form','list','dashboard']};

yellow = ["yellow", "orange", "gold"]
red = ["red"]
blue = ["blue", "light blue","dark blue"]
green = ["green", "darkgreen","aquamarine"]
white = ["white"]
black = ["black", "dark"]
pink = ["pink"]
brown = ["brown"]
grey = ["grey"]
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
signup = ["sign up","signup","sign_up","login","log in","log_in"]
profile = ["profile"]
search = ["search", "searching"]
dashboard = ["dashboard"]
list = ["list"]
form = ["form"]
grid = ["grid"]
chart = ["chart"]
simple = ["simple","clean", "minimal","minimalistic"]
flat = ["flat","flat design","flat_design","flatdesign","flat ui","flat_ui_design"]
gradient = ["color gradient", "color_gradient", "gradient color","gradient"]
illustration = ["illustration"]
ui = ["ui", "user interface","user-interface", "user_interface", "user interface design", "user_interface_design", "uidesign", "ui design", "ui_design", "uiuxdesign", "uxuidesign", "uiux design", "uxui design", "uiux_design", "uxui_design", "uiux-design", "uxui-design", "uiux", "uidesigner", "ui_ux", "ui.ux", "ux.ui", "uxui", "ui-ux", "ux-ui", "app-ui", "daily ui", "dailyui", "daily_ui", "30_days_of_ui", "30 days of ui"]
mobile = ["iphone", "iphonex","iphone_x", "iphone8", "iphone7", "ios_11","iphone_app","ipad_pro", "travelapp", "ios11","app", "application", "android app", "app-design",  "app design","app_design", "appdesign","ios app", "ios_app", "ios_design", "android_app", "app_development","mobile_application", "application_design", "mobile app","mobileapp","mobile", "mobile design", "mobiledesign", "mobile website", "mobilewebsite","mobile_web","ios"]
website = ["website","webdesigner", "web-design", "design_for_website","websitedesign", "web app", "mobile_application","mobile app","mobileapp", "mobile", "mobile design", "mobiledesign","webpage", "website", "web", "website design","webpage design"]
             


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
        text: getUrlParameter('text').toLowerCase().split('+'),
        platform : getUrlParameter('platform')=='1',
        color : getUrlParameter('color')=='1',
        app : getUrlParameter('app')=='1',
        screen_function : getUrlParameter('screen_function')=='1',
        screen_layout : getUrlParameter('screen_layout')=='1',
    };
    $.ajaxSettings.async = false;
    structure=false;
    if (ajaxData.platform|| ajaxData.color||ajaxData.app||ajaxData.screen_function||ajaxData.screen_layout){
        structure=true;
    }

    var return_imgs = {};
    for (let i = 0; i < ajaxData.text.length+1; i++) {return_imgs[i] = [];}
    $.getJSON('./data/semantic.json',function(result){
        if (ajaxData.platform){
            for(let j = 0; j < dict['platform'].length; j++){split["p"][dict['platform'][j]]=[]}
        }
        if (ajaxData.color){
            for(let j = 0; j < dict['color'].length; j++){split["c"][dict['color'][j]]=[]}
        }
        if (ajaxData.app){
            for(let j = 0; j < dict['app'].length; j++){split["a"][dict['app'][j]]=[]}
        }
        if (ajaxData.screen_function){
            for(let j = 0; j < dict['screen_function'].length; j++){split["sf"][dict['screen_function'][j]]=[]}
        }
        if (ajaxData.screen_layout){
            for(let j = 0; j < dict['screen_layout'].length; j++){split["sl"][dict['screen_layout'][j]]=[]}
        }
        for (let i = 0; i < result.length; i++) {
            let img = result[i];
            let id = img["id"]
            let url = img["url"]
            let origin_tags = img['origin'].split('+');
            let normalize_tags = img['normalize'].split('+');
            let predict_tags = img['predict'].split('+')
            current_tags = normalize_tags.concat(predict_tags)
            img_dict[id] = [origin_tags,current_tags,url]
            
            
            // gallery method: all -> all-1 -> ... -> 1
            // dribbble method: all
            if (ajaxData.mode=="gallery"){
                var normalized_text = normalize(ajaxData.text)

                intersection_no = normalized_text.filter(value => -1 !== current_tags.indexOf(value)).length;
                if (intersection_no==ajaxData.text.length){
                    return_imgs[intersection_no].push(id)
                    
                    if (ajaxData.platform){
                        for(let j = 0; j < dict['platform'].length; j++){
                            let tag = dict['platform'][j]
                            if (current_tags.indexOf(tag)>-1){split["p"][tag].push(id)}
                        }
                    }
                    if (ajaxData.color){
                        for(let j = 0; j < dict['color'].length; j++){
                            let tag = dict['color'][j]
                            if (current_tags.indexOf(tag)>-1){split["c"][tag].push(id)}
                        }
                    }
                    if (ajaxData.app){
                        for(let j = 0; j < dict['app'].length; j++){
                            let tag = dict['app'][j]
                            if (current_tags.indexOf(tag)>-1){split["a"][tag].push(id)}
                        }
                    }
                    if (ajaxData.screen_function){
                        for(let j = 0; j < dict['screen_function'].length; j++){
                            let tag = dict['screen_function'][j]
                            if (current_tags.indexOf(tag)>-1){split["sf"][tag].push(id)}
                        }
                    }
                    if (ajaxData.screen_layout){
                        for(let j = 0; j < dict['screen_layout'].length; j++){
                            let tag = dict['screen_layout'][j]
                            if (current_tags.indexOf(tag)>-1){split["sl"][tag].push(id)}
                        }
                    }
                }
            }else{
                intersection_no = ajaxData.text.filter(value => -1 !== origin_tags.indexOf(value)).length;
                if (intersection_no==ajaxData.text.length){
                    return_imgs[intersection_no].push(id)

                    if (ajaxData.platform){
                        for(let j = 0; j < dict['platform'].length; j++){
                            let tag = dict['platform'][j]
                            if (origin_tags.indexOf(tag)>-1){split["p"][tag].push(id);}
                        }
                    }
                    if (ajaxData.color){
                        for(let j = 0; j < dict['color'].length; j++){
                            let tag = dict['color'][j]
                            if (origin_tags.indexOf(tag)>-1){split["c"][tag].push(id)}
                        }
                    }
                    if (ajaxData.app){
                        for(let j = 0; j < dict['app'].length; j++){
                            let tag = dict['app'][j]
                            if (origin_tags.indexOf(tag)>-1){split["a"][tag].push(id)}
                        }
                    }
                    if (ajaxData.screen_function){
                        for(let j = 0; j < dict['screen_function'].length; j++){
                            let tag = dict['screen_function'][j]
                            if (origin_tags.indexOf(tag)>-1){split["sf"][tag].push(id)}
                        }
                    }
                    if (ajaxData.screen_layout){
                        for(let j = 0; j < dict['screen_layout'].length; j++){
                            let tag = dict['screen_layout'][j]
                            if (origin_tags.indexOf(tag)>-1){split["sl"][tag].push(id)}
                        }
                    }
                }
            }
        }
    })

    $(".spinner").remove();

    for (let i = 0; i < Object.keys(return_imgs).length; i++) {return_imgs[i] = shuffle(return_imgs[i]);}
    result = return_imgs[Object.keys(return_imgs).length-1]
    // // return all the images
    // for (let i = Object.keys(return_imgs).length-2; i >= 0; i--) {
    //     result = result.concat(return_imgs[i]);
    // }
    // return result.slice(0, 30);
    console.log("get "+return_imgs[Object.keys(return_imgs).length-1].length.toString()+" images");
    return [result,ajaxData]
}
function showImages(imgs, no, ajaxData){
    if ((ajaxData.platform||ajaxData.color||ajaxData.app||ajaxData.screen_function||ajaxData.screen_layout)==false){
        if (imgs.length != 0){
            let output;
            if (imgs.length>no){
                output = no;
            }else{
                output = imgs.length;
            }
            
            let html = '';
            for(let j = 0; j < output; j++){
                let id = imgs.shift();
                let src = "https://storage.googleapis.com/ui-collection/Semantic/"+id.toString()+".png";
                let dribbble_src = "https://www.dribbble.com/shots/"+id
                var tags;
                if (getUrlParameter('mode')=="gallery"){
                    tags = [...new Set(img_dict[id][1])]
                }else{
                    tags = [...new Set(img_dict[id][0])]
                }
                html = generate_html(html,id,src,dribbble_src)
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
                html += tag
                html += '</h1><hr /></div></div>'
                html += '<div class="row">'
                split['c'][tag] = shuffle(split['c'][tag])
                for(let z = 0; z < Math.min(split['c'][tag].length,32); z++){
                    // html += '<div class="col-sm-4">'
                    let id = split['c'][tag][z];
                    let src = "https://storage.googleapis.com/ui-collection/Semantic/"+id.toString()+".png";
                    let dribbble_src = "https://www.dribbble.com/shots/"+id
                    html = generate_html(html,id,src,dribbble_src)
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
                html += tag
                html += '</h1><hr /></div></div><div class="row">'
                for(let z = 0; z < Math.min(split['a'][tag].length,32); z++){
                    let id = split['a'][tag][z];
                    let src = "https://storage.googleapis.com/ui-collection/Semantic/"+id.toString()+".png";
                    let dribbble_src = "https://www.dribbble.com/shots/"+id
                    html = generate_html(html,id,src,dribbble_src)
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
                html += tag
                html += '</h1><hr /></div></div><div class="row">'
                for(let z = 0; z < Math.min(split['sf'][tag].length,32); z++){
                    let id = split['sf'][tag][z];
                    let src = "https://storage.googleapis.com/ui-collection/Semantic/"+id.toString()+".png";
                    let dribbble_src = "https://www.dribbble.com/shots/"+id
                    html = generate_html(html,id,src,dribbble_src)
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
                html += tag
                html += '</h1><hr /></div></div><div class="row">'
                for(let z = 0; z < Math.min(split['sl'][tag].length,32); z++){
                    let id = split['sl'][tag][z];
                    let src = "https://storage.googleapis.com/ui-collection/Semantic/"+id.toString()+".png";
                    let dribbble_src = "https://www.dribbble.com/shots/"+id
                    html = generate_html(html,id,src,dribbble_src)
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
                html += tag
                html += '</h1><hr /></div></div><div class="row">'
                for(let z = 0; z < Math.min(split['p'][tag].length,32); z++){
                    let id = split['p'][tag][z];
                    let src = "https://storage.googleapis.com/ui-collection/Semantic/"+id.toString()+".png";
                    let dribbble_src = "https://www.dribbble.com/shots/"+id
                    html = generate_html(html,id,src,dribbble_src)
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


function generate_html(html,id,src,dribbble_src){
    html += '<div id="img_'+ id.toString() + '" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="gridModalLabel" style="display: none;" aria-hidden="true">'
    html += '   <div class="modal-dialog modal-xl" role="document">'
    html += '       <div class="modal-content">'
    
    html += '           <div class="modal-header">'
    html += '               <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>'
    html += '           </div>'

    html += '           <div class="modal-body">'
    html += '               <div class="container-fluid">'
    html += '                   <div class="row">'
    html += '                       <div class="col-md-7" style="position:relative;">'
    html += '                           <img src="' + src + '" style="width:1000px; cursor: hand;"/>'
    html += '                       </div>'
    html += '                       <div class="col-md-5">'
    html += '                           <table class="table table-borderless">'
    html += '                               <tbody>'
    html += '                                   <tr>'
    html += '                                       <th scope="row">URL:</th>'
    html += '                                       <td><a href="'+dribbble_src+'">Link</a></td>'
    // for(let i = 1; i < tags.length; i++){
    //     html +=	'	    	                            <td class="rounded-sm rounded-pill border border-success float-left">' + tags[i] + '</td>';
    // }
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
    html += '   <img data-toggle="modal" data-target="#img_'+id.toString()+ '" class="img-fluid pb-4" src="' + src + '" style="width:1000px; cursor:pointer" />'
    html += '</div>'
    return html
}