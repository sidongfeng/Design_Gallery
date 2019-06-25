var out_widgets = Array(); // filtered widgets
var out_widgets_1 = Array(); // filtered widgets
var out_widgets_2 = Array(); // filtered widgets
var out_widgets_3 = Array(); // filtered widgets
var out_widgets_4 = Array(); // filtered widgets
var out_widgets_5 = Array(); // filtered widgets
var pie_info = {};
var all_widgets = {};
const colors = {"Cyan":"rgb(145,255,255)","Red":"#ff3030","Lime":"#ff9224", "Yellow":"#ffff6f","Green":"#53ff53","Blue":"#0080ff","Magenta":"#be77ff","Black":"#00000f","White":"#ffffff"};
const btns = ["Button", "CheckBox", "Chronometer", "ImageButton", "ProgressBar", "RadioButton", "RatingBar", "SeekBar", "Spinner", "Switch", "ToggleButton"];
const cats = ["EDUCATION", "LIFESTYLE", "ENTERTAINMENT", "MUSIC_AND_AUDIO", "TOOLS", "PERSONALIZATION", "TRAVEL_AND_LOCAL", "NEWS_AND_MAGAZINES", "BOOKS_AND_REFERENCE", "BUSINESS", "FINANCE", "GAME_CASUAL", "SPORTS", "GAME_PUZZLE", "PRODUCTIVITY", "PHOTOGRAPHY", "HEALTH_AND_FITNESS", "TRANSPORTATION", "COMMUNICATION", "GAME_EDUCATIONAL", "SOCIAL", "MEDIA_AND_VIDEO", "SHOPPING", "GAME_ARCADE", "GAME_SIMULATION", "GAME_ACTION", "MEDICAL", "GAME_CARD", "WEATHER", "GAME_RACING", "GAME_BOARD", "GAME_SPORTS", "GAME_CASINO", "GAME_WORD", "GAME_TRIVIA", "GAME_ADVENTURE", "GAME_STRATEGY", "GAME_ROLE_PLAYING", "GAME_MUSIC", "LIBRARIES_AND_DEMO", "COMICS",
"MAPS_AND_NAVIGATION","VIDEO_PLAYERS_AND_EDITORS","FOOD_AND_DRINK","DATING","EVENTS","AUTO_AND_VEHICLES","ART_AND_DESIGN","PARENTING","HOUSE_AND_HOME","BEAUTY"];

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
    var height = document.URL.split("&")[5].split("=")[1];
    var h_array = [height.split("+")[0],height.split("+")[2]];
    return h_array
}

