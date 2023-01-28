/**
 * @group Contracts
 */
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
   * - enum values as nick or numeric value
   * - boolean values as true or false
   * - integers and floats as numbers
   * - strings as string, optionally quoted
   * - font features as quoted string
   * - {@link !PangoLanguage} as string
   * - {@link !PangoFontDescription} as serialized by {@link !pango_font_description_to_string}, quoted
   * - {@link !PangoColor} as serialized by {@link !pango_color_to_string}
   */
  value: string;
}
