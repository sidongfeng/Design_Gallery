const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('screenshot', {title: 'Mobile UI Gallery - Screenshot'});
});

module.exports = router;
