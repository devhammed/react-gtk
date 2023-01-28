/**
 * @group Contracts
 */
export interface GtkTooltip {
  /**
   * Replaces the widget packed into the tooltip with custom_widget. custom_widget does not get destroyed when the tooltip goes away. By default a box with a {@link GtkImageImpl} and {@link GtkLabelImpl} is embedded in the tooltip, which can be configured using {@link set_markup} and {@link set_icon_from_icon_name}.
   *
   * @example
   * You need to pass the {@link GtkWidgetImpl.nativeInstance} property of a widget ref to this method.
   *
   * ```ts
   * const widgetRef = useRef<GtkLabelImpl>();
   *
   * tooltip.set_custom(widgetRef.current.nativeInstance);
   * ```
   */
  set_custom(widgetNativeInstance: any): void;

  /**
   * Sets the icon of the tooltip (which is in front of the text) to be the icon indicated by icon_name with the size indicated by size. If icon_name is NULL, the image will be hidden.
   */
  set_icon_from_icon_name(name: string): void;

  /**
   * Sets the text of the tooltip to be markup.
   */
  set_markup(markup: string): void;

  /**
   * Sets the text of the tooltip to be text.
   */
  set_text(text: string): void;

  /**
   * Sets the {@link Gdk!Rectangle} area of the widget, where the contents of this tooltip apply, to be rect (in widget coordinates). This is especially useful for properly setting tooltips on GtkTreeView rows and cells, GtkIconViews, etc.
   */
  set_tip_area(rect: any): void;
}
