const mongoose = require('mongoose');
const express = require('express');
var router = express.Router();
const Employee = mongoose.model('Employee');


router.get('/', (req, res) => {
	Employee.find((err, docs) => {
        if (!err) {
            docs= docs.map(item=> item.toObject())
            res.render('layouts/home', {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving employee list :' + err);
        }
    });
});


module.exports = router;