const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const new_widgetSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: {type: String, required: true, max: 100},
    color: {
        Black: Number,
        White: Number,
        Red: Number,
        Lime: Number,
        Yellow:Number,
        Green: Number,
        Cyan: Number,
        Blue: Number,
        Magenta: Number
    },
    coordinates: {
        from: [Number],
        to: [Number]
    },
    dimensions: {
        height: Number,
        width: Number
    },
    package_name: {type: String, required: true, max: 100},
    text: {type: String, max: 200},
    category: {type: String, max: 50},
    widget_class: {type: String, required: true},
    
    application_name: {type: String, required: true, max: 100},
    downloads: String,
    url: String,
    src: {type: String, required: true}
},{ collection: "new_widgets" });



module.exports = mongoose.model('New_Widget', new_widgetSchema);
