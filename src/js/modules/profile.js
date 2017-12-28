/**
 * @author Arthur Chafonov <actuosus@gmail.com>
 * @fileoverview
 * @version 1.0.0
 * @module
 */

import $ from 'jquery';
import Clipboard from 'clipboard';

export default function profile() {
  $('.via-address-field .via-copy-btn').each((_, item) => new Clipboard(item));
}
