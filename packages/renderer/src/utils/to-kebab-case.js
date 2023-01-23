/**
 * Transforms a string into kebab-case.
 *
 * e.g "camelCase" will be returned as "camel-case".
 *
 * @param {string} str
 * @returns {string}
 */
export const toKebabCase = (str) => {
  return str
    .slice(2)
    .split('')
    .map((letter, idx) => {
      return letter.toUpperCase() === letter
        ? `${idx !== 0 ? '-' : ''}${letter.toLowerCase()}`
        : letter;
    })
    .join('');
};
