const express = require('express');
const app = express();
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const models = require('./models');
const routes = require('./routes/wiki');
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());



app.use(morgan('dev'));


app.use(express.static('views'));

app.get('/', function(req, res, next){
    res.render('index');
})

var env = nunjucks.configure('views', {noCache: true});
// have res.render work with html files
app.set('view engine', 'html');
// when res.render works with html files, have it use nunjucks to do so
app.engine('html', nunjucks.render);

app.use('/', routes);




models.User.sync({})
.then(function () {
    return models.Page.sync({})
})
.then(function () {
    app.listen(3000, function () {
        console.log('Server... on port 3000!');
    });
})
.catch(console.error);
