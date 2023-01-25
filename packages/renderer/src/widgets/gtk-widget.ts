import { createElement, forwardRef } from 'react';
import { GtkAlign } from '../enums/gtk-align';
import { isSignal } from '../utils/is-signal';
import { toKebabCase } from '../utils/to-kebab-case';

declare const imports: any;

const { Gtk } = ((imports.gi.versions.Gtk = '4.0'), imports.gi);

export const GTK_WIDGET_TAG = 'gtk-widget';

export interface GtkWidgetProps {
  visible?: boolean;
  halign?: GtkAlign;
  valign?: GtkAlign;
  name?: string;
}

export const GtkWidget = forwardRef<GtkWidgetImpl, GtkWidgetProps>(
  (props, ref) => createElement(GTK_WIDGET_TAG, { ref, ...props })
);

export abstract class GtkWidgetImpl {
  public nativeInstance: any;

  constructor(props: GtkWidgetProps, rootInstance: any) {
    this.nativeInstance = new Gtk[this.nativeName]();
    this.nativeInstance.$root = rootInstance;
    this.updateProps(props);
  }

  get nativeName(): string {
    return 'Widget';
  }

  getProp<T>(key: string): T {
    return this.nativeInstance[key] as T;
  }

  setProp<T>(key: string, value: T): void {
    this.nativeInstance[key] = value;
  }

  appendChild(_child: GtkWidgetImpl) {
    throw new Error(`Cannot add children to a ${this.nativeName}.`);
  }

  insertBefore(_child: GtkWidgetImpl, _beforeChild: GtkWidgetImpl) {
    throw new Error(
      `Cannot insert child before another to a ${this.nativeName}.`
    );
  }

  removeChild(_child: GtkWidgetImpl) {
    throw new Error(`Cannot remove children from a ${this.nativeName}.`);
  }

  detach() {
    try {
      if (typeof this.nativeInstance.unparent === 'function') {
        this.nativeInstance.unparent();
      }

      if (typeof this.nativeInstance.unrealize === 'function') {
        this.nativeInstance.unrealize();
      }
    } catch (_) {}
  }

  updateProps(props: GtkWidgetProps) {
    // The array of signals to attach...
    const signals: { name: string; handler: () => void | null }[] = [];

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
        this.setProp(prop, value);
      }
    }

    // Attach $signals object if needed...
    if (!this.nativeInstance.$signals) {
      this.nativeInstance.$signals = {};
    }

    // Then disconnect and connect event handlers...
    signals.forEach(({ name, handler }) => {
      if (typeof this.nativeInstance.$signals[name] !== 'undefined') {
        this.nativeInstance.disconnect(this.nativeInstance.$signals[name]);
        delete this.nativeInstance.$signals[name];
      }

      if (typeof handler === 'function') {
        this.nativeInstance.$signals[name] = this.nativeInstance.connect(
          name,
          handler
        );
      }
    });
  }
}
