let Google_Storage = 'https://storage.googleapis.com/gallerydc/';
const colors_platte = {"Cyan":"rgb(145,255,255)","Red":"#ff3030","Lime":"#ff9224", "Yellow":"#ffff6f","Green":"#53ff53","Blue":"#0080ff","Magenta":"#be77ff","Black":"#00000f","White":"#ffffff"};

var widgets, color, 
class_distribution = {}, 
category_distribution = {};
height_width = [];
const btns = ["Button", "CheckBox", "Chronometer", "ImageButton", "ProgressBar", "RadioButton", "RatingBar", "SeekBar", "Spinner", "Switch", "ToggleButton"];
const cats = ["EDUCATION", "LIFESTYLE", "ENTERTAINMENT", "MUSIC_AND_AUDIO", "TOOLS", "PERSONALIZATION", "TRAVEL_AND_LOCAL", "NEWS_AND_MAGAZINES", "BOOKS_AND_REFERENCE", "BUSINESS", "FINANCE", "GAME_CASUAL", "SPORTS", "GAME_PUZZLE", "PRODUCTIVITY", "PHOTOGRAPHY", "HEALTH_AND_FITNESS", "TRANSPORTATION", "COMMUNICATION", "GAME_EDUCATIONAL", "SOCIAL", "MEDIA_AND_VIDEO", "SHOPPING", "GAME_ARCADE", "GAME_SIMULATION", "GAME_ACTION", "MEDICAL", "GAME_CARD", "WEATHER", "GAME_RACING", "GAME_BOARD", "GAME_SPORTS", "GAME_CASINO", "GAME_WORD", "GAME_TRIVIA", "GAME_ADVENTURE", "GAME_STRATEGY", "GAME_ROLE_PLAYING", "GAME_MUSIC", "LIBRARIES_AND_DEMO", "COMICS",
"MAPS_AND_NAVIGATION","VIDEO_PLAYERS_AND_EDITORS","FOOD_AND_DRINK","DATING","EVENTS","AUTO_AND_VEHICLES","ART_AND_DESIGN","PARENTING","HOUSE_AND_HOME","BEAUTY"];
for(let i = 0; i < btns.length; i++){
    class_distribution[btns[i]] = 0;
};
for(let i = 0; i < cats.length; i++){
    category_distribution[cats[i]] = 0;
};

function searchWidgets(){
    let ajaxData = {
        btnType: getUrlParameter('btnType'),
        color: getUrlParameter('color'),
        text: getUrlParameter('text'),
        category: getUrlParameter('category'),
        sortType: getUrlParameter('sortType'),
        width: getUrlParameter('width'),
        height: getUrlParameter('height'),
    };
    
    $.ajax({
        url: "./search",
        type: 'POST',
        data: ajaxData,
        async: false,
        success: function (data){ 
            widgets = data.widgets;
            data.widgets.forEach((element) => {
                class_distribution[element.widget_class] ++;
                category_distribution[element.category] ++;
                height_width.push([element.dimensions.height, element.dimensions.width]);
            });
            color = data.colavg[0];
            // drawing pie chart 
            google.charts.load('current', {'packages':['corechart']});
            google.charts.setOnLoadCallback(drawChartColor);
            google.charts.setOnLoadCallback(drawChartClass);
            google.charts.setOnLoadCallback(drawChartHeightWidth);
            google.charts.load('current', {'packages':['bar']});
            google.charts.setOnLoadCallback(drawChartCategory);
            $(".spinner").remove();
            $(".service").css('height','700px');
        },
        fail: function (){
            alert("Connect to Database Error. Error is reported to administrator.")
        },
        complete: function (){
            console.log(1)
        }
    });
}

function showWidget(no){
    if (widgets.length != 0){
        let output;
        if (widgets.length>no){
            output = no;
        }else{
            output = widgets.length;
        };
        var html = '';

        for(let i=0; i<output; i++){
            let element = widgets.pop();
            html += '<div class="col-md-auto">'
            html += '   <img data-value="'+element.name+'" class="img-fluid pb-1 img-widget" src="https://storage.googleapis.com/gallerydc/widgets/' + element.name + '.png" style="max-height:100px; cursor:pointer" />'
            html += '</div>'
        };
        $(".demo").append(html);
    }else{
        $("#endPage").removeClass("loader").append("End of Page.");
        $(window).unbind('scroll');
    };
}

function drawChartColor() {
    var data = google.visualization.arrayToDataTable([
        ['Colors', '%'],
        ['Black', color.BlackAvg],
        ['Blue', color.BlueAvg],
        ['Cyan', color.CyanAvg],
        ['Green', color.GreenAvg],
        ['Lime', color.LimeAvg],
        ['Magenta', color.MagentaAvg],
        ['Red', color.RedAvg],
        ['White', color.WhiteAvg],
        ['Yellow', color.YellowAvg]
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
};

function drawChartClass() {
    var data = google.visualization.arrayToDataTable([
        ['Classes', '%'],
        ['Button', class_distribution['Button']],
        ['CheckBox', class_distribution['CheckBox']],
        ['Chronometer', class_distribution['Chronometer']],
        ['ImageButton', class_distribution['ImageButton']],
        ['ProgressBar', class_distribution['ProgressBar']],
        ['RadioButton', class_distribution['RadioButton']],
        ['RatingBar', class_distribution['RatingBar']],
        ['SeekBar', class_distribution['SeekBar']],
        ['Spinner', class_distribution['Spinner']],
        ['Switch', class_distribution['Switch']],
        ['ToggleButton', class_distribution['ToggleButton']]
    ]);

    var options = {'title':'Classes', 
    'width':600, 'height':300,
    pieSliceText: 'none',
    colors: ['rgb(255,140,0)','rgb(255,158,40)','rgb(255,167,59)','rgb(255,176,79)','rgb(255,184,98)','rgb(255,193,118)','rgb(255,202,138)','rgb(255,211,157)','rgb(255,220,177)','rgb(255,229,197)','rgb(255,237,216)'],
    pieSliceTextStyle: {
        color: 'black'
    },
    pieHole: 0.4,
    };
    var chart = new google.visualization.PieChart(document.getElementById('piechart_class'));
    chart.draw(data, options);
};

function drawChartHeightWidth() {
    var hwtmp = [['Height', 'Width']]
    var data = google.visualization.arrayToDataTable(hwtmp.concat(height_width));

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
};

function drawChartCategory() {
    var cattmp = [['Category', 'Amount']];
    var cattmp2 = Object.keys(category_distribution).map(function(key) {
        return [key, category_distribution[key]];
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
        bar: {groupWidth: "10%"},
    };

    var chart = new google.visualization.BarChart(document.getElementById('chart_cat'));
    chart.draw(data, options);
};





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
