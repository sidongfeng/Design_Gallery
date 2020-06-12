const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const favicon = require('serve-favicon');

// mongoDB
const mongoose = require('mongoose');
const uri = "mongodb+srv://charlie1996:charlie1996@cluster0-uj71s.mongodb.net/dcgallery?retryWrites=true&w=majority";
mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
});
console.log("connected!!!")
const db = mongoose.connection;

require('./models/widget');
const Widget = mongoose.model('Widget');


const homeRouter = require('./routes/home');
const searchRouter = require('./routes/search');
const aboutRouter = require('./routes/about');
const contactRouter = require('./routes/contact');
const detailRouter = require('./routes/detail');
const compareRouter = require('./routes/compare');
const testRouter = require('./routes/test');
const app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(__dirname + '/public/images/favicon.ico'));

app.use('/',homeRouter);
app.use('/search', searchRouter);
app.use('/about', aboutRouter);
app.use('/contact', contactRouter);
app.use('/detail', detailRouter);
app.use('/compare',compareRouter);
app.use('/test',testRouter);

app.get('/findobj', function (req, res, next) {
    console.log(req.query.name)
    const findObj = async() =>{
        let widget = await Widget.find({"name": req.query.name} );
        console.log(widget)
        res.json({widget: widget});
    }
    findObj();
});


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    let msg = req.app.get('env') ? 'ERROR:' + err.message : '';
    console.log(err);

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


module.exports = app;
