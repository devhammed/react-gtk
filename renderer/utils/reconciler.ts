import * as ReactReconciler from 'react-reconciler';
import { RootAppConfig } from '../contracts/root-app-config';
import { RootAppInstance } from '../contracts/root-app-instance';
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
  ): GtkWidgetImpl {
    const impl = implementations[type];

    if (!impl) {
      throw new Error(`Unknown widget tag: ${type}`);
    }

    return new impl(props, rootInstance);
  },

  createTextInstance(
    text,
    rootInstance,
    _hostContext,
    _instanceHandle
  ): GtkLabelImpl {
    return new GtkLabelImpl({ label: text, useMarkup: true }, rootInstance);
  },

  commitUpdate(
    instance: GtkWidgetImpl,
    updatePayload: GtkWidgetProps,
    _type,
    _prevProps,
    _nextProps,
    _internalHandle
  ): void {
    instance.updateProps(updatePayload);
  },

  commitTextUpdate(
    textInstance: GtkLabelImpl,
    oldText: string,
    newText: string
  ): void {
    if (newText !== oldText) {
      textInstance.label = newText;
    }
  },

  getPublicInstance(instance: GtkWidgetImpl): GtkWidgetImpl {
    return instance;
  },

  getRootHostContext(_rootInstance): null {
    return null;
  },

  getChildHostContext(_parentHostContext, _type): null {
    return null;
  },

  shouldSetTextContent(): boolean {
    return false;
  },

  resetTextContent(_instance): null {
    return null;
  },

  prepareUpdate(
    _instance,
    _type,
    oldProps: GtkWidgetProps,
    newProps: GtkWidgetProps,
    _rootInstance
  ): GtkWidgetProps | null {
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

  prepareForCommit(): null {
    return null;
  },

  clearContainer(): null {
    return null;
  },

  resetAfterCommit(): null {
    return null;
  },

  appendInitialChild(parentInstance: any, child: unknown): void {
    if (parentInstance instanceof Gtk.Application) {
      return;
    }

    (parentInstance as GtkWidgetImpl).appendChild(child as GtkWidgetImpl);
  },

  appendChildToContainer(parentInstance: any, child: unknown): void {
    if (parentInstance instanceof Gtk.Application) {
      return;
    }

    (parentInstance as GtkWidgetImpl).appendChild(child as GtkWidgetImpl);
  },

  finalizeInitialChildren(_instance, _type, _props, _rootInstance): boolean {
    return false;
  },

  removeChild(parentInstance: any, child: GtkWidgetImpl): void {
    if (parentInstance instanceof Gtk.Application) {
      return;
    }

    (parentInstance as GtkWidgetImpl).removeChild(child);
  },

  removeChildFromContainer(parentInstance, child: GtkWidgetImpl): void {
    if (parentInstance instanceof Gtk.Application) {
      return;
    }

    (parentInstance as GtkWidgetImpl).removeChild(child);
  },

  insertBefore(
    parentInstance: unknown,
    child: unknown,
    beforeChild: unknown
  ): void {
    if (parentInstance instanceof Gtk.Application) {
      return;
    }

    (parentInstance as GtkWidgetImpl).insertBefore(
      child as GtkWidgetImpl,
      beforeChild as GtkWidgetImpl
    );
  },

  detachDeletedInstance(instance: unknown): void {
    (instance as GtkWidgetImpl).detach();
  },

  preparePortalMount(_containerInfo: unknown): void {
    throw new Error('Function not implemented.');
  },

  scheduleTimeout(
    fn: (...args: unknown[]) => unknown,
    delay?: number | undefined
  ): number {
    return setTimeout(fn, delay);
  },

  cancelTimeout(id: number): void {
    clearTimeout(id);
  },

  getCurrentEventPriority(): number {
    throw new Error('Function not implemented.');
  },

  getInstanceFromNode(_node: any): ReactReconciler.Fiber {
    throw new Error('Function not implemented.');
  },

  beforeActiveInstanceBlur(): void {
    throw new Error('Function not implemented.');
  },

  afterActiveInstanceBlur(): void {
    throw new Error('Function not implemented.');
  },

  prepareScopeUpdate(_scopeInstance: any, _instance: any): void {
    throw new Error('Function not implemented.');
  },

  getInstanceFromScope(_scopeInstance: unknown): GtkWidgetImpl {
    throw new Error('Function not implemented.');
  },
});

export const createRoot = ({
  id,
  flags = Gio.ApplicationFlags.FLAGS_NONE,
}: RootAppConfig): RootAppInstance => {
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
