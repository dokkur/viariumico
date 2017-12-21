import $ from "jquery";
window.$ = $;
window.Popper = require('popper.js').default;
require('bootstrap');
import bootbox from "bootbox";
import moment from "moment";
import countdown from "jquery-countdown";

$(document).ready(function(){
  
  var langFromUrl = window.location.pathname.replace(/\//g,'');
  if (langFromUrl) {
    $('#langBtn').data('lang', langFromUrl);
    $('#langBtn').text(langFromUrl.toUpperCase());
  }

  /* language selector */
    $('#langBtn').click(function(event) {
      var actualLang = $(event.target).data().lang;
      var langPanel = $(event.target).parent().find('#langPanel');
      var actualLangItem = langPanel.children().children("[data-lang=" + actualLang + "]");
      actualLangItem.addClass('-active');
      actualLangItem.detach().sort();
      langPanel.children().prepend(actualLangItem);
      langPanel.addClass('-visible');
    });

    $('#langPanel').click(function(event) {
      // event.preventDefault();
      if ($(event.target).parent().data().lang) {
        $('#langBtn').data('lang', $(event.target).parent().data().lang);
        $('#langBtn').text($(event.target).parent().text());
      }
      $('#langPanel').removeClass('-visible');
      $('#langPanel').find('li').removeClass('-active');
    });
  /**/

  /* count down */
    var endTime = "2018-01-20T16:00:00+00:00";
    var formattedEndTime = moment(new Date(endTime)).format('YYYY/MM/DD HH:mm');
    $('#days').countdown(formattedEndTime, function(event) {
      $(this).html(event.strftime('%d'));
    });

    $('#hours').countdown(formattedEndTime, function(event) {
      $(this).html(event.strftime('%H'));
    });

    $('#minutes').countdown(formattedEndTime, function(event) {
      $(this).html(event.strftime('%M'));
    });

    $('#seconds').countdown(formattedEndTime, function(event) {
      $(this).html(event.strftime('%S'));
    });
  /**/

  /* send feedback form */
    $('#feedbackForm').submit(function(event) {
      event.preventDefault();
      var form = $(event.target).find("#email").serialize();
      var email = $(event.target).find("#email").val();
      if (!email) {
        bootbox.alert({
          title: "Введите ваш E-mail адрес",
          message: "<p>Похоже вы забыли ввести ваш E-mail адрес ...</p>",
          backdrop: true,
          callback: function(){ 
            console.log('email is empty');
          }
        });
        return false;
      }
      $.ajax({
          type: "POST",
          url: "https://worldwifi.herokuapp.com/create_request",
          data: form,
          success: function () {
              bootbox.alert({
              title: "Успех!",
              message: "Ваша заявка успешно отправлена",
              backdrop: true,
              callback: function(){ 
                console.log('succes');
                $('#feedbackForm').find("#email").val('');
              }
            });
          },
          error: function () {
            bootbox.alert({
              title: "Нам не удалось отправить вашу заявку",
              message: "Что-то пошло не так...",
              backdrop: true,
              callback: function(){ 
                console.log('server error');
              }
            });
          }
      });
      return false;
    });
  /**/

  /* modals */
    /* Buy token */
      $('#buyToken').click(function(event) {
          var buyTokenPopUp = bootbox.dialog({
            title: 'INVEST VIARIUM',
            message: '<p></p>',
            backdrop: true,
          });
          buyTokenPopUp.find('.bootbox-body').html($('#buyTokenPopUp').clone());

          /* send Buy token form */
            $(buyTokenPopUp).find('form').submit(function(event) {
              event.preventDefault();
              var form = $(event.target).find(".via-form-input").serialize();
              var email = $(event.target).find(".via-form-input").val();
              if (!email) {
                bootbox.alert({
                  title: "Введите ваш E-mail адрес",
                  message: "Похоже вы забыли ввести ваш E-mail адрес ...",
                  backdrop: true,
                  callback: function(){ 
                    console.log('email is empty');
                  }
                });
                return false;
              }
              $.ajax({
                  type: "POST",
                  url: "https://worldwifi.herokuapp.com/create_request",
                  data: form,
                  success: function () {
                      bootbox.alert({
                      title: "Успех!",
                      message: "Ваша заявка успешно отправлена",
                      backdrop: true,
                      callback: function(){ 
                        console.log('succes');
                        $('#feedbackForm').find("#email").val('');
                      }
                    });
                  },
                  error: function () {
                    bootbox.alert({
                      title: "Нам не удалось отправить вашу заявку",
                      message: "Что-то пошло не так...",
                      backdrop: true,
                      callback: function(){ 
                        console.log('server error');
                      }
                    });
                  }
              });
              return false;
            });
          /**/
      });
    /**/

    /* Get WP */
      $('#getWP').click(function(event) {
          var getWpPopUp = bootbox.dialog({
            title: 'INVEST VIARIUM',
            message: '<p></p>',
            backdrop: true,
          });
          getWpPopUp.find('.bootbox-body').html($('#getWpPopUp').clone());

          /* send Buy token form */
            $(getWpPopUp).find('form').submit(function(event) {
              event.preventDefault();
              var form = $(event.target).find(".via-form-input").serialize();
              var email = $(event.target).find(".via-form-input").val();
              if (!email) {
                bootbox.alert({
                  title: "Введите ваш E-mail адрес",
                  message: "Похоже вы забыли ввести ваш E-mail адрес ...",
                  backdrop: true,
                  callback: function(){ 
                    console.log('email is empty');
                  }
                });
                return false;
              }
              $.ajax({
                  type: "POST",
                  url: "https://worldwifi.herokuapp.com/create_request",
                  data: form,
                  success: function () {
                      bootbox.alert({
                      title: "Успех!",
                      message: "Ваша заявка успешно отправлена",
                      backdrop: true,
                      callback: function(){ 
                        console.log('succes');
                        $('#feedbackForm').find("#email").val('');
                      }
                    });
                  },
                  error: function () {
                    bootbox.alert({
                      title: "Нам не удалось отправить вашу заявку",
                      message: "Что-то пошло не так...",
                      backdrop: true,
                      callback: function(){ 
                        console.log('server error');
                      }
                    });
                  }
              });
              return false;
            });
          /**/
      });
    /**/
  /**/
});