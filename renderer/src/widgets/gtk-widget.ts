import { GtkAlign } from '@/enums/gtk-align';
import { isSignal } from '@/utils/is-signal';
import { toKebabCase } from '@/utils/to-kebab-case';
import { createReactComponent } from '@/utils/create-react-component';
import { GtkAccessibleRole } from '@/enums/gtk-accessible-role';

declare const imports: any;

const { Gtk } = ((imports.gi.versions.Gtk = '4.0'), imports.gi);

export const GTK_WIDGET_TAG = 'gtk-widget';

/**
 * @group Props
 */
export interface GtkWidgetProps {
  /**
   * The accessible role of the given GtkAccessible implementation.
   * The accessible role cannot be changed once set.
   */
  accessibleRole?: GtkAccessibleRole;

  /**
   * Whether the widget is visible.
   */
  visible?: boolean;

  /**
   * How to distribute horizontal space if widget gets extra space.
   */
  halign?: GtkAlign;

  /**
   * How to distribute vertical space if widget gets extra space.
   */
  valign?: GtkAlign;

  /**
   * The name of the widget.
   */
  name?: string;

  /**
   * Margin on start of widget, horizontally.
   */
  marginStart?: number;

  /**
   * Margin on end of widget, horizontally.
   */
  marginEnd?: number;

  /**
   * Margin on top side of widget.
   */
  marginTop?: number;

  /**
   * Margin on bottom side of widget.
   */
  marginBottom?: number;
}

/**
 * @group Components
 */
export const GtkWidget = createReactComponent<GtkWidgetImpl, GtkWidgetProps>(
  GTK_WIDGET_TAG
);

/**
 * @group Native Widgets
 */
export abstract class GtkWidgetImpl {
  /**
   * The instance of the GTK widget this implementation is using.
   *
   * @see {@link nativeName}
   */
  public nativeInstance: any;

  constructor(props: GtkWidgetProps, rootInstance: any) {
    this.nativeInstance = new Gtk[this.nativeName]();
    this.nativeInstance.$root = rootInstance;
    this.nativeInstance.$impl = this;
    this.updateProps(props);
  }

  /**
   * The internal name of the GTK widget.
   */
  get nativeName(): string {
    return 'Widget';
  }

  /**
   * Whether the widget is visible.
   */
  get visible(): boolean {
    return this.nativeInstance.visible;
  }

  set visible(value: boolean) {
    this.nativeInstance.visible = value;
  }

  /**
   * The name of the widget.
   */
  get name(): string | null {
    return this.nativeInstance.name;
  }

  set name(value: string | null) {
    this.nativeInstance.name = value;
  }

  /**
   * Updates the props of this widget.
   */
  updateProps(props: GtkWidgetProps): void {
    // The array of signals to attach...
    const signals: {
      name: string;
      handler: (self: any, ...args: any[]) => void | null;
    }[] = [];

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
        this.nativeInstance[prop] = value;
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
          (self: any, ...args: any[]) => handler(self?.$impl ?? self, ...args)
        );
      }
    });
  }

  /**
   * Append a child to this widget.
   */
  appendChild(_child: GtkWidgetImpl): void {
    throw new Error(`Cannot add children to a ${this.nativeName}.`);
  }

  /**
   * Insert [child] before [beforeChild] in this widget.
   */
  insertBefore(_child: GtkWidgetImpl, _beforeChild: GtkWidgetImpl): void {
    throw new Error(
      `Cannot insert child before another to a ${this.nativeName}.`
    );
  }

  /**
   * Remove a child from this widget.
   */
  removeChild(_child: GtkWidgetImpl): void {
    throw new Error(`Cannot remove children from a ${this.nativeName}.`);
  }

  /**
   * Destroy the instance of this widget.
   */
  detach(): void {
    try {
      if (typeof this.nativeInstance.unparent === 'function') {
        this.nativeInstance.unparent();
      }

      if (typeof this.nativeInstance.unrealize === 'function') {
        this.nativeInstance.unrealize();
      }
    } catch (_) {}
  }
}
