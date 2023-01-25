/**
 * Transforms a string into kebab-case.
 *
 * e.g "camelCase" will be returned as "camel-case".
 */
export const toKebabCase = (str: string): string => {
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
