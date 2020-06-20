const express = require('express');
const router = express.Router();
const app = express();

const mongoose = require('mongoose');
const Widget = mongoose.model('Widget');

const _btnTypeArr = ["All", "Button", "CheckBox", "Chronometer", "ImageButton", "ProgressBar", "RadioButton", "RatingBar", "SeekBar", "Spinner", "Switch", "ToggleButton"];
const _sortTypeDict = {
    appDownloads: "Descending Number of Application Downloads",
    appAlpbAsc: "Descending Alphabetical Order"
};
const _colArr = ["All", "Red", "Yellow", "Green", "Blue", "Cyan", "Black", "White", "Lime", "Magenta"];
const _catArr = ["All","EDUCATION", "LIFESTYLE", "ENTERTAINMENT", "MUSIC_AND_AUDIO", "TOOLS", "PERSONALIZATION", "TRAVEL_AND_LOCAL", "NEWS_AND_MAGAZINES", "BOOKS_AND_REFERENCE", "BUSINESS", "FINANCE", "GAME_CASUAL", "SPORTS", "GAME_PUZZLE", "PRODUCTIVITY", "PHOTOGRAPHY", "HEALTH_AND_FITNESS", "TRANSPORTATION", "COMMUNICATION", "GAME_EDUCATIONAL", "SOCIAL", "MEDIA_AND_VIDEO", "SHOPPING", "GAME_ARCADE", "GAME_SIMULATION", "GAME_ACTION", "MEDICAL", "GAME_CARD", "WEATHER", "GAME_RACING", "GAME_BOARD", "GAME_SPORTS", "GAME_CASINO", "GAME_WORD", "GAME_TRIVIA", "GAME_ADVENTURE", "GAME_STRATEGY", "GAME_ROLE_PLAYING", "GAME_MUSIC", "LIBRARIES_AND_DEMO", "COMICS",
"MAPS_AND_NAVIGATION",
"VIDEO_PLAYERS_AND_EDITORS",
"FOOD_AND_DRINK",
"DATING",
"EVENTS",
"AUTO_AND_VEHICLES",
"ART_AND_DESIGN",
"PARENTING",
"HOUSE_AND_HOME",
"BEAUTY"];
const displayPerPage = 11463; 

/* GET search pageff */
router.get('/', function (req, res, next) {
    var _query = {};
    if (Object.keys(req.query).length === 0){
        _query = {
            btnType: 'Button',
            color: 'Blue'
        };
    }else{
        _query = req.query;
    };
    res.render('search', {
        title: 'Mobile UI Gallery - Search for widgets',
        url: req.originalUrl,
        btnTypeArr: _btnTypeArr,
        sortTypeDict: _sortTypeDict,
        colArr: _colArr,
        catArr: _catArr,
        query: _query,
        // widgets: [],
    });
    // const findObj = async() =>{
    //     const widgte = await Widget.findOne()
    //     console.log(widgte)
    // }
    // findObj()
});

router.get('/:package/:screenshotID', function (req, res, next) {
    let findObj = {};
    findObj.package_name = req.params.package;
    findObj.src = new RegExp(req.params.screenshotID);
    Widget.find(findObj)
        .exec(function (err, doc) {
            if (err) {
                return next(err);
            }
            res.render('screenshot', {
                title: 'Mobile UI Gallery - Widgets on the same screenshot',
                url: req.originalUrl,
                btnTypeArr: _btnTypeArr,
                sortTypeDict: _sortTypeDict,
                colArr: _colArr,
                catArr: _catArr,
                query: req.query,
                widgets: doc
            });
        });

});

router.post('/', function (req, res, next) {
    let searchQuery = {};
    let sortQuery = {"dimensions.height": -1, "dimensions.width": 0};
    if (req.body.btnType !== 'All') {
        searchQuery.widget_class = req.body.btnType;
    };
    if (req.body.color !== 'All') {
        searchQuery['color.'+req.body.color] = {$gte: 0.3};
        sortQuery['color.'+req.body.color] = 1;
    };
    if (req.body.category !== 'All') {
        searchQuery.category = req.body.category;
    };
    if (req.body.text !== '') {
        searchQuery.text = req.body.text;
    };
    let _widthArr = req.body.width.split('+-+');
    if (parseInt(_widthArr[0]) != 0 || parseInt(_widthArr[1]) != 800){
        searchQuery['dimensions.width'] = {"$gte": parseInt(_widthArr[0]), "$lte": parseInt(_widthArr[1])};
    };
    
    let _heightArr = req.body.height.split('+-+');
    if (parseInt(_heightArr[0]) != 0 || parseInt(_heightArr[1]) != 1280){
        searchQuery['dimensions.height'] = {"$gte": parseInt(_heightArr[0]), "$lte": parseInt(_heightArr[1])};
    };
    switch (req.body.sortType) {
        case 'appDownloads':
            sortQuery.downloads = -1;
            break;
        case 'appAlpbAsc':
            sortQuery.application_name = 1;
            break;
        default:
            break;
    };

    console.log(searchQuery)
    console.log(sortQuery)

    const findObj = async() =>{
        // .lean()
        let widgets = await Widget.find(searchQuery, {"name": 1, "dimensions": 1, "category": 1, "widget_class": 1, _id: 0}).sort(sortQuery);
        console.log(widgets.length)
        let colavg = await Widget.aggregate([
            {$match : searchQuery}
        ]).group({
            _id : null,
            "BlueAvg" : {$avg : '$color.Blue'},
            // Categorycount: { "$sum": 1 }, 
            "RedAvg" : {$avg : '$color.Red'},
            "YellowAvg" : {$avg : '$color.Yellow'},
            "GreenAvg" : {$avg : '$color.Green'},
            "CyanAvg" : {$avg : '$color.Cyan'},
            "BlackAvg" : {$avg : '$color.Black'},
            "WhiteAvg" : {$avg : '$color.White'},
            "LimeAvg" : {$avg : '$color.Lime'},
            "MagentaAvg" : {$avg : '$color.Magenta'},
        });
        console.log(colavg)
        res.json({widgets: widgets, colavg: colavg});
    }
    findObj();


    // if (!Util.isPositiveInteger(req.body.page) && req.body.page) {
    //     return next(new Error('Page is not a positive integer'));
    // } else {
    //     

    //     switch (req.body.sortType) {
    //         case 'appDownloads':
    //             _sortType = {
    //                 downloads: -1,
    //                 color: 1
    //             };
    //             break;
    //         case 'appAlpbAsc':
    //             _sortType = {
    //                 application_name: 1,
    //                 color: 1
    //             };
    //             break;
    //         default:
    //             break
    //     }

    //     Widget.find(findObj)
    //         //.sort(_sortType)
    //         .skip((req.body.page - 1) * displayPerPage)
    //         .limit(displayPerPage)
    //         .exec(function (err, doc) {
    //             if (err) {
    //                 return next(err);
    //             }
    //             res.json(doc);
    //         });
    // }

});

module.exports = router;
