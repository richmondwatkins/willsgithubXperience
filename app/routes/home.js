'use strict';
var traceur = require('traceur');
var GitSearch = traceur.require(__dirname + '/../../app/models/gitSearch.js');

exports.index = (req, res)=>{
  res.render('home/index', {title: 'Node.js: Home'});
};


exports.search = (req, res)=>{
  GitSearch.search(req.query.location, data=>{
    res.send(data);
  });


};
