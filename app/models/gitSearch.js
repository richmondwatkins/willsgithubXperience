/* jshint unused: false*/
'use strict';
var async = require('async');
var request = require('request');
var _ = require('lodash');

var Mongo = require('mongodb');
var queries = global.nss.db.collection('queries');

class GitSearch{
  static getGitUsersByLocation(location, fn){
    console.log(location);

    var url = 'https://api.github.com/search/users?q=location:'+location+'&per_page=50&page=0?access_token=30a6a5b5ce1ff32e995409afb5b19f611a996374';

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

        var saveData = {};
        saveData.query = location;
        saveData.numRepos = languages.length;
        saveData.languages = Object.keys(uniques).map(key=>{ var temp={}; temp.language = key; temp.count = uniques[key]; return temp;});
        saveData.languages = _.sortBy(saveData.languages, 'count');
        queries.save(saveData, ()=>{callBack(saveData);});

      });
    });


  }

  static search(location, fn){
    GitSearch.findByQuery(location, record=>{
      if(record){
        fn(record);
      }else{
        GitSearch.getReposByLocation(location, data=>{
          fn(data);
        });
      }
    });
  }

  static findByQuery(location, fn){
    queries.findOne({query:location}, (e, record)=>{
      fn(record);
    });
  }
}

module.exports = GitSearch;
