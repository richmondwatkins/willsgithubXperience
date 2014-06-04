(function(){
  'use strict';

  $(document).ready(init);

  function init(){
    get();
  }



  function get() {
    var url = 'https://api.github.com/search/users?q=location:nashville&per_page=100&page=3?access_token=30a6a5b5ce1ff32e995409afb5b19f611a996374';
    $.getJSON(url, data=>{

    for(var i = 0; i <data.items.length; i++){
       var logins = data.items[i].login;

      repos(logins);
    }
    console.log(langArray);
  });
  }

  function repos(logins) {
    var url = 'https://api.github.com/users/'+logins+'/repos?access_token=30a6a5b5ce1ff32e995409afb5b19f611a996374';
    $.getJSON(url, data=>{
      language(data);

  });
  }

  var langArray = [];
   function language(data) {
     for(var i = 0; i < data.length; i++){
       langArray.push(data[i].language);
     }
  }


})();
