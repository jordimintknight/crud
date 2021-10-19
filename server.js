require('./models/db');

const express = require('express');
const Handlebars = require('handlebars')
const path = require('path');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

const employeeController = require('./controllers/employeeController');
const appController = require('./controllers/appController');
const brewController = require('./controllers/brewController');

var router = express.Router();

var app = express();

app.use(bodyparser.urlencoded({extended: false}));
app.engine('handlebars', exphbs({
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}));
app.set('view engine', 'handlebars');

app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/' }));
app.set('view engine', 'hbs');

app.listen(3000, () => {
    console.log('Express server started at port : 3000');
});



app.use('/', appController);
app.use('/brew', brewController);
app.use('/employee', employeeController);