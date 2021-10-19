const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Brew = mongoose.model('Brew');



router.get('/', (req, res) => {
    Brew.find((err, docs) => {
        if (!err) {
            docs= docs.map(item=> item.toObject())
            res.render("brew/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving employee list :' + err);
        }
    });
});



router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var brew = new Brew();
    brew.fullName = req.body.fullName;
    brew.date = req.body.email;
    brew.save((err, doc) => {
        if (!err)
            res.redirect('brew/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("brew/addOrEdit", {
                    viewTitle: "Insert brew",
                    brew: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    Brew.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('brew/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("brew/edit", {
                    viewTitle: 'Brew Update',
                    brew: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/list', (req, res) => {
    Brew.find((err, docs) => {
        if (!err) {
            docs= docs.map(item=> item.toObject())
            res.render("brew/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving employee list :' + err);
        }
    });
});



function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    Brew.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("brew/addOrEdit", {
                viewTitle: "Update Brew",
                employee: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Brew.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/brew/list');
        }
        else { console.log('Error in brew delete :' + err); }
    });
});

module.exports = router;