function getWidthArray(){
    var width = document.URL.split("&")[6].split("=")[1];
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
            all_widgets[widget['name']] = widget;
            if ((ajaxData.btnType=='All' || ajaxData.btnType==widget['widget_class']) &&
                (ajaxData.category=='All' || ajaxData.category==widget['category']) &&
                (ajaxData.text=='' ||  ajaxData.text.toLowerCase() == widget['text'].toLowerCase() || widget['syns'].includes(ajaxData.text.toLowerCase())) &&
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
                        var string='Do nothing';
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

    // initializing pie info
    pie_info = {'category':{},'class_distribution':{},'color':{"Red":0, "Yellow":0, "Green":0, "Blue":0, "Cyan":0, "Black":0, "White":0, "Lime":0, "Magenta":0},'dimensions':[],'no':out_widgets.length}
    for(let i = 0; i < btns.length; i++){
        pie_info['class_distribution'][btns[i]] = 0;
    }
    for(let i = 0; i < cats.length; i++){
        pie_info['category'][cats[i]] = 0;
    }
    // console.log(pie_info)

    for(let i = 0; i < out_widgets.length; i++){
        var widget = out_widgets[i];
        if (ajaxData.category == 'SOCIAL' && ajaxData.btnType=='Button'){          
            if (widget['dimensions']['width']<250 || widget['dimensions']['height'] > 100){
                if (Math.random() < 0.9){
                    continue;
                }
            }
        }
        if (widget['color']==0){
            console.log('error color')
            pie_info['no'] -= 1;
        }else{
            for (let j = 0; j < Object.keys(colors).length; j++){
                if ((ajaxData.category == 'FINANCE' && widget['color']['White'] > 0.8) || (ajaxData.category == 'FINANCE' && widget['color']['Blue'] > 0.7) || (ajaxData.category == 'FINANCE' && widget['color']['Green'] > 0.8) || (ajaxData.category == 'FINANCE' && widget['color']['Cyan'] > 0.8) || (ajaxData.category == 'FINANCE' && widget['color']['Lime'] > 0.8) || (ajaxData.category == 'FINANCE' && widget['color']['Red'] > 0.8) || (ajaxData.category == 'FINANCE' && widget['color']['Magenta'] > 0.8)){
                    continue;
                }
                pie_info['color'][Object.keys(colors)[j]] += widget['color'][Object.keys(colors)[j]];
            }
            pie_info['class_distribution'][widget['widget_class']] += 1;
        }
        pie_info['dimensions'].push([widget['dimensions']['height'],widget['dimensions']['width']]);
        pie_info['category'][widget['category']] += 1;
    }
    for (let j = 0; j < Object.keys(colors).length; j++){
        pie_info['color'][Object.keys(colors)[j]] = parseFloat((pie_info['color'][Object.keys(colors)[j]]/ pie_info['no']).toFixed(2));
    }
    console.log(pie_info)

    // drawing pie chart 
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
        var data = google.visualization.arrayToDataTable([
            ['Colors', '%'],
            ['Black', pie_info['color']['Black']],
            ['Blue', pie_info['color']['Blue']],
            ['Cyan', pie_info['color']['Cyan']],
            ['Green', pie_info['color']['Green']],
            ['Lime', pie_info['color']['Lime']],
            ['Magenta', pie_info['color']['Magenta']],
            ['Red', pie_info['color']['Red']],
            ['White', pie_info['color']['White']],
            ['Yellow', pie_info['color']['Yellow']]
        ]);

        var options = {'title':'Colors', 
        'width':600, 'height':300,
        colors: ['#000000', '#6e8cd5', '#0fe7e7', '#26aa0c', 'rgb(243, 151, 14)','#bd32aa','rgb(194,24,7)','#fff','rgb(239,253,95)'],
        pieSliceTextStyle: {
                color: 'black'
            },
        pieSliceBorderColor: '#D8D8D8',
        pieHole: 0.4,
        pieSliceText: 'none',
        sliceVisibilityThreshold: 0,
        };
        var chart = new google.visualization.PieChart(document.getElementById('piechart_color'));
        chart.draw(data, options);
    }
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart2);
    function drawChart2() {
        var data = google.visualization.arrayToDataTable([
            ['Classes', '%'],
            ['Button', pie_info['class_distribution']['Button']],
            ['CheckBox', pie_info['class_distribution']['CheckBox']],
            ['Chronometer', pie_info['class_distribution']['Chronometer']],
            ['ImageButton', pie_info['class_distribution']['ImageButton']],
            ['ProgressBar', pie_info['class_distribution']['ProgressBar']],
            ['RadioButton', pie_info['class_distribution']['RadioButton']],
            ['RatingBar', pie_info['class_distribution']['RatingBar']],
            ['SeekBar', pie_info['class_distribution']['SeekBar']],
            ['Spinner', pie_info['class_distribution']['Spinner']],
            ['Switch', pie_info['class_distribution']['Switch']],
            ['ToggleButton', pie_info['class_distribution']['ToggleButton']]
        ]);

        var options = {'title':'Classes', 
        'width':600, 'height':300,
        pieSliceText: 'none',
        colors: ['rgb(255,140,0)','rgb(255,158,40)','rgb(255,167,59)','rgb(255,176,79)','rgb(255,184,98)','rgb(255,193,118)','rgb(255,202,138)','rgb(255,211,157)','rgb(255,220,177)','rgb(255,229,197)','rgb(255,237,216)'],
        // colors: ['#0d0e0e', '#6e8cd5', '#0fe7e7', '#26aa0c', 'rgb(243, 151, 14)','#bd32aa','rgb(194,24,7)','#fff','rgb(239,253,95)'],
        pieSliceTextStyle: {
            color: 'black'
        },
        pieHole: 0.4,
        };
        var chart = new google.visualization.PieChart(document.getElementById('piechart_class'));
        chart.draw(data, options);
    }
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart3);
    function drawChart3() {
        var hwtmp = [['Height', 'Width']]
        for (let j = 0; j < pie_info['dimensions'].length; j++){
            hwtmp.push(pie_info['dimensions'][j])
        }
        var data = google.visualization.arrayToDataTable(hwtmp);

        var options = {
            title: 'Height vs. Width comparison',
            hAxis: {title: 'Height', minValue: 0, maxValue: 1300,viewWindow:{min:0,max:1300}},
            vAxis: {title: 'Width', minValue: 0, maxValue: 810,viewWindow:{min:0,max:810}},
            legend: 'none',
            width:600, height:300,
            colors: ['red'],
            pointSize: 3,
            hAxis:{gridlines:{color:"white"},ticks:[0,500,1000,1500]},
            vAxis:{gridlines:{color:"white"},ticks:[0,200,400,600,800]},
        };

        var chart = new google.visualization.ScatterChart(document.getElementById('chart_height_width'));
        chart.draw(data, options);
    }
    google.charts.load('current', {'packages':['bar']});
    google.charts.setOnLoadCallback(drawChart4);
    function drawChart4() {
        var cattmp = [['Category', 'Amount']];
        var cattmp2 = Object.keys(pie_info['category']).map(function(key) {
            return [key, pie_info['category'][key]];
          });
        cattmp2.sort(function(first, second) {
        return second[1] - first[1];
        });
        for (let j = 0; j < 7; j++){
            cattmp.push(cattmp2[j]);
        }
        var data = new google.visualization.arrayToDataTable(cattmp);

        var options = {
            title: 'Category',
            width:600, height:300,
            legend: { position: 'none' },
            bars: 'horizontal', // Required for Material Bar Charts.
            hAxis:{gridlines:{count:2}},
            // axes: {
            // x: {
            //     0: { side: 'bottom', label: 'Amount'} // Top x-axis.
            // }
            // },
            bar: {groupWidth: "10%"},
        };

        var chart = new google.visualization.BarChart(document.getElementById('chart_cat'));
        chart.draw(data, options);
        $(".spinner").remove();
        $(".service").css('height','700px')
    };
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
        //console.log(widgets)
        
        let html = '';
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
                if (widget['color'][Object.keys(colors)[i]]>0.1){
                    colors_Array.push({"c":Object.keys(colors)[i],"no":widget['color'][Object.keys(colors)[i]]});
                }
            }
            colors_Array.sort(compare2('no'))
            if ((widget['category'] == 'FINANCE' && colors_Array[0]['c'] == 'White' && colors_Array[0]['no']>0.8) ||
                (widget['category'] == 'FINANCE' && colors_Array[0]['c'] == 'Blue' && colors_Array[0]['no']>0.8) ||
                (widget['category'] == 'FINANCE' && colors_Array[0]['c'] == 'Cyan' && colors_Array[0]['no']>0.8) ||
                (widget['category'] == 'FINANCE' && colors_Array[0]['c'] == 'Green' && colors_Array[0]['no']>0.8) ||
                (widget['category'] == 'FINANCE' && colors_Array[0]['c'] == 'Lime' && colors_Array[0]['no']>0.8) ){
                continue;
            }

            
            html += '<div id="'+ widget['name'] + '" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="gridModalLabel" style="display: none;" aria-hidden="true">'
            html += '   <div class="modal-dialog modal-xl" role="document">'
            html += '       <div class="modal-content">'
            
            html += '           <div class="modal-header">'
            html += '               <h5 class="modal-title"><a href="' + widget['url'] + '">' + widget['application_name'] + '</a></h5>'
            html += '               <div class="share-button share-button-top relative"></div>' 
            html += '               <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>'
            html += '           </div>'

            html += '           <div class="modal-body">'
            html += '               <div class="container-fluid">'
            html += '                   <div class="row">'
            html += '                       <div class="col-md-7" style="position:relative; zoom:0.5">'
            html += '                           <img src="https://storage.googleapis.com/ui-collection/' + urlAdd + '" style=" cursor: hand;"/>'
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
            if(widget['font'] == ""){
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
            html += '                                       <td><div class="d-flex justify-content-center">'
            for (let z = 0; z < colors_Array.length; z++){
                html += '                                       <div class="row">'+'<div class="circle" style="background-color:'+colors[colors_Array[z]['c']]+'"></div>'
            }
            html += '                                       </div></td>'
            html += '                                   </tr>'
            html += '                                   <tr>'
            html += '                                       <th scope="row">Developer:</th>'
            html += '                                       <td>' + widget['Developer']+ '</td>'
            html += '                                   </tr>'
            html += '                                   <tr>'
            html += '                                       <th scope="row">Downloads:</th>'
            html += '                                       <td>' + widget['downloads'] + '</td>'
            html += '                                   </tr>'
            html += '                                   <tr>'
            html += '                                       <th scope="row">Date:</th>'
            html += '                                       <td>' + widget['date'] + '</td>'
            html += '                                   </tr>'
            html += '                                   <tr>'
            html += '                                       <th scope="row">Similar:</th>'
            html += '                                       <td><div class="row">'
            if (typeof(widget['sims']) == "undefined"){
                html += 'None'
            }else{
                for (let z = 0; z < widget['sims'].length; z++){
                    var sim_widget = all_widgets[widget['sims'][z]];
                    console.log(sim_widget)
                    // html = modal_img(html,sim_widget)
                    html += '<div class="col-md-auto">'
                    html += '   <img class="img-fluid pb-1" src="https://storage.googleapis.com/ui-collection/Mywidgets/' + sim_widget['name'] + '.png" />'
                    html += '</div>'
                }
            }
            html += '                                       </div></td>'
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

        $(".demo").append(html);    // This will be the div where our content will be loaded
    }else{
        $("#endPage").removeClass("loader").append("End of Page.");
        $(window).unbind('scroll');
    }
}
