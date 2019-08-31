const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const querySchema = new Schema({
    _id: Schema.Types.ObjectId,
    query: String,
    ip: String
},{ collection: "query" });


module.exports = mongoose.model('query', querySchema);
