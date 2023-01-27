export interface PangoAttrItem {
  /**
   *  START is the start index (with -1 being accepted in place of MAXUINT).
   */
  start: number;

  /**
   * END is the end index (with -1 being accepted in place of MAXUINT).
   */
  end: number;

  /**
   * TYPE is the nickname of the attribute value.
   */
  type: string;

  /**
   * enum values as nick or numeric value
   * boolean values as true or false
   * integers and floats as numbers
   * strings as string, optionally quoted
   * font features as quoted string
   * PangoLanguage as string
   * PangoFontDescription as serialized by pango_font_description_to_string(), quoted
   * PangoColor as serialized by pango_color_to_string()
   */
  value: string;
}
