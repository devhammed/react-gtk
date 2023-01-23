/**
 * Check if [key] is a signal prop.
 *
 * @param {string} key
 * @returns {boolean}
 */
export const isSignal = (key) => {
  return key.indexOf('on') == 0 && key.length > 2;
};
