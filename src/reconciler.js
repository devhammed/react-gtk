imports.gi.versions.Gtk = '4.0';

const { Gio, Gtk, GLib } = imports.gi;

const ReactReconciler = require('react-reconciler');

const windows = [];

const CHILD_TYPE_BOX = 'CHILD_TYPE_BOX';

const CHILD_TYPE_NONE = 'CHILD_TYPE_NONE';

const CHILD_TYPE_STACK = 'CHILD_TYPE_STACK';

const CHILD_TYPE_SINGLE = 'CHILD_TYPE_SINGLE';

const isSignal = (key) => key.indexOf('on') == 0 && key.length > 2;

const setProps = (instance, props) => {
  // The array of signals to attach...
  const signals = [];

  // Set properties...
  for (let prop in props) {
    if (!props.hasOwnProperty(prop)) {
      continue;
    }

    if (prop === 'children') {
      continue;
    }

    const value = props[prop];

    if (isSignal(prop)) {
      signals.push({
        name: prop
          .slice(2)
          .split('')
          .map((letter, idx) => {
            return letter.toUpperCase() === letter
              ? `${idx !== 0 ? '-' : ''}${letter.toLowerCase()}`
              : letter;
          })
          .join(''),
        handler: value,
      });
      continue;
    }

    instance[prop] = value;
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

const createWidget = ({ name, props, type, childType }) => {
  const widget = new Gtk[name]();

  widget.$type = type;

  widget.$childType = childType;

  setProps(widget, props);

  return widget;
};

const reconciler = ReactReconciler({
  now: Date.now,

  commitUpdate: setProps,

  supportsMutation: true,

  supportsHydration: false,

  createInstance(type, props, rootInstance, hostContext, instanceHandle) {
    switch (type) {
      case GtkWindow:
        const appId = rootInstance.application_id;
        const window = createWidget({
          type,
          props,
          name: 'Window',
          childType: CHILD_TYPE_SINGLE,
        });

        window.$appId = appId;

        window.$id = `${appId}-window-${'xxxx-xxxx-xxx-xxxx'.replace(
          /[x]/g,
          function (c) {
            return Math.floor(Math.random() * 16).toString(16);
          }
        )}`;

        window.connect('close-request', () => {
          window.visible = false;

          const activeAppWindows = windows.filter(
            (win) => win.$appId === appId && win.visible
          );

          if (activeAppWindows.length === 0) {
            rootInstance.loop.quit();
          }

          return true;
        });

        windows.push(window);

        return window;
      case GtkLabel:
        return createWidget({
          type,
          props,
          name: 'Label',
          childType: CHILD_TYPE_NONE,
        });
      case GtkBox:
      case GtkStackPage:
        return createWidget({
          type,
          props,
          name: 'Box',
          childType: CHILD_TYPE_BOX,
        });
      case GtkButton:
        return createWidget({
          type,
          props,
          name: 'Button',
          childType: CHILD_TYPE_SINGLE,
        });
      case GtkEntry:
        return createWidget({
          type,
          props,
          name: 'Entry',
          childType: CHILD_TYPE_NONE,
        });
      case GtkTextView:
        return createWidget({
          type,
          props,
          name: 'TextView',
          childType: CHILD_TYPE_NONE,
        });
      case GtkStack:
        return createWidget({
          type,
          props,
          name: 'Stack',
          childType: CHILD_TYPE_STACK,
        });
      default:
        throw new Error(`Unknown component type: ${type}`);
    }
  },

  createTextInstance(text, rootInstance, hostContext, instanceHandle) {
    throw new Error(
      'Strings are not supported as children, use GtkLabel instead.'
    );
  },

  getPublicInstance(instance) {
    return instance;
  },

  getRootHostContext(rootInstance) {
    return {};
  },

  getChildHostContext(parentHostContext, type) {
    return parentHostContext;
  },

  shouldSetTextContent() {
    return false;
  },

  commitTextUpdate(textInstance, oldText, newText) {
    throw new Error('commitTextUpdate should not be called');
  },

  prepareUpdate(instance, type, oldProps, newProps, rootInstance) {
    const finalProps = {};
    const mergedProps = { ...oldProps, ...newProps };

    for (let prop in mergedProps) {
      if (!mergedProps.hasOwnProperty(prop)) {
        continue;
      }

      if (prop in oldProps && !prop in newProps) {
        finalProps[prop] = null;
      } else if (prop in newProps && !prop in oldProps) {
        finalProps[props] = newProps[prop];
      } else if (
        prop in oldProps &&
        prop in newProps &&
        oldProps[prop] !== newProps[prop]
      ) {
        finalProps[prop] = newProps[prop];
      } else {
        continue;
      }
    }

    return Object.keys(finalProps).length > 0 ? finalProps : null;
  },

  prepareForCommit() {
    return null;
  },

  clearContainer() {
    return null;
  },

  resetAfterCommit() {
    return null;
  },

  appendInitialChild(parentInstance, child) {
    if (parentInstance instanceof Gtk.Application) {
      return;
    }

    switch (parentInstance.$childType) {
      case CHILD_TYPE_BOX:
        parentInstance.append(child);
        break;
      case CHILD_TYPE_SINGLE:
        parentInstance.child = child;
        break;
      case CHILD_TYPE_STACK:
        parentInstance.add_child(child);
        break;
      case CHILD_TYPE_NONE:
        throw new Error(`${parentInstance.$type} should not have children.`);
    }
  },

  appendChildToContainer(parentInstance, child) {
    if (parentInstance instanceof Gtk.Application) {
      return;
    }

    switch (parentInstance.$childType) {
      case CHILD_TYPE_BOX:
        parentInstance.append(child);
        break;
      case CHILD_TYPE_SINGLE:
        parentInstance.child = child;
        break;
      case CHILD_TYPE_STACK:
        parentInstance.add_child(child);
        break;
      case CHILD_TYPE_NONE:
        throw new Error(`${parentInstance.$type} should not have children.`);
    }
  },

  finalizeInitialChildren(instance, type, props, rootInstance) {
    return false;
  },

  removeChild(parentInstance, child) {
    if (parentInstance instanceof Gtk.Application) {
      return;
    }

    switch (parentInstance.$childType) {
      case CHILD_TYPE_SINGLE:
        parentInstance.child = null;
      case CHILD_TYPE_BOX:
      case CHILD_TYPE_STACK:
        parentInstance.remove(child);
        break;
      case CHILD_TYPE_NONE:
        throw new Error(`${parentInstance.$type} should not have children.`);
    }
  },

  removeChildFromContainer(parentInstance, child) {
    if (parentInstance instanceof Gtk.Application) {
      return;
    }

    switch (parentInstance.$childType) {
      case CHILD_TYPE_SINGLE:
        parentInstance.child = null;
      case CHILD_TYPE_BOX:
      case CHILD_TYPE_STACK:
        parentInstance.remove(child);
        break;
      case CHILD_TYPE_NONE:
        throw new Error(`${parentInstance.$type} should not have children.`);
    }
  },

  insertBefore(parentInstance, child, beforeChild) {
    switch (parentInstance.$childType) {
      case CHILD_TYPE_SINGLE:
        parentInstance.child = child;
      case CHILD_TYPE_BOX:
        parentInstance.append(child);
        parentInstance.reorder_child_after(beforeChild, child);
        break;
      case CHILD_TYPE_STACK:
        parentInstance.add_child(child);
        break;
      case CHILD_TYPE_NONE:
        throw new Error(`${parentInstance.$type} should not have children.`);
    }
  },

  detachDeletedInstance(instance) {},
});

export const GtkBox = 'gtk-box';

export const GtkLabel = 'gtk-label';

export const GtkButton = 'gtk-button';

export const GtkEntry = 'gtk-entry';

export const GtkTextView = 'gtk-text-view';

export const GtkWindow = 'gtk-window';

export const GtkStack = 'gtk-stack';

export const GtkStackPage = 'gtk-stack-page';

export function createRoot({ id, flags = Gio.ApplicationFlags.FLAGS_NONE }) {
  const app = new Gtk.Application({
    application_id: id,
    flags,
  });
  const root = reconciler.createContainer(app, false, false);

  return {
    render(element, argv = []) {
      app.loop = new GLib.MainLoop(null, false);

      app.connect('activate', () => {
        reconciler.updateContainer(element, root, null, function () {
          let activeWindow = app.activeWindow;

          if (!activeWindow) {
            activeWindow = windows.find(
              (win) => win.$appId === app.application_id
            );
          }

          activeWindow?.present();
        });
      });

      app.run(argv);

      app.loop.run();
    },
  };
}
