import * as ReactReconciler from 'react-reconciler';
import { GtkBoxImpl, GTK_BOX_TAG } from '@/widgets/gtk-box';
import { GtkEntryImpl, GTK_ENTRY_TAG } from '@/widgets/gtk-entry';
import { GtkLabelImpl, GTK_LABEL_TAG } from '@/widgets/gtk-label';
import { GtkStackImpl, GTK_STACK_TAG } from '@/widgets/gtk-stack';
import { GtkButtonImpl, GTK_BUTTON_TAG } from '@/widgets/gtk-button';
import { GtkWindowImpl, GTK_WINDOW_TAG } from '@/widgets/gtk-window';
import { GtkWidgetImpl, GtkWidgetProps } from '@/widgets/gtk-widget';
import { GtkStackPageImpl, GTK_STACK_PAGE_TAG } from '@/widgets/gtk-stack-page';

declare const imports: any;

const { Gtk, Gio, GLib } = ((imports.gi.versions.Gtk = '4.0'), imports.gi);

const implementations = {
  [GTK_WINDOW_TAG]: GtkWindowImpl,
  [GTK_LABEL_TAG]: GtkLabelImpl,
  [GTK_BOX_TAG]: GtkBoxImpl,
  [GTK_BUTTON_TAG]: GtkButtonImpl,
  [GTK_ENTRY_TAG]: GtkEntryImpl,
  [GTK_STACK_TAG]: GtkStackImpl,
  [GTK_STACK_PAGE_TAG]: GtkStackPageImpl,
};

const reconciler = ReactReconciler({
  noTimeout: -1,

  supportsMutation: true,

  isPrimaryRenderer: true,

  supportsHydration: false,

  supportsPersistence: false,

  createInstance(
    type: string,
    props: GtkWidgetProps,
    rootInstance: any,
    _hostContext,
    _instanceHandle
  ) {
    const impl = implementations[type];

    if (!impl) {
      throw new Error(`Unknown widget tag: ${type}`);
    }

    return new impl(props, rootInstance);
  },

  createTextInstance(text, rootInstance, _hostContext, _instanceHandle) {
    return new GtkLabelImpl({ label: text, useMarkup: true }, rootInstance);
  },

  commitUpdate(
    instance: GtkWidgetImpl,
    updatePayload: GtkWidgetProps,
    _type,
    _prevProps,
    _nextProps,
    _internalHandle
  ) {
    instance.updateProps(updatePayload);
  },

  commitTextUpdate(
    textInstance: GtkLabelImpl,
    oldText: string,
    newText: string
  ) {
    if (newText !== oldText) {
      textInstance.label = newText;
    }
  },

  getPublicInstance(instance: GtkWidgetImpl) {
    return instance;
  },

  getRootHostContext(_rootInstance) {
    return null;
  },

  getChildHostContext(_parentHostContext, _type) {
    return null;
  },

  shouldSetTextContent() {
    return false;
  },

  resetTextContent(_instance) {},

  prepareUpdate(
    _instance,
    _type,
    oldProps: GtkWidgetProps,
    newProps: GtkWidgetProps,
    _rootInstance
  ) {
    const finalProps = {};
    const mergedProps = { ...oldProps, ...newProps };

    for (let prop in mergedProps) {
      if (!mergedProps.hasOwnProperty(prop)) {
        continue;
      }

      if (prop in oldProps && !(prop in newProps)) {
        finalProps[prop] = null;
      } else if (prop in newProps && !(prop in oldProps)) {
        finalProps[prop] = newProps[prop];
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

  appendInitialChild(parentInstance: any, child: unknown) {
    if (parentInstance instanceof Gtk.Application) {
      return;
    }

    (parentInstance as GtkWidgetImpl).appendChild(child as GtkWidgetImpl);
  },

  appendChildToContainer(parentInstance: any, child: unknown) {
    if (parentInstance instanceof Gtk.Application) {
      return;
    }

    (parentInstance as GtkWidgetImpl).appendChild(child as GtkWidgetImpl);
  },

  finalizeInitialChildren(_instance, _type, _props, _rootInstance) {
    return false;
  },

  removeChild(parentInstance: any, child: GtkWidgetImpl) {
    if (parentInstance instanceof Gtk.Application) {
      return;
    }

    (parentInstance as GtkWidgetImpl).removeChild(child);
  },

  removeChildFromContainer(parentInstance, child: GtkWidgetImpl) {
    if (parentInstance instanceof Gtk.Application) {
      return;
    }

    (parentInstance as GtkWidgetImpl).removeChild(child);
  },

  insertBefore(parentInstance: unknown, child: unknown, beforeChild: unknown) {
    if (parentInstance instanceof Gtk.Application) {
      return;
    }

    (parentInstance as GtkWidgetImpl).insertBefore(
      child as GtkWidgetImpl,
      beforeChild as GtkWidgetImpl
    );
  },

  detachDeletedInstance(instance: unknown) {
    (instance as GtkWidgetImpl).detach();
  },

  preparePortalMount(_containerInfo: unknown) {
    throw new Error('Function not implemented.');
  },

  scheduleTimeout(
    fn: (...args: unknown[]) => unknown,
    delay?: number | undefined
  ) {
    return setTimeout(fn, delay);
  },

  cancelTimeout(id: number) {
    clearTimeout(id);
  },

  getCurrentEventPriority() {
    throw new Error('Function not implemented.');
  },

  getInstanceFromNode(_node: any) {
    throw new Error('Function not implemented.');
  },

  beforeActiveInstanceBlur() {
    throw new Error('Function not implemented.');
  },

  afterActiveInstanceBlur() {
    throw new Error('Function not implemented.');
  },

  prepareScopeUpdate(_scopeInstance: any, _instance: any) {
    throw new Error('Function not implemented.');
  },

  getInstanceFromScope(_scopeInstance: unknown) {
    throw new Error('Function not implemented.');
  },
});

export interface RootProps {
  id: string;
  flags?: number;
}

export interface RootInstance {
  render(element: JSX.Element, argv: string[]): void;
}

export const createRoot = ({
  id,
  flags = Gio.ApplicationFlags.FLAGS_NONE,
}: RootProps): RootInstance => {
  const app = new Gtk.Application({
    application_id: id,
    flags,
  });
  const root = reconciler.createContainer(
    app,
    0,
    null,
    false,
    null,
    '',
    (e) => console.error(e),
    null
  );

  return {
    render(element: JSX.Element, argv: string[] = []) {
      app.loop = new GLib.MainLoop(null, false);

      app.connect('activate', () => {
        reconciler.updateContainer(element, root, null, function () {
          let activeWindow: GtkWindowImpl | null = app.activeWindow;

          if (!app.$windows) {
            app.$windows = [];
          }

          if (!activeWindow && app.$windows.length) {
            activeWindow = app.$windows[0];
          }

          activeWindow?.present();
        });
      });

      app.run(argv);

      app.loop.run();
    },
  };
};
