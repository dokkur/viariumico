/**
 * @author Arthur Chafonov <actuosus@gmail.com>
 * @fileoverview
 * @version 1.0.0
 * @module
 */

import 'bootstrap/dist/css/bootstrap-grid.css';
import 'intl-tel-input';
import 'intl-tel-input/build/css/intlTelInput.css';

import $ from 'jquery';

$(document).ready(function(){
  const countryData = $.fn.intlTelInput.getCountryData();
  const $phoneInput = $('#phone');
  const $countryDropdown = $('#country');

  $.each(countryData, function(i, country) {
    console.log(country);
    $countryDropdown.append($('<option></option>').attr('value', country.iso2).text(country.name));
  });

  $countryDropdown.change(function() {
    $phoneInput.intlTelInput('setCountry', $(this).val());
  });

  $phoneInput.intlTelInput();
});
