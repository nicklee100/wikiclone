const express = require('express');
const app = express();
const morgan = require('morgan');
const nunjucks = require('nunjucks');
app.use(morgan('dev'));

app.use(express.static('views'));

var env = nunjucks.configure('views', {noCache: true});
// have res.render work with html files
app.set('view engine', 'html');
// when res.render works with html files, have it use nunjucks to do so
app.engine('html', nunjucks.render);

app.listen(3000, () => console.log(' .... running on 3000' ));
