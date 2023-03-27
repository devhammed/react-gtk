/**
 * @group Contracts
 */
export interface GtkEntryBuffer {
  /**
   * The contents of the buffer.
   */
  get text(): string;
  set text(value: string);

  /**
   * The length in characters of the buffer.
   */
  get length(): number;

  /**
   * The maximum allowed length of the text in buffer.
   */
  get maxLength(): number;
  set maxLength(value: number);

  /**
   * Inserts [length] characters of [chars] into the contents of the buffer, at [position]'s position.
   */
  insert_text(position: number, chars: string, length: number): void;

  /**
   * Deletes a sequence of characters from the buffer.
   */
  delete_text(position: number, length: number): void;

  /**
   * Retrieves the length in bytes of the buffer.
   */
  get_bytes(): number;
}
