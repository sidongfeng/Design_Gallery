const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const widgetSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: {type: String, required: true, max: 100},
    package_name: {type: String, required: true, max: 100},
    screenshot: {type: String, required: true, max: 100}, // screenshot
    url: {type: String, max: 200}, // google store url
    Developer: {type: String, max: 100},
    application_name: {type: String, required: true, max: 100},
    category: {type: String, max: 50},
    color: {
        Blue: Number,
        Yellow: Number,
        Green: Number,
        Cyan: Number,
        Black: Number,
        White: Number,
        Magenta: Number,
        Red: Number,
        Lime: Number,
    },
    coordinates: {
        from: [Number],
        to: [Number]
    },
    date: {type: String, required: true, max: 100},
    dimensions: {
        height: Number,
        width: Number
    },
    downloads: {type: String, required: true, max: 100},
    font: {type: String, required: true, max: 100},
    text: {type: String, max: 200},
    widget_class: {type: String, required: true},
    img: String,
},{ collection: "widgets" });



module.exports = mongoose.model('Widget', widgetSchema);
