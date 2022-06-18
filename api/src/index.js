const express = require('express');
const cors = require('cors');

const routes = require('./routes')

const app = express()

app.use(cors());
app.use(express.urlencoded({extended : false}))
app.use(express.json())
app.use('/', routes)

port = process.env.PORT || 5000

app.listen(port, function(err){
    if(err) console.error(err);
    console.log('API INICIADA NA PORTA 5000') 
});