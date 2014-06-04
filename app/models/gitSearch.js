/* jshint unused: false*/
'use strict';
var async = require('async');
var request = require('request');
var _ = require('lodash');
var queries = global.nss.db.collection('queries');

class GitSearch{
  static getGitUsersByLocation(location, fn){
    console.log(location);
    var url = 'https://api.github.com/search/users?q=location:'+location+'&per_page=50&page=3?access_token=30a6a5b5ce1ff32e995409afb5b19f611a996374';
      request({headers:{'User-Agent':'richmondwatkins'}, url:url}, function (error, response, body) {
        body = eval('(' + body + ')');
        var logins = body.items.map(user=>user.login);
        fn(logins); // Print the google web page.
    });
  }

  static getReposByLocation(location, callBack){
    var total = 0;
    var gitSearch = new GitSearch();
    GitSearch.getGitUsersByLocation(location, logins=>{
      var tasks = [];
      logins.forEach(login=>{
        tasks.push((fn)=>{
          var url = 'https://api.github.com/users/'+login+'/repos?access_token=30a6a5b5ce1ff32e995409afb5b19f611a996374';
          request({headers:{'User-Agent':'richmondwatkins'}, url:url}, function(error, response, body){
            var repos = eval('('+body+')');
            fn(null, repos);
          });
        });
      });
      async.parallel(tasks, (e, results)=>{
        results = _.flatten(results);
        var languages = _(results.map(r=>r.language)).compact().valueOf();
        var uniques = {};
        _.uniq(languages).forEach(lang=> uniques[lang] = 0);
        languages.forEach(lang=>uniques[lang]++);
        callBack(uniques);
        console.log(uniques);
        gitSearch.languages = uniques;
        gitSearch.location = location;
        queries.save(gitSearch, ()=>{});
      });
    });


  }

}

module.exports = GitSearch;
