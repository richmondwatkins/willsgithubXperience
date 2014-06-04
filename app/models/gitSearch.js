/* jshint unused: false*/
'use strict';
var async = require('async');
var request = require('request');
var client = request.newClient('http://localhost:5000/');


class GitSearch{



  static getGitUsersByLocation(location, fn){
      request('https://api.github.com/search/users?q=location:'+location+'&per_page=100&page=3?access_token=30a6a5b5ce1ff32e995409afb5b19f611a996374', function (error, response, body) {
      if (!error && response.statusCode === 200) {
        fn(body); // Print the google web page.
      }
    });
  }



}

module.exports = GitSearch;
