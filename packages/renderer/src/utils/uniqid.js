/**
 * Generate a unique random string.
 *
 * @returns {string}
 */
export const uniqid = () => {
  return 'xxxx-xxxx-xxx-xxxx'.replace(/[x]/g, function (c) {
    return Math.floor(Math.random() * 16).toString(16);
  });
};
