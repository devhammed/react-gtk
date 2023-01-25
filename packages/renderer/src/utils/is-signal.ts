/**
 * Check if [key] is a signal prop.
 */
export const isSignal = (key: string): boolean => {
  return key.indexOf('on') == 0 && key.length > 2;
};
