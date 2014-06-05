/* global AmCharts:true */

(function(){
  'use strict';

  $(document).ready(init);

  function init(){
    $('#repos-header ').hide();
    $('#button').hide();
    $('#about-us').hide();
    $('#query').click(showButton);
    $('#search').click(search);
    $('#about').click(about);
  }

  function about(){
    $('#button').hide();
    $('#about-us').slideToggle();
  }

  function showButton(){
    $('#button').fadeIn();
  }

  function search(){
    $('#about-us').hide();
    var query = $('#query').val().toLowerCase().trim();
    console.log(query);

  $.ajax({url: '/search', type:'get', dataType: 'JSON', data: {location: query}, success: response=>{
      makeChart(response.languages);
      $('#repos-header').show();
      $('#repos').empty().append(response.numRepos);
  }});
  }

  var chart;
  function makeChart(response){
      chart = AmCharts.makeChart('chart', {  //#chart div
        'theme': 'none',
        'type': 'serial',
        'startDuration': 2,
          'dataProvider': response,    //response from ajax
          'valueAxes': [{
              'position': 'left',
              'title': 'Languages On Github By Location'
          }],
          'graphs': [{
              'balloonText': '[[category]]: <b>[[value]]</b>',
              'colorField': 'color',
              'fillAlphas': 1,
              'lineAlpha': 0.1,
              'type': 'column',
              'valueField': 'count'  //count
          }],
          'depth3D': 20,
        'angle': 30,
          'chartCursor': {
              'categoryBalloonEnabled': false,
              'cursorAlpha': 0,
              'zoomable': false
          },
          'categoryField': 'language',  //language
          'categoryAxis': {
              'gridPosition': 'start',
              'labelRotation': 90
          },
        'exportConfig':{
          'menuTop':'20px',
              'menuRight':'20px',
              'menuItems': [{
              'icon': '/lib/3/images/export.png',
              'format': 'png'
              }]
          }
      });
    }




})();
