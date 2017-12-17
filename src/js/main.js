import $ from "jquery";
window.$ = $;
window.Popper = require('popper.js').default;
require('bootstrap');
import bootbox from "bootbox";
import countdown from "jquery-countdown";

$(document).ready(function(){

  /* count down */
    $('#days').countdown('2018/01/20 16:00', function(event) {
      $(this).html(event.strftime('%d'));
    });

    $('#hours').countdown('2018/01/20 16:00', function(event) {
      $(this).html(event.strftime('%H'));
    });

    $('#minutes').countdown('2018/01/20 16:00', function(event) {
      $(this).html(event.strftime('%M'));
    });

    $('#seconds').countdown('2018/01/20 16:00', function(event) {
      $(this).html(event.strftime('%S'));
    });
  /**/

  /* sen form */
  $('#feedbackForm').submit(function(event) {
    event.preventDefault();
    var form = $(event.target).find("#email").serialize();
    var email = $(event.target).find("#email").val();
    if (!email) {
      bootbox.alert({ 
        title: "Введите ваш E-mail адрес",
        message: "Похоже вы забыли ввести ваш E-mail адрес ...", 
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