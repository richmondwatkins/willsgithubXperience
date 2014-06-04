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

  describe('.search', function(){
    it('should return data from db if already searched, or create a new record', function(done){
      GitSearch.search('la', function(data){
        console.log(data);
        done();
      });
    });
  });


});
