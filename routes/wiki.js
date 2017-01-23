const express = require('express');
const router = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;

router.get('/', function(req, res, next){

    var page = Page.findAll({}).then(function(pages){
        res.render('index.html', {pages:pages});
    });
});

router.get('/wiki', function(req, res, next){
    res.redirect('/');
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
        //console.log(pageInstance)
        var url = pageInstance.getRoute;

        res.redirect(url);
    });

    //res.redirect('/wiki/'+page.urlTitle);

});

router.get('/wiki/:url',function(req,res,next){
    //var urlTitle = req.params.url;

    Page.findOne({
        where: {
            urlTitle: req.params.url
        }
    })
    .then(function(foundPage){

        res.render('wikipage.html',{foundPage})  // nees to be object?
        //res.json(foundPage);
    })
    .catch(next);
       //res.send(urlTitle);
   });



module.exports = router;
