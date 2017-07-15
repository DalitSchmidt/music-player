var Regexes = {
    /*validateInputs: {
        fullName: "/^[A-Za-z]+((\s)?((\'|\-|\.)?([A-Za-z])+))*$/",
        phone: "/^05[0-9]{2}-[0-9]{6}/",
        email: "[/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*"
    },*/

    bindEvents: function() {

    },

    init: function() {
        this.bindEvents();
    }
    };

Regexes.init();

/*

 new RegExp("^[A-Za-z]+(?:\s[A-Za-z0-9.,-_:;=+!?@#$%&*(){}|~^<>`']+)+$"),

 var pattern = /05[0-9]{2}-[0-9]{6}/
 undefined
 pattern.test('0522-312556')


 true
 pattern.test('erferff')


 false
*/

/*
 $("#add_album_form #next").click(function(){
 if(validateText($("#album_name")) && validateText($("#author_name")) && validateImage($("#img_url"))){
 $("#album_details").fadeOut(500,function(){
 $("#album_playList").fadeIn();
 });
 }
 });

 $("#img_url").change(function(){
 validateImage($(this));
 });

 $("#add_album_form").on('change',"#album_name ,#author_name, input[name='song_name[]']",function(){
 validateText($(this));
 });

 $("#add_album_form").on('change',"input[name='song_url[]']",function(){
 validateMp3($(this));
 });

 var validateText = function($inputObject){
 if($inputObject.val() != ""){
 $inputObject.parents('div.form-group').removeClass('has-error').addClass('has-success');
 $inputObject.parents('div.form-group').find('label').find('small').remove();
 return(true);
 }else{
 if(!$inputObject.parents('div.form-group').hasClass('has-error'))
 $inputObject.parents('div.form-group').find('label').append('<small> <i class="fa fa-exclamation-triangle"></i></small>');
 $inputObject.parents('div.form-group').addClass('has-error').removeClass('has-success');
 return(false);
 }
 }

 var validateImage = function($inputObject){
 var img = /^https?:\/\/(?:[a-z0-9\-]+\.)+[a-z0-9]{2,6}(?:\/[^\/#?]+)+\.(?:jpe?g|gif|png)$/;
 if(imgRegRegexex.test($inputObject.val())){
 $(".cover_preview img").attr('src',$inputObject.val());
 $inputObject.parents('div.form-group').removeClass('has-error').addClass('has-success');
 $inputObject.parents('div.form-group').find('label').find('small').remove();
 return(true);
 }else{
 if(!$inputObject.parents('div.form-group').hasClass('has-error'))
 $inputObject.parents('div.form-group').find('label').append('<small> <i class="fa fa-exclamation-triangle"></i></small>');
 $inputObject.parents('div.form-group').addClass('has-error').removeClass('has-success');
 return(false);
 }

 }

 var validateMp3 = function($inputObject){
 var imgRegex = /^https?:\/\/(?:[a-z0-9\-]+\.)+[a-z0-9]{2,6}(?:\/[^\/#?]+)+\.(?:mp3)$/;
 if(imgRegex.test($inputObject.val())){
 $inputObject.parents('div.form-group').removeClass('has-error').addClass('has-success');
 $inputObject.parents('div.form-group').find('label').find('small').remove();
 return(true);
 }else{
 if(!$inputObject.parents('div.form-group').hasClass('has-error'))
 $inputObject.parents('div.form-group').find('label').append('<small> <i class="fa fa-exclamation-triangle"></i></small>');
 $inputObject.parents('div.form-group').addClass('has-error').removeClass('has-success');
 return(false);
 }

 }
*/