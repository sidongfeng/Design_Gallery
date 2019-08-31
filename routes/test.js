const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    let q = req["query"]["text"];
    let ip = "";
    var os = require('os');
    var ifaces = os.networkInterfaces();

    Object.keys(ifaces).forEach(function (ifname) {
        var alias = 0;

        ifaces[ifname].forEach(function (iface) {
            if ('IPv4' !== iface.family || iface.internal !== false) {
            // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
            return;
            }
            if (alias >= 1) {
                // this single interface has multiple ipv4 addresses
                ip = iface.address
            } else {
                // this interface has only one ipv4 adress
                ip = iface.address
            }
            ++alias;
        });
    });

    const mongoDB = 'mongodb://tony970412:qq649114807@ds243212.mlab.com:43212/mygallery';
    const mongoose = require('mongoose');
    mongoose.connect(mongoDB);
    const db = mongoose.connection;
    var Template = require('../models/query.js');
    const test = new Template({
        myRef: mongoose.Types.ObjectId,
        query: q,
        ip: ip
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
    console.log("query: "+q+" ip: "+ip)
    res.render('test', {title: 'Mobile UI Gallery - Test'});
});

module.exports = router;
