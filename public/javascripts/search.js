var img_dict = {};

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
    };
    $.ajaxSettings.async = false;

    var return_imgs = {};
    for (let i = 0; i < ajaxData.text.length+1; i++) {return_imgs[i] = [];}
    $.getJSON('./data/fake.json',function(result){
        for (let i = 0; i < result.length; i++) {
            let img = result[i];
            let id = img["id"]
            let origin_tags = img['origin'].split('+');
            let normalize_tags = img['normalize'].split('+');
            let predict_tags = img['predict'].split('+')
            current_tags = normalize_tags.concat(predict_tags)
            
            img_dict[id] = [origin_tags,current_tags]

            // gallery method: all -> all-1 -> ... -> 1
            // dribbble method: all
            if (ajaxData.mode=="gallery"){
                intersection_no = ajaxData.text.filter(value => -1 !== current_tags.indexOf(value)).length;
                if (intersection_no!=0){
                    return_imgs[intersection_no].push(id)
                }
            }else{
                intersection_no = ajaxData.text.filter(value => -1 !== origin_tags.indexOf(value)).length;
                if (intersection_no==ajaxData.text.length){
                    return_imgs[intersection_no].push(id)
                }
            }
            
        }
    })
    $(".spinner").remove();

    for (let i = 0; i < Object.keys(return_imgs).length; i++) {return_imgs[i] = shuffle(return_imgs[i]);}
    result = return_imgs[Object.keys(return_imgs).length-1]
    for (let i = Object.keys(return_imgs).length-2; i >= 0; i--) {
        result = result.concat(return_imgs[i]);
    }
    return result
}
function showImages(imgs, no){
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
            let src = "./images/"+id.toString()+".png";
            src = "./images/3936928.png"
            let tags = img_dict[id][1]
            
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
            html += '                                       <th scope="row">Tags:</th>'
            html +=	'	    	                            <td>' + tags[0] + '</td>';
            html += '                                   </tr>'
            for(let i = 1; i < tags.length; i++){
                html += '                                   <tr>'
                html += '                                       <th scope="row"></th>'
                html +=	'	    	                            <td>' + tags[i] + '</td>';
                html += '                                   </tr>'
            }
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
            html += '<div class="col-md-4">'
            html += '   <img data-toggle="modal" data-target="#img_'+id.toString()+ '" class="img-fluid pb-4" src="' + src + '" style="width:1000px; cursor:pointer" />'
            html += '</div>'
        }

        $(".demo").append(html);    // This will be the div where our content will be loaded
    }else{
        $("#endPage").removeClass("loader").append("End of Page.");
        $(window).unbind('scroll');
    }
}
