var out_widgets = Array(); // filtered widgets
var out_widgets_1 = Array(); // filtered widgets
var out_widgets_2 = Array(); // filtered widgets
var out_widgets_3 = Array(); // filtered widgets
var out_widgets_4 = Array(); // filtered widgets
var out_widgets_5 = Array(); // filtered widgets
const colors = {"Red":"#ff3030","Lime":"#ff9224", "Yellow":"#ffff6f","Green":"#53ff53","Blue":"#0080ff","Purple":"#be77ff","Black":"#00000f","White":"#ffffff"};

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

function compare(property1,p2){
    return function(a,b){
        var value1 = a[property1][p2];
        var value2 = b[property1][p2];
        return value2 - value1;
    }
}
function compare2(property){
    return function(a,b){
        var value1 = a[property];
        var value2 = b[property];
        return value2 - value1;
    }
}
function getHeightArray(){
    var height = document.URL.split("&")[4].split("=")[1];
    var h_array = [height.split("+")[0],height.split("+")[2]];
    return h_array
}

function getWidthArray(){
    var width = document.URL.split("&")[5].split("=")[1];
    var w_array = [width.split("+")[0],width.split("+")[2]];
    return w_array
}

function loadImages() { //loadSearchPage
    let ajaxData = {
        btnType: getUrlParameter('btnType'),
        color: getUrlParameter('color'),
        text: getUrlParameter('text'),
        category: getUrlParameter('category'),
        sortType: getUrlParameter('sortType'),
        width: getWidthArray(),
        height: getHeightArray()
    };
    $.ajaxSettings.async = false;
    $.getJSON('./data/fake.json',function(result){
        for (let i = 0; i < result.length; i++) {
            let widget = result[i];
            if ((ajaxData.btnType=='All' || ajaxData.btnType==widget['widget_class']) &&
                (ajaxData.category=='All' || ajaxData.category==widget['category']) &&
                (parseInt(ajaxData.width[0]) <= widget['dimensions']['width'] && parseInt(ajaxData.width[1]) >= widget['dimensions']['width']) &&
                (parseInt(ajaxData.height[0]) <= widget['dimensions']['height'] && parseInt(ajaxData.height[1]) >= widget['dimensions']['height'])
            ){
                if (ajaxData.color=='All'){
                    out_widgets.push(widget);
                }else{
                    if (widget['color'][ajaxData.color] >= 0.8){
                        out_widgets_1.push(widget);
                    }else if (widget['color'][ajaxData.color] >= 0.6 && widget['color'][ajaxData.color] < 0.8){
                        out_widgets_2.push(widget);
                    }else if (widget['color'][ajaxData.color] >= 0.5 && widget['color'][ajaxData.color] < 0.6){
                        out_widgets_3.push(widget);
                    }else if (widget['color'][ajaxData.color] >= 0.4 && widget['color'][ajaxData.color] < 0.5){
                        out_widgets_4.push(widget);
                    }else if (widget['color'][ajaxData.color] >= 0.3 && widget['color'][ajaxData.color] < 0.4){
                        out_widgets_5.push(widget);
                    }else{
                        var ii = 1;
                    }
                }
            }
        }
        if (ajaxData.color!='All'){
            out_widgets_1.sort(compare('dimensions','height'));
            out_widgets_2.sort(compare('dimensions','height'));
            out_widgets_3.sort(compare('dimensions','height'));
            out_widgets_4.sort(compare('dimensions','height'));
            out_widgets_5.sort(compare('dimensions','height'));
            out_widgets = out_widgets.concat(out_widgets_5).concat(out_widgets_4).concat(out_widgets_3).concat(out_widgets_2).concat(out_widgets_1);
        }else{
            out_widgets.sort(compare('dimensions','height'));   
        }
    })
    return out_widgets
}
function showImages(widgets, no){
    if (widgets.length != 0){
        
        let output;
        if (widgets.length>no){
            output = no;
        }else{
            output = widgets.length;
        }

        let = html = '';
        html += '<div class="row">'
        for(let j = 0; j < output; j++){
            let widget = widgets.pop();

            let screenSrc = widget['src'].split('/'); //获取urlAdd & similarAdd
            var urlAdd = '', similarAdd = '';
            urlAdd = screenSrc[3] + '/' + screenSrc[4];
            similarAdd = screenSrc[4];

            let _left = parseInt(widget['coordinates']['from'][0])+10;
            let _top = parseInt(widget['coordinates']['from'][1])-5;
            let _width = parseInt(widget['dimensions']['width'])+10;
            let _height = parseInt(widget['dimensions']["height"])+10;

            let btnSize = widget['dimensions']['width'] + 'x' + widget['dimensions']["height"];

            var colors_Array = [];
            for (let i = 0; i < Object.keys(colors).length; i++){
                if (widget['color'][Object.keys(colors)[i]]>0.3){
                    colors_Array.push({"c":Object.keys(colors)[i],"no":widget['color'][Object.keys(colors)[i]]});
                }
            }
            colors_Array.sort(compare2('no'))

            html += '<div id="'+ widget['name'] + '" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="gridModalLabel" style="display: none;" aria-hidden="true">'
            html += '   <div class="modal-dialog modal-lg" role="document">'
            html += '       <div class="modal-content">'
            
            html += '           <div class="modal-header">'
            html += '               <h5 class="modal-title"><a href="' + widget['url'] + '">' + widget['application_name'] + '</a></h5>'
            html += '               <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>'
            html += '           </div>'

            html += '           <div class="modal-body">'
            html += '               <div class="container-fluid">'
            html += '                   <div class="row">'
            html += '                       <div class="col-md-7" style="position:relative; zoom:0.5">'
            html += '                           <img  src="https://storage.googleapis.com/ui-collection/' + urlAdd + '" style=" cursor: hand;"/>'
            html += '                           <div style="position:absolute; border: 5px solid red; z-indent:2; left:' + (_left+30) + 'px;top: ' + _top +'px;width:'+_width+'px;height:'+_height+'px;"></div>'
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
            html += '                                       <th scope="row">Font:</th>'
            if(widget['font'] == 0){
                html +=	'	    	<td>' + " " + '</td>';
            }else{
                html +=	'	    	<td>' + widget['font'] + '</td>';
            }
            html += '                                   </tr>'
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
            html += '                                       <th scope="row">Downloads:</th>'
            html += '                                       <td>' + widget['downloads'] + '</td>'
            html += '                                   </tr>'
            html += '                                   <tr>'
            html += '                                       <td align="center" colspan="2"><i>We only annotate the selected UI elements in theimage.</i></td>'
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
            html += '   <img data-toggle="modal" data-target="#'+widget['name'] + '" class="img-fluid pb-1" src="https://storage.googleapis.com/ui-collection/Mywidgets/' + widget['name'] + '.png" style="max-height:100px; cursor:pointer" />'
            html += '</div>'
        }
        html += '</div>'
        $(".demo").append(html);    // This will be the div where our content will be loaded
    }else{
        $("#endPage").removeClass("loader").append("End of Page.");
        $(window).unbind('scroll');
    }
}
