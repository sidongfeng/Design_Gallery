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
				// load all widgets info
				imgs = {};
				let rawdata = fs.readFileSync('./public/data/widgets.json');
				let data = JSON.parse(rawdata);
				for (let i = 0; i < data.length; i++) {
				imgs[data[i]['name']] = data[i];
				}
				let rawdata2 = fs.readFileSync('./public/data/phash.json');
				const widgets = JSON.parse(rawdata2);
				// resize and get hash
				sharp("./public/uploads/"+`${req.file.filename}`).resize({ height: 256, width: 256 }).toFile("./public/uploads/resize_"+`${req.file.filename}`)
				    .then(function(newFileInfo) {
						// compare hash
						imghash
						.hash("./public/uploads/resize_"+`${req.file.filename}`, 8, 'binary')
						.then(async (hash) => {
							S = {}
							result = []
							for (let i = 0; i < widgets.length; i++) {
								name = widgets[i]['name'];
								if (name.split('-')[0] == 'Button' || name.split('-')[0] == 'ImageButton'){
									hash2 = widgets[i]['phash'];
									distance = await hamming(hash, hash2);
									S[name] = distance
								}
							}
							var items = Object.keys(S).map(function(key) {
								return [key, S[key]];
							});
							// Sort the array based on the second element
							items.sort(function(first, second) {
								return first[1] - second[1];
							});
							// get result
							for (i = 0; i < items.length; i++) {
								widget = imgs[items[i][0]]
								result.push(widget)
							}
							// send
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
								sims: result,
								colRGB: _colorsRGB,
							});
						});
				    })
				    .catch(function(err) {
				        console.log("Error occured");
				});
			}
  		};
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

// function widget2html(widget){
//     html = "";
//     let btnSize = widget['dimensions']['width'] + 'x' + widget['dimensions']["height"];
//     var colors_Array = [];
//     for (let i = 0; i < Object.keys(colors).length; i++){
//         if (widget['color'][Object.keys(colors)[i]]>0.1){
//             colors_Array.push({"c":Object.keys(colors)[i],"no":widget['color'][Object.keys(colors)[i]]});
//         }
//     }
//     colors_Array.sort(compare('no'))
    
//     html += '<div id="'+ widget['name'] + '" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="gridModalLabel" style="display: none;" aria-hidden="true">'
//     html += '   <div class="modal-dialog modal-xl" role="document">'
//     html += '       <div class="modal-content">'
    
//     html += '           <div class="modal-header">'
//     html += '               <h5 class="modal-title"><a href="' + widget['url'] + '">' + widget['application_name'] + '</a></h5>'
//     html += '               <div class="share-button share-button-top relative"></div>' 
//     html += '               <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>'
//     html += '           </div>'

