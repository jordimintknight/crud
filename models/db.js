const mongoose = require('mongoose');

const connectionString = "mongodb+srv://test1:nebraska@cluster0.3rcmm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongoose.connect(connectionString, { useNewUrlParser: true , useUnifiedTopology: true }, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection : ' + err) }
});

require('./employee.model');

