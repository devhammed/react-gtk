import { GtkAlign } from '@/enums/gtk-align';
import { isSignal } from '@/utils/is-signal';
import { GtkOverflow } from '@/enums/gtk-overflow';
import { toKebabCase } from '@/utils/to-kebab-case';
import { GtkTooltip } from '@/contracts/gtk-tooltip';
import { GtkStateFlags } from '@/enums/gtk-state-flags';
import { GtkDirectionType } from '@/enums/gtk-direction-type';
import { GtkTextDirection } from '@/enums/gtk-text-direction';
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

  /**
   * The notify signal is emitted on an object when one of its properties has its value set through g_object_set_property(), g_object_set(), et al.
   */
  onNotify?: (self: GtkWidgetImpl, paramSpec: any) => void;

  /**
   * Signals that all holders of a reference to the widget should release the reference that they hold.
   */
  onDestroy?: (self: GtkWidgetImpl) => void;

  /**
   * Emitted when widget is hidden.
   */
  onHide?: (self: GtkWidgetImpl) => void;

  /**
   * Emitted when widget is shown.
   */
  onShow?: (self: GtkWidgetImpl) => void;

  /**
   * Emitted when widget is going to be mapped.
   *
   * A widget is mapped when the widget is visible (which is controlled with GtkWidget:visible) and all its parents up to the toplevel widget are also visible.
   *
   * The ::map signal can be used to determine whether a widget will be drawn, for instance it can resume an animation that was stopped during the emission of GtkWidget::unmap.
   */
  onMap?: (self: GtkWidgetImpl) => void;

  /**
   * Emitted when widget is going to be unmapped.
   *
   * A widget is unmapped when either it or any of its parents up to the toplevel widget have been set as hidden.
   *
   * As ::unmap indicates that a widget will not be shown any longer, it can be used to, for example, stop an animation on the widget.
   */
  onUnmap?: (self: GtkWidgetImpl) => void;

  /**
   * Emitted when widget is associated with a GdkSurface.
   *
   * This means that gtk_widget_realize() has been called or the widget has been mapped (that is, it is going to be drawn).
   */
  onRealize?: (self: GtkWidgetImpl) => void;

  /**
   * Emitted when the GdkSurface associated with widget is destroyed.
   *
   * This means that gtk_widget_unrealize() has been called or the widget has been unmapped (that is, it is going to be hidden).
   */
  onUnrealize?: (self: GtkWidgetImpl) => void;

  /**
   * Emitted when the text direction of a widget changes.
   */
  onDirectionChanged?: (
    self: GtkWidgetImpl,
    previousDirection: GtkTextDirection
  ) => void;

  /**
   * Emitted if keyboard navigation fails.
   *
   * Return TRUE if stopping keyboard navigation is fine, FALSE if the emitting widget should try to handle the keyboard navigation attempt in its parent widget(s).
   */
  onKeynavFailed?: (
    self: GtkWidgetImpl,
    direction: GtkDirectionType
  ) => boolean;

  /**
   * Emitted when the focus is moved.
   */
  onMoveFocus?: (self: GtkWidgetImpl, direction: GtkDirectionType) => void;

  /**
   * Emitted when a widget is activated via a mnemonic.
   *
   * The default handler for this signal activates widget if groupCycling is FALSE, or just makes widget grab focus if groupCycling is TRUE.
   *
   * Return TRUE to stop other handlers from being invoked for the event. FALSE to propagate the event further.
   */
  onMnemonicActivate?: (self: GtkWidgetImpl, groupCycling: boolean) => boolean;

  /**
   * Emitted when the widgets tooltip is about to be shown.
   *
   * This happens when the GtkWidget:has-tooltip property is TRUE and the hover timeout has expired with the cursor hovering “above” widget; or emitted when widget got focus in keyboard mode.
   *
   * Using the given coordinates, the signal handler should determine whether a tooltip should be shown for widget. If this is the case TRUE should be returned, FALSE otherwise. Note that if keyboard_mode is TRUE, the values of x and y are undefined and should not be used.
   *
   * The signal handler is free to manipulate tooltip with the therefore destined function calls.
   *
   * Return TRUE if tooltip should be shown right now, FALSE otherwise.
   */
  onQueryTooltip?: (
    self: GtkWidgetImpl,
    x: number,
    y: number,
    isKeyboardMode: boolean,
    tooltip: GtkTooltip
  ) => boolean;

  /**
   * Emitted when the widget state changes.
   */
  onStateFlagsChanged?: (self: GtkWidgetImpl, flags: GtkStateFlags) => void;
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
      handler: (self: any, ...args: any[]) => any | null;
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
          (self: any, ...args: any[]) => {
            if (self?.$impl instanceof GtkWidgetImpl) {
              self = self.$impl;
            }

            return handler(self, ...args);
          }
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
