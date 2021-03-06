const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
var favicon = require('serve-favicon')
const app = express();

// settings 

app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    extname: '.hbs'
}));

app.set('view engine', 'hbs');

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));

// routes
var mainRout = require('./routes/index')
app.use(mainRout);

// static files
app.use(express.static(path.join(__dirname, 'public')));


module.exports = app