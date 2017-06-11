var app = angular.module('app', ['ui.router', 'firebase'])





app.controller('myCtrl', ['$scope', '$firebase', '$firebaseArray', function($scope, $firebase, $firebaseArray){


//nav bar function note

$(function(){
  $(window).scroll(function(){
    var winTop = $(window).scrollTop();
    if(winTop >= 340){
      $("body").addClass("sticky-header");
    }else{
      $("body").removeClass("sticky-header");
    }//if-else
  });//win func.
});//ready func.


// scrolling animations note

	$('a').click(function(){
    $('html, body').animate({
        scrollTop: $( $(this).attr('href')).offset().top - 59
    }, 1000);
    console.log($(document).scrollTop().valueOf());
    return false;
});


new WOW().init();

    $('.timeline').timelify({
        animRight: "fadeInRight",
        animCenter: "zoomIn"
    })



}])