var arr = {
    arrHeight:Array(),
    arrWidth:Array(),
    arrCheck:Array(),
    arrClassWithName:Array()
 };

var heightWithName = []; //关联Height和Name; 只需要能按 key 得到 value 即可
var btnDetail = []; // 存储要传给子窗体的信息
var devOption = []; //存储所选择的Develper的信息

function addDetail() { 
    let $cell = $('.image__cell');
    // TODO: Very inefficient for removing and adding of click handler.
    $cell.find('.image--basic').off('click').on('click', function () {
        let $thisCell = $(this).closest('.image__cell');
        let bb = $thisCell.find('.image--basic').html(); //点击图片得到此图片ClassWithName
        console.log(bb);
        //var bbReg = /(\w+).clipping-(\d+)/g;
        var bbReg = /Mywidgets\/([^]+).png/g;
        let bbRes = bbReg.exec(bb); 
        for(var k = 0; k < btnDetail.length; k++){
            if(bbRes[1] === btnDetail[k][0]){ 
                var a = document.createElement("a");
                let str = "";
                for(var n = 0; n < btnDetail[k].length; n++){
                    str += btnDetail[k][n];
                    str += '#';
                }
                a.setAttribute("href", "./detail?#"+str);
                a.setAttribute("target", "_blank");
                a.setAttribute("id", "openwin");
                document.body.appendChild(a);
                a.click();
                let imageUrl = $thisCell.find('.image--expand img').attr('src'); 
                break;               
            }
        }
       
    })
}

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

function loadImages(_page) { //loadSearchPage
    //document.getElementsByClassName("loader")[0].style.display = "block";
    let ajaxData = {
        btnType: getUrlParameter('btnType'),
        color: getUrlParameter('color'),
        text: getUrlParameter('text'),
        category: getUrlParameter('category'),
        sortType: getUrlParameter('sortType'),
        width: getUrlParameter('width'),
        height: getUrlParameter('height'),
        page: _page
    };
    
    let html = "";
    $.ajax({
        url: "./search",
        type: 'POST',
        data: ajaxData,
        async: false,
        success: function (widgets) {           
            if (widgets.length === 0) {
                $("#endPage").removeClass("loader").append("End of Page.");
                $(window).unbind('scroll');
            } else {
                //document.getElementsByClassName("loader")[0].style.display = "none";
                for (let i = 0; i < widgets.length; i++) {
                    arr.arrHeight.push(widgets[i].dimensions['height']); 
                    heightWithName.push([widgets[i].dimensions['height'], widgets[i].name, i]); 
                }
                heightWithName.sort(function(x, y){
                    return(x[0]-y[0])
                });
            }

            html += '<div class="row">'
            /* heightWithName.length */
            for(let j = 1; j < heightWithName.length; j++){
                var i = heightWithName[j][2];
                let btnSize = widgets[i].dimensions["width"] + 'x' + widgets[i].dimensions["height"];

                var i = heightWithName[j][2];
                let screenSrc = widgets[i].src.split('/'); //获取urlAdd & similarAdd
                var urlAdd = '', similarAdd = '';
                urlAdd = screenSrc[3] + '/' + screenSrc[4];
                similarAdd = screenSrc[4];
                btnDetail.push([heightWithName[j][1], urlAdd, similarAdd, widgets[i].url, widgets[i].application_name, widgets[i].package_name, widgets[i].category, 
                    + widgets[i].text, widgets[i].widget_class, widgets[i].coordinates['from'], widgets[i].coordinates['to'], btnSize, widgets[i].color, widgets[i].downloads]);  

                
                let _left = parseInt(widgets[i].coordinates['from'][0])+10;
                let _top = parseInt(widgets[i].coordinates['from'][1])-5;
                let _width = parseInt(widgets[i].dimensions["width"])+10;
                let _height = parseInt(widgets[i].dimensions["height"])+10;
                
                html += '<div id="widget' + j + '" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="gridModalLabel" style="display: none;" aria-hidden="true">'
                html += '   <div class="modal-dialog modal-lg" role="document">'
                html += '       <div class="modal-content">'
                
                html += '           <div class="modal-header">'
                html += '               <h5 class="modal-title"><a href="' + widgets[i].url + '">' + widgets[i].application_name + '</a></h5>'
                html += '               <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>'
                html += '           </div>'
    
                html += '           <div class="modal-body">'
                html += '               <div class="container-fluid">'
                html += '                   <div class="row">'
                html += '                       <div class="col-md-7" style="position:relative; zoom:0.5">'
                html += '                           <img src="https://storage.googleapis.com/ui-collection/' + urlAdd + '" style=" cursor: hand;"/>'
                html += '                           <div style="position:absolute; border: 5px solid red; z-indent:2; left:' + _left + 'px;top: ' + _top +'px;width:'+_width+'px;height:'+_height+'px;"></div>'
                html += '                       </div>'
                html += '                       <div class="col-md-5">'
                html += '                           <table class="table table-borderless">'
                html += '                               <tbody>'
                html += '                                   <tr>'
                html += '                                       <th scope="row">Package:</th>'
                html += '                                       <td style="word-break:break-all">' + widgets[i].package_name + '</td>'
                html += '                                   </tr>'
                html += '                                   <tr>'
                html += '                                       <th scope="row">Category:</th>'
                html += '                                       <td>' + widgets[i].category + '</td>'
                html += '                                   </tr>'
                html += '                                   <tr>'
                html += '                                       <th scope="row">Text:</th>'
                if(widgets[i].text == 0){
                    html +=	'	    	<td>' + " " + '</td>';
                }else{
                    html +=	'	    	<td>' + widgets[i].text + '</td>';
                }
                html += '                                   </tr>'
                html += '                                   <tr>'
                html += '                                       <th scope="row">Class:</th>'
                html += '                                       <td>' + widgets[i].widget_class + '</td>'
                html += '                                   </tr>'
                html += '                                   <tr>'
                html += '                                       <th scope="row">Coordinates:</th>'
                html += '                                       <td class="coords">[' + widgets[i].coordinates['from'] + '][' + widgets[i].coordinates['to'] + ']</td>'
                html += '                                   </tr>'
                html += '                                   <tr>'
                html += '                                       <th scope="row">Size:</th>'
                html += '                                       <td class="widSize">' + btnSize + '</td>'
                html += '                                   </tr>'
                html += '                                   <tr>'
                html += '                                       <th scope="row">Color:</th>'
                html += '                                       <td>' + widgets[i].color + '</td>'
                html += '                                   </tr>'
                html += '                                   <tr>'
                html += '                                       <th scope="row">Downloads:</th>'
                html += '                                       <td>' + widgets[i].downloads + '</td>'
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
                /* html += '               <button type="button" class="btn btn-primary">Detail</button>' */
                html += '           </div>'
                
                html += '       </div>'
                html += '   </div>'
                html += '</div>'
                html += '<div class="col-md-auto">'
                html += '   <img data-toggle="modal" data-target="#widget' + j + '" class="img-fluid" src="https://storage.googleapis.com/ui-collection/Mywidgets/' + heightWithName[j][1] + '.png" style="max-height:100px" />'
                html += '</div>'
            }
            html += '</div>'
        }

    })
        
        
        $(".demo").append(html);    // This will be the div where our content will be loaded
        addDetail();
}

