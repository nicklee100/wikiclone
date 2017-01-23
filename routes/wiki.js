const express = require('express');
const router = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;

router.get('/wiki', function(req, res, next){
    res.redirect('/');
});

router.get('/', function(req, res, next){
    res.send('home page');
});

router.get('/wiki/add', function(req, res, next){
    res.render('addpage');
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
    });

    page.save().then(function(pageInstance){
        console.log(pageInstance.dataValues.urlTitle);
        var url = pageInstance.dataValues.urlTitle;
        res.redirect('/wiki/'+url);
    });

    //res.redirect('/wiki/'+page.urlTitle);

});

 router.get('/wiki/:url',function(req,res,next){
     var urlTitle = req.params.url;

     res.send(urlTitle);
 });



module.exports = router;
