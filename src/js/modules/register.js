/**
 * @author Arthur Chafonov <actuosus@gmail.com>
 * @fileoverview
 * @version 1.0.0
 * @module
 */

import 'intl-tel-input';
import 'intl-tel-input/build/js/utils'
import 'intl-tel-input/build/css/intlTelInput.css';

import $ from 'jquery';

// window.onRecaptchaLoad = () => {
//   window.grecaptcha.render($('.recaptcha').get(0), {sitekey: RECAPTCHA_KEY});
// };

export default function register() {
  const countryData = $.fn.intlTelInput.getCountryData();
  const $phoneInput = $('#phone');
  const $countryDropDown = $('#country');

  $.each(countryData, function(i, country) {
    $countryDropDown
      .append($('<option></option>')
        .attr('value', country.iso2)
        .text(country.name));
  });

  $countryDropDown.change(function() {
    $phoneInput.intlTelInput('setCountry', $(this).val());
  });
  $phoneInput.intlTelInput({
    hiddenInput: 'phone',
    autoPlaceholder: 'polite'
  });

  $countryDropDown.change();
}
