const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    const fs = require('fs') 
    let query = req["query"]["text"]+'\n'
    fs.appendFile('Query.txt', query, (err) => { 
        // In case of a error throw err. 
        if (err) throw err; 
    }) 
    console.log("query: "+query)
    res.render('test', {title: 'Mobile UI Gallery - Test'});
});

module.exports = router;
