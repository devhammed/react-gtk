import { isSignal } from './is-signal';
import { toKebabCase } from './to-kebab-case';

/**
 * Set props and signals of a Gtk.Widget.
 *
 * @param {Gtk.Widget} instance
 * @param {Record<string, any>} props
 */
export const setProps = (instance, props) => {
  // The array of signals to attach...
  const signals = [];

  // Set properties...
  for (let prop in props) {
    if (!props.hasOwnProperty(prop) || prop === 'children') {
      continue;
    }

    const value = props[prop];

    if (isSignal(prop)) {
      signals.push({
        name: toKebabCase(prop),
        handler: value,
      });
    } else {
      instance[prop] = value;
    }
  }

  // Attach $signals object if needed...
  if (!instance.$signals) {
    instance.$signals = {};
  }

  // Then disconnect and connect event handlers...
  signals.forEach(({ name, handler }) => {
    if (typeof instance.$signals[name] !== 'undefined') {
      instance.disconnect(instance.$signals[name]);
      delete instance.$signals[name];
    }

    if (typeof handler === 'function') {
      return (instance.$signals[name] = instance.connect(name, handler));
    }
  });
};
