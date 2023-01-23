import { setProps } from './set-props';

const { Gio, Gtk, GLib } = ((imports.gi.versions.Gtk = '4.0'), imports.gi);

/**
 * Create a Gtk.Widget from VDOM.
 *
 * @param {Object} vdom
 * @param {string} vdom.name
 * @param {Record<string, any>} vdom.props
 * @param {string} vdom.type
 * @param {string} vdom.childType
 * @returns {Gtk.Widget}
 */
export const createWidget = ({ name, props, type, childType }) => {
  const widget = new Gtk[name]();

  widget.$type = type;

  widget.$childType = childType;

  setProps(widget, props);

  return widget;
};
