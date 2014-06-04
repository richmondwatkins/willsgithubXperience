/* global describe, it, before */
/* jshint expr:true */

'use strict';

process.env.DBNAME = 'will';

// var assert = require('chai').assert;
// var expect = require('chai').expect;
// var Mongo = require('mongodb');
var app = require('../../app/app');
var request = require('supertest');
var traceur = require('traceur');
var GitSearch;

describe('gitSearch', function(){
  before(function(done){
    request(app)
    .get('/')
    .end(function(){
      GitSearch = traceur.require(__dirname + '/../../app/models/gitSearch.js');
      done();
    });
  });// end before

  describe('.getReposByLocation', function(){
    it('should return an array of Git repos based on location', function(done){
      GitSearch.getReposByLocation('sf', function(repos){
        done();
      });
    });
  });


});
