const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postItSchema = new Schema({
    title: {
        type: String, required: true
    },
    content: {
        type: String, required: true
    },
    user_id: {
        type: String, required: true
    },
});

module.exports = mongoose.model('PostIt', postItSchema);