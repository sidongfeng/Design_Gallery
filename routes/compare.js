const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('compare', {title: 'Mobile UI Gallery - Compare'});
});

module.exports = router;
