var app = angular.module('app', ['ui.router', 'firebase'])





app.controller('myCtrl', ['$scope', '$firebase', '$firebaseArray', function($scope, $firebase, $firebaseArray){

  $('.button-collapse').sideNav({
      menuWidth: 250, // Default is 300
      edge: 'left', // Choose the horizontal origin
      closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
  });
//nav bar function note

$(function(){
  $(window).scroll(function(){
    var winTop = $(window).scrollTop();
    if(winTop >= 540){
      $("body").addClass("sticky-header");
    }else{
      $("body").removeClass("sticky-header");
    }//if-else
  });//win func.
});//ready func.


// scrolling animations note

	$('nav a').click(function(){
    $('html, body').animate({
        scrollTop: $( $(this).attr('href')).offset().top - 59
    }, 1000);
    console.log($(document).scrollTop().valueOf());
    return false;
});


$(window).height()

new WOW().init();

var width = $(window).width(); 

if (width >768){
    $('.timeline').timelify({
        animRight: "fadeInRight",
        animCenter: "zoomIn"
    })
    }
    else{
          $('.timeline').timelify({
        animRight: "fadeInRight",
        animLeft: "fadeInRight"
    })
    }



}])