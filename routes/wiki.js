const express = require('express');
const router = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;

router.get('/wiki', function(req, res, next){
    res.redirect('/');
    next();
});

router.get('/', function(req, res, next){
    res.send('home page')
    next();
});

router.get('/wiki/add', function(req, res, next){
    res.render('addpage');
    next();
});

//
//  ROUTES FOR USERS INFO
//

router.get('/users',function(req,res,next){
    res.send('hello');
});

router.get('/users/:id', function(req,res,next){
    var id = req.params.id;
    res.send(id);
});
router.post('/users', function(req,res,next){

    res.send('posting in user');
});

router.put('/users/:id', function(req,res,next){
    var id = req.params.id;
    res.send(id + ' put');
});

router.delete('/users/:id', function(req,res,next){
    var id = req.params.id;
    res.send(id + ' delete');
});

//
//

router.post('/wiki', function(req, res, next){
    var title = req.body.title;
    var text = req.body.text;

    var page = Page.build({
        title:      title,
        content:    text,
        urlTitle: title
    });

    page.save();

    res.redirect('/');

});



module.exports = router;
