export interface GtkTooltip {
  /**
   * Replaces the widget packed into the tooltip with custom_widget. custom_widget does not get destroyed when the tooltip goes away. By default a box with a GtkImage and GtkLabel is embedded in the tooltip, which can be configured using gtk_tooltip_set_markup() and gtk_tooltip_set_icon().
   */
  set_custom(widgetNativeInstance: any): void;

  /**
   * Sets the icon of the tooltip (which is in front of the text) to be paintable. If paintable is NULL, the image will be hidden.
   */
  set_icon(gPaintableNativeInstance: any): void;

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
   * Sets the GdkRectangle area of the widget, where the contents of this tooltip apply, to be rect (in widget coordinates). This is especially useful for properly setting tooltips on GtkTreeView rows and cells, GtkIconViews, etc.
   */
  set_tip_area(rect: any): void;
}
