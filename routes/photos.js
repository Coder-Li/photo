var photos = [];

var Photo = require('../models/Photo');    //引入Photo模型
var path = require('path');
var fs = require('fs');
var join = path.join;


// photos.push({
//     name: 'Node.js Logo',
//     path: 'http://nodejs.org/images/logos/nodejs-green.png'
// });

// photos.push({
//     name: 'Ryan Speaking',
//     path: 'http://nodejs.org/images/ryan-speaker.jpg'
// });

// exports.list = function(req, res){
//     res.render('photos', {
//         title: 'Photos',
//         photos: photos
//     });
// };

exports.list = function(req, res, next){
    Photo.find({}, function(err, photos){         //{} 查出photo集合中的所有记录
        if(err) return next(err);
        res.render('photos', {
            titile: 'Photos',
            photos: photos
        });
    });
};

exports.form = function(req, res){
    res.render('photos/upload', {
        title: 'Photo upload'
    });
};

exports.submit = function(dir){
    //默认为原来的文件名
    return function(req, res, next){
        var img = req.files.photo.image;
        var name = req.body.photo.name || img.name;
        var path = join(dir, img.name);
        //重命名文件
        fs.rename(img.path, function(err){
            if(err) return next(err);
            
            Photo.create({
                name: name,
                path: img.name
            },function(err){
                if(err) return next(err);     //委派错误
                res.redirect('/');         //重定向到首页
            });
        });
    };
};