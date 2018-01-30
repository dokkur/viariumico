/**
 * @author Arthur Chafonov <actuosus@gmail.com>
 * @fileoverview Tracking code support definitions
 * @version 1.0.0
 * @module shared/trackers
 */


/* globals ga, Ya */

const DEFAULT_LABEL = 'Main Campaign';

/**
 * Send event to Google Analytics
 *
 * @param {string} action - Event action name
 *
 * @returns void
 *
 * @see https://developers.google.com/analytics/devguides/collection/analyticsjs/events
 */
export function gaTrackEvent(action) {
  if ('ga' in window) {
    const category = 'UX';

    console.debug('Will track Google Analytics event', category, action, DEFAULT_LABEL);

    ga('send', 'event', category, action, DEFAULT_LABEL);
  }
}

/**
 * Helper to get first Yandex Metrika counter
 *
 * @return {Object|undefined}
 *
 * @private
 */
function _yaGetCounter() {
  if ('Ya' in window) {
    const counters = Ya.Metrika.counters();
    if (counters.length) {
      // Get only first counter
      const counterKey = 'yaCounter' + counters[0].id;
      if (counterKey in window) {
        return window[counterKey];
      }
    }
  }
}

/**
 * Send goal reach event to Yandex Metrika
 *
 * @param {string} target - Event target name
 * @param {Object=} params - Optional params
 *
 * @returns void
 *
 * @see https://yandex.ru/support/metrika/objects/reachgoal.html
 */
export function ymReachGoal(target, params) {
  const counter = _yaGetCounter();

  if (counter) {
    console.debug('Will track Yandex Metrika goal', target, params);

    counter.reachGoal(target, params);
  }
}

/**
 * Simplified event sender for Google Analytics and Yandex Metrika
 *
 * @param {string} name - Event or target name
 *
 * @throws Error
 *
 * @returns void
 */
export function trackEvent(name) {
  if (!name) {
    throw new Error('Event name is required to track it.');
  }

  console.debug('Will track event', name);

  gaTrackEvent(name);
  ymReachGoal(name);
}