//     html += '           <div class="modal-body">'
//     html += '               <div class="container-fluid">'
//     html += '                   <div class="row">'
//     html += '                       <div class="col-md-7" style="position:relative; zoom:0.5">'
//     html += '                           <img src="./images/BIG_DATA/screenshots/' + widget['src'] + '" style=" cursor: hand;"/>'
//     // html += '                           <img src="https://storage.googleapis.com/ui-collection/' + urlAdd + '" style=" cursor: hand;"/>'
//     html += '                       </div>'
//     html += '                       <div class="col-md-5">'
//     html += '                           <table class="table table-borderless">'
//     html += '                               <tbody>'
//     html += '                                   <tr>'
//     html += '                                       <th scope="row">Package:</th>'
//     html += '                                       <td style="word-break:break-all">' + widget['package_name'] + '</td>'
//     html += '                                   </tr>'
//     html += '                                   <tr>'
//     html += '                                       <th scope="row">Category:</th>'
//     html += '                                       <td>' + widget['category'] + '</td>'
//     html += '                                   </tr>'
//     html += '                                   <tr>'
//     html += '                                       <th scope="row">Text:</th>'
//     if(widget['text'] == 0){
//         html +=	'	    	<td>' + " " + '</td>';
//     }else{
//         html +=	'	    	<td>' + widget['text'] + '</td>';
//     }
//     html += '                                   </tr>'
//     html += '                                   <tr>'
//     html += '                                       <th scope="row">Font:</th>'
//     if(widget['font'] == ""){
//         html +=	'	    	<td>' + " " + '</td>';
//     }else{
//         html +=	'	    	<td>' + widget['font'] + '</td>';
//     }
//     html += '                                   </tr>'
//     html += '                                   <tr>'
//     html += '                                       <th scope="row">Class:</th>'
//     html += '                                       <td>' + widget['widget_class'] + '</td>'
//     html += '                                   </tr>'
//     html += '                                   <tr>'
//     html += '                                       <th scope="row">Coordinates:</th>'
//     html += '                                       <td class="coords">[' + widget['coordinates']['from'] + '][' + widget['coordinates']['to'] + ']</td>'
//     html += '                                   </tr>'
//     html += '                                   <tr>'
//     html += '                                       <th scope="row">Size:</th>'
//     html += '                                       <td class="widSize">' + btnSize + '</td>'
//     html += '                                   </tr>'
//     html += '                                   <tr>'
//     html += '                                       <th scope="row">Color:</th>'
//     html += '                                       <td><div class="d-flex justify-content-center">'
//     for (let z = 0; z < colors_Array.length; z++){
//         html += '                                       <div class="row">'+'<div class="circle" style="background-color:'+colors[colors_Array[z]['c']]+'"></div>'
//     }
//     html += '                                       </div></td>'
//     html += '                                   </tr>'
//     html += '                                   <tr>'
//     html += '                                       <th scope="row">Developer:</th>'
//     html += '                                       <td>' + widget['Developer']+ '</td>'
//     html += '                                   </tr>'
//     html += '                                   <tr>'
//     html += '                                       <th scope="row">Downloads:</th>'
//     html += '                                       <td>' + widget['downloads'] + '</td>'
//     html += '                                   </tr>'
//     html += '                                   <tr>'
//     html += '                                       <th scope="row">Date:</th>'
//     html += '                                       <td>' + widget['date'] + '</td>'
//     html += '                                   </tr>'
//     html += '                                   <tr>'
//     html += '                                       <th scope="row">Similar:</th>'
//     html += '                                       <td><div class="row">'
//     // if (widget['sims']==null){
//     //     html += 'None'
//     // }else{
//     //     for (let z = 0; z < widget['sims'].length; z++){
//     //         html += '<div class="col-md-auto">'
//     //         html += '   <img class="img-fluid pb-1" src="./images/BIG_DATA/all_widgets/' + widget['sims'][z] + '.png" />'
//     //         // html += '   <img class="img-fluid pb-1" src="https://storage.googleapis.com/ui-collection/Mywidgets/' + sim_widget['name'] + '.png" />'
//     //         html += '</div>'
//     //     }
//     // }
//     html += '                                       </div></td>'
//     html += '                                   </tr>'
//     html += '                                   <tr>'
//     html += '                                       <td align="center" colspan="2"><i>We only annotate the selected UI elements in theimage.</i></td>'
//     html += '                                   </tr>'
//     html += '                               </tbody>'
//     html += '                           </table>'
//     html += '                       </div>'
//     html += '                   </div>'
//     html += '               </div>'
//     html += '           </div>'

//     html += '           <div class="modal-footer">'
//     html += '               <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>'
//     html += '           </div>'
    
//     html += '       </div>'
//     html += '   </div>'
//     html += '</div>'
//     html += '<div class="col-md-auto">'
//     html += '   <img data-toggle="modal" data-target="#'+widget['name'] + '" class="img-fluid pb-1" src="./images/BIG_DATA/all_widgets/' + widget['name'] + '.png" style="max-height:100px; cursor:pointer" />'
//     // html += '   <img data-toggle="modal" data-target="#'+widget['name'] + '" class="img-fluid pb-1" src="https://storage.googleapis.com/ui-collection/Mywidgets/' + widget['name'] + '.png" style="max-height:100px; cursor:pointer" />'
//     html += '</div>'
//     return html
// };

// function compare(property){
//   return function(a,b){
//       var value1 = a[property];
//       var value2 = b[property];
//       return value2 - value1;
//   }
// };

module.exports = router;
