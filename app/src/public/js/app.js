var jQuery = require('jquery');
var Konami = require('konami-js');
var $ = jQuery;
window.$ = jQuery;
window.jQuery = jQuery;

new Konami(function(){
    alert('KONAMI!');
});

$('.what-mnfh-is-for').typeIt({
     whatToType: ["Friends.", "Foes"],
     typeSpeed: 100,
     breakLines: false
});
