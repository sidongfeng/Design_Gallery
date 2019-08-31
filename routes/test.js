const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    let q = req["query"]["text"];

    const mongoDB = 'mongodb://tony970412:qq649114807@ds243212.mlab.com:43212/mygallery';
    const mongoose = require('mongoose');
    mongoose.connect(mongoDB);
    const db = mongoose.connection;
    var Template = require('../models/query.js');
    const test = new Template({
        myRef: mongoose.Types.ObjectId,
        query: q
    });
    db.collection('query').save(test, function(error, record){
        if (error) throw error;
        console.log("data saved");
    });

    // const fs = require('fs') 
    // fs.appendFile('Query.txt', q, (err) => { 
    //     // In case of a error throw err. 
    //     if (err) throw err; 
    // }) 
    console.log("query: "+q)
    res.render('test', {title: 'Mobile UI Gallery - Test'});
});

module.exports = router;
