const express = require('express');
const router = express.Router();
//const async = require('async');
const path = require('path');
const multer = require('multer');
const spawn = require("child_process").spawn;

/**
 * Run python script, pass in `-u` to not buffer console output 
 * @return {ChildProcess}
 */
function runScript(){
    return spawn('python', [
      "-u", 
      './public/test.py',
      "--foo", "some value for foo",
    ]);
  }

// Set The Storage Engine
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req, file, cb){
      cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });

// Init Upload
const upload = multer({
    storage: storage,
    limits:{fileSize: 1000000},
    fileFilter: function(req, file, cb){
      checkFileType(file, cb);
    }
  }).single('myImage');

// Check File Type
function checkFileType(file, cb){
    // Allowed ext
    const filetypes = /jpeg|jpg|png/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
  
    if(mimetype && extname){
      return cb(null,true);
    } else {
      cb('Error: Images Only!');
    }
  }

// const mongoose = require('mongoose');
// const Widget = mongoose.model('Widget');
// const Util = require('../util/util');

const _btnTypeArr = ["All", "Button", "CheckBox", "Chronometer", "ImageButton", "ProgressBar", "RadioButton", "RatingBar", "SeekBar", "Spinner", "Switch", "ToggleButton"];
//"EditText", "View"
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
    res.render('search', {
        title: 'Mobile UI Gallery - Search for widgets',
        url: req.originalUrl,
        btnTypeArr: _btnTypeArr,
        sortTypeDict: _sortTypeDict,
        colArr: _colArr,
        catArr: _catArr,
        query: req.query,
    });
});

router.post('/', function (req, res, next) {
    upload(req, res, (err) => {
        if(err){
          // change ejs name
          res.render('search', {
            msg: err
          });
        } else {
          if(req.file == undefined){
            res.render('search', {
                msg: 'Error: No File Selected!',
                title: 'Mobile UI Gallery - Search for widgets',
                url: req.originalUrl,
                btnTypeArr: _btnTypeArr,
                sortTypeDict: _sortTypeDict,
                colArr: _colArr,
                catArr: _catArr,
                query: req.query,
            });
          } else {
            const subprocess = runScript()
            subprocess.stdout.on('data', (data) => {
              console.log(`data:${data}`);
            });
            subprocess.stderr.on('data', (data) => {
              console.log(`error:${data}`);
            });
            subprocess.stderr.on('close', () => {
              console.log("Closed");
            });
            res.render('search', {
                msg: 'File Uploaded!',
                file: `${req.file.filename}`,
                title: 'Mobile UI Gallery - Search for widgets',
                url: req.originalUrl,
                btnTypeArr: _btnTypeArr,
                sortTypeDict: _sortTypeDict,
                colArr: _colArr,
                catArr: _catArr,
                query: req.query,
                sims: s,
            },);
          }
        }
    });
});

// router.post('/', function (req, res, next) {
//     if (!Util.isPositiveInteger(req.body.page) && req.body.page) {
//         return next(new Error('Page is not a positive integer'));
//     } else {
//         let findObj = {};
//         if (req.body.btnType === 'All') {
//             findObj = {};
//         } else {
//             findObj.widget_class = new RegExp(req.body.btnType + '\\d?');
//             // findObj.widget_class = req.body.btnType;
//         }
//         if (req.body.color !== 'All') {
//             findObj.color = req.body.color;
//         }
//         if (req.body.category !== 'All') {
//             findObj.category = req.body.category;
//         }
//         if (req.body.text !== '') {
//             findObj.text = new RegExp(req.body.text);
//         }
//         // Checking and parsing of width and height
//         let _widthArr = req.body.width.split(';').slice(0, 2);
//         if (_widthArr.every(function (value) {
//             return (value >= 0 && value <= 800);
//         })) {
//             findObj['dimensions.width'] = {"$gte": _widthArr[0], "$lte": _widthArr[1]};
//         } else {
//             return next(new Error('Invalid width.'));
//         }
//         let _heightArr = req.body.height.split(';').slice(0, 2);
//         if (_heightArr.every(function (value) {
//             return (value >= 0 && value <= 1280);
//         })) {
//             findObj['dimensions.height'] = {"$gte": _heightArr[0], "$lte": _heightArr[1]};
//         } else {
//             return next(new Error('Invalid height.'));
//         }

//         switch (req.body.sortType) {
//             case 'appDownloads':
//                 _sortType = {
//                     downloads: -1,
//                     color: 1
//                 };
//                 break;
//             case 'appAlpbAsc':
//                 _sortType = {
//                     application_name: 1,
//                     color: 1
//                 };
//                 break;
//             default:
//                 break
//         }

//         Widget.find(findObj)
//             //.sort(_sortType)
//             .skip((req.body.page - 1) * displayPerPage)
//             .limit(displayPerPage)
//             .exec(function (err, doc) {
//                 if (err) {
//                     return next(err);
//                 }
//                 res.json(doc);
//             });
//     }

// });

module.exports = router;
