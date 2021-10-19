const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Brew = mongoose.model('Brew');

router.get('/', (req, res) => {
    
    res.render("brew/addOrEdit", {
        viewTitle: "add a brew"
        
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var employee = new Brew();
    employee.fullName = req.body.fullName;
    employee.email = req.body.email;
    employee.mobile = req.body.mobile;
    employee.city = req.body.city;
    employee.save((err, doc) => {
        if (!err)
            res.redirect('Brew/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("brew/addOrEdit", {
                    viewTitle: "Insert brew",
                    employee: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    Employee.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('brew/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("brew/addOrEdit", {
                    viewTitle: 'Update brew',
                    employee: req.body
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
                viewTitle: "Update brew",
                employee: doc.toObject(),
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Brew.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/brew/list');
        }
        else { console.log('Error in employee delete :' + err); }
    });
});

module.exports = router;