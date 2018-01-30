/**
 * @author Arthur Chafonov <actuosus@gmail.com>
 * @fileoverview
 * @version 1.0.0
 * @module profile
 */

import $ from 'jquery';
import Clipboard from 'clipboard';
import {trackEvent} from './shared/trackers';

export default function profile() {
  /* bind clipboard copy  */
  $('.via-address-field .via-copy-btn').each((_, item) => {
    const clipboard = new Clipboard(item);

    clipboard.on('success', () => {
      const clipboardTargetSelector = $(item).data('clipboard-target');
      if ($.type(clipboardTargetSelector) === 'string' && clipboardTargetSelector) {
        const selectorSplits = clipboardTargetSelector.split('-');
        if (selectorSplits.length) {
          const currency = selectorSplits[selectorSplits.length - 1];
          if ($.type(currency) === 'string' && currency) {
            trackEvent(`copy_${currency}`);
          }
        }
      }
    });

    return clipboard;
  });
}
