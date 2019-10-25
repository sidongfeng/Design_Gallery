const express = require('express');
const router = express.Router();
//const async = require('async');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
// const spawn = require("child_process").spawn;
const sharp = require('sharp');
const hamming = require('hamming-distance');
const imghash = require('imghash');


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
const _colorsRGB = {"Cyan":"rgb(145,255,255)","Red":"#ff3030","Lime":"#ff9224", "Yellow":"#ffff6f","Green":"#53ff53","Blue":"#0080ff","Magenta":"#be77ff","Black":"#00000f","White":"#ffffff"};
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

// /* calculate imagehash */
// let rawdata = fs.readFileSync('./public/data/widgets.json');
// let widgets = JSON.parse(rawdata);
// for (i = 0; i < widgets.length; i++) {
//   var name = widgets[i]['name'];
//   sharp("./public/images/BIG_DATA/all_widgets/"+name+".png").resize({ height: 256, width: 256 }).toFile('./public/t/'+name+".png")
//     .then(function(newFileInfo) {
//         console.log(name);
//     })
//     .catch(function(err) {
//         console.log("Error occured");
//     });
// }
// const imghash = require('imghash');
// for (i = 10000; i < widgets.length; i++) {
// 	var name = widgets[i]['name'];
// 	imghash
// 	.hash('./public/t/'+name+".png", 8, 'binary')
// 	.then((hash) => {
// 		console.log(hash); // '1000100010000010'
// 	});
// }
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
        	// if(req.file == undefined){
			// 	res.render('search', {
			// 		msg: 'Error: No File Selected!',
			// 		title: 'Mobile UI Gallery - Search for widgets',
			// 		url: req.originalUrl,
			// 		btnTypeArr: _btnTypeArr,
			// 		sortTypeDict: _sortTypeDict,
			// 		colArr: _colArr,
			// 		catArr: _catArr,
			// 		query: req.query,
			// 	});
			// } else {
				// load all widgets info
				// imgs = {};
				// let rawdata = fs.readFileSync('./public/data/widgets.json');
				// let data = JSON.parse(rawdata);
				// for (let i = 0; i < data.length; i++) {
				// imgs[data[i]['name']] = data[i];
				// }
				// let rawdata2 = fs.readFileSync('./public/data/phash.json');
				// const widgets = JSON.parse(rawdata2);
				// // resize and get hash
				// sharp("./public/uploads/"+`${req.file.filename}`).resize({ height: 256, width: 256 }).toFile("./public/uploads/resize_"+`${req.file.filename}`)
				//     .then(function(newFileInfo) {
				// 		// compare hash
				// 		imghash
				// 		.hash("./public/uploads/resize_"+`${req.file.filename}`, 8, 'binary')
				// 		.then(async (hash) => {
				// 			S = {}
				// 			result = []
				// 			for (let i = 0; i < widgets.length; i++) {
				// 				name = widgets[i]['name'];
				// 				if (name.split('-')[0] == 'Button' || name.split('-')[0] == 'ImageButton'){
				// 					hash2 = widgets[i]['phash'];
				// 					distance = await hamming(hash, hash2);
				// 					S[name] = distance
				// 				}
				// 			}
				// 			var items = Object.keys(S).map(function(key) {
				// 				return [key, S[key]];
				// 			});
				// 			// Sort the array based on the second element
				// 			items.sort(function(first, second) {
				// 				return first[1] - second[1];
				// 			});
				// 			// get result
				// 			for (i = 0; i < items.length; i++) {
				// 				widget = imgs[items[i][0]]
				// 				result.push(widget)
				// 			}
				// 			// send
				// 			res.render('search', {
				// 				msg: 'File Uploaded!',
				// 				file: `${req.file.filename}`,
				// 				title: 'Mobile UI Gallery - Search for widgets',
				// 				url: req.originalUrl,
				// 				btnTypeArr: _btnTypeArr,
				// 				sortTypeDict: _sortTypeDict,
				// 				colArr: _colArr,
				// 				catArr: _catArr,
				// 				query: req.query,
				// 				sims: result,
				// 				colRGB: _colorsRGB,
				// 			});
				// 		});
				//     })
				//     .catch(function(err) {
				//         console.log("Error occured");
				// });
			// }
  		};
	});
});


module.exports = router;
