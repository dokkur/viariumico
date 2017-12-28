/**
 * @author Arthur Chafonov <actuosus@gmail.com>
 * @fileoverview
 * @version 1.0.0
 * @module
 */

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-grid.css';
import $ from 'jquery';
import register from './modules/register';
import profile from './modules/profile';

$(document).ready(() => {
  register();
  profile();
});
