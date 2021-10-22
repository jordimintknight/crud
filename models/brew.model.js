const mongoose = require('mongoose');

var brewSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: 'This field is required.'
    },
    date: {
        type: String
    }
});



mongoose.model('Brew', brewSchema);