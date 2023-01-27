import { GtkAlign } from '@/enums/gtk-align';
import { isSignal } from '@/utils/is-signal';
import { GtkOverflow } from '@/enums/gtk-overflow';
import { toKebabCase } from '@/utils/to-kebab-case';
import { GtkAccessibleRole } from '@/enums/gtk-accessible-role';
import { createReactComponent } from '@/utils/create-react-component';

declare const imports: any;

const { Gtk, Gdk } = ((imports.gi.versions.Gtk = '4.0'), imports.gi);

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

  /**
   * Whether the widget or any of its descendants can accept the input focus.
   */
  canFocus?: boolean;

  /**
   * Whether the widget can receive pointer events.
   */
  canTarget?: boolean;

  /**
   * Whether the widget should grab focus when it is clicked with the mouse.
   */
  focusOnClick?: boolean;

  /**
   * Whether this widget itself will accept the input focus.
   */
  focusable?: boolean;

  /**
   * Whether the widget is the default widget.
   */
  hasDefault?: boolean;

  /**
   * Whether the widget has the input focus.
   */
  hasFocus?: boolean;

  /**
   * Enables or disables the emission of the onQueryTooltip event on widget.
   */
  hasTooltip?: boolean;

  /**
   * Override for height request of the widget.
   */
  heightRequest?: number;

  /**
   * Whether to expand horizontally.
   */
  hexpand?: boolean;

  /**
   * Whether to use the hexpand property.
   */
  hexpandSet?: boolean;

  /**
   * The GtkLayoutManager instance to use to compute the preferred size of the widget, and allocate its children.
   */
  layoutManager?: any;

  /**
   * The requested opacity of the widget.
   */
  opacity?: number;

  /**
   * How content outside the widget’s content area is treated.
   */
  overflow?: GtkOverflow;

  /**
   * Whether the widget will receive the default action when it is focused.
   */
  receivesDefault?: boolean;

  /**
   * Whether the widget responds to input.
   */
  sensitive?: boolean;

  /**
   * Sets the text of tooltip to be the given string, which is marked up with Pango markup.
   */
  tooltipMarkup?: string;

  /**
   * Sets the text of tooltip to be the given string.
   */
  tooltipText?: string;

  /**
   * Whether to expand vertically.
   */
  vexpand?: boolean;

  /**
   * Whether to use the vexpand property.
   */
  vexpandSet?: boolean;

  /**
   * Override for width request of the widget.
   */
  widthRequest?: number;

  /**
   * A list of css classes applied to this widget.
   */
  cssClasses?: string[];

  /**
   * The cursor used by widget.
   */
  cursor?:
    | 'none'
    | 'default'
    | 'help'
    | 'pointer'
    | 'context-menu'
    | 'progress'
    | 'wait'
    | 'cell'
    | 'crosshair'
    | 'text'
    | 'vertical-text'
    | 'alias'
    | 'copy'
    | 'no-drop'
    | 'move'
    | 'not-allowed'
    | 'grab'
    | 'grabbing'
    | 'all-scroll'
    | 'col-resize'
    | 'row-resize'
    | 'n-resize'
    | 'e-resize'
    | 's-resize'
    | 'w-resize'
    | 'ne-resize'
    | 'nw-resize'
    | 'sw-resize'
    | 'se-resize'
    | 'ew-resize'
    | 'ns-resize'
    | 'nesw-resize'
    | 'nwse-resize'
    | 'zoom-in'
    | 'zoom-out';
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
   * The parent of this widget.
   */
  get parent(): GtkWidgetImpl | Object | null {
    return this.nativeInstance.$impl ?? this.nativeInstance;
  }

  /**
   * The GtkRoot widget of the widget tree containing this widget.
   */
  get root(): Object | null {
    return this.nativeInstance.root;
  }

  /**
   * The scale factor of the widget.
   */
  get scaleFactor(): number {
    return this.nativeInstance.scaleFactor;
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
        this.nativeInstance[prop] = (() => {
          if (prop === 'cursor' && typeof value === 'string') {
            return Gdk.Cursor.new_from_name(value, null);
          }

          return value;
        })();
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
