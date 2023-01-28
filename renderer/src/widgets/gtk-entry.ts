import { GtkInputHints } from '@/enums/gtk-input-hints';
import { PangoAttrItem } from '@/contracts/pango-attr-item';
import { GtkInputPurpose } from '@/enums/gtk-input-purpose';
import { GtkEntryBuffer } from '@/contracts/gtk-entry-buffer';
import { GtkWidgetImpl, GtkWidgetProps } from '@/widgets/gtk-widget';
import { createReactComponent } from '@/utils/create-react-component';
import { GtkEntryIconPosition } from '@/enums/gtk-entry-icon-position';

declare const imports: any;

const { Pango, Gtk } = ((imports.gi.versions.Gtk = '4.0'), imports.gi);

export const GTK_ENTRY_TAG = 'gtk-entry';

/**
 * @group Props
 */
export interface GtkEntryProps extends GtkWidgetProps {
  /**
   * Whether to activate the default widget when Enter is pressed.
   */
  activatesDefault?: boolean;

  /**
   * A list of Pango attributes to apply to the text of the entry.
   */
  attributes?: PangoAttrItem[];

  /**
   * Whether to suggest Emoji replacements for :-delimited names like :heart:.
   */
  enableEmojiCompletion?: boolean;

  /**
   * Whether the entry should draw a frame.
   */
  hasFrame?: boolean;

  /**
   * Which IM (input method) module should be used for this entry.
   */
  imModule?: string;

  /**
   * Additional hints that allow input methods to fine-tune their behavior.
   */
  inputHints?: GtkInputHints;

  /**
   * The purpose of this text field.
   */
  inputPurpose?: GtkInputPurpose;

  /**
   * The character to use when masking entry contents (“password mode”).
   */
  invisibleChar?: number;

  /**
   * Whether the invisible char has been set for the GtkEntry.
   */
  invisibleCharSet?: boolean;

  /**
   * Maximum number of characters for this entry.
   */
  maxLength?: number;

  /**
   * If text is overwritten when typing in the GtkEntry.
   */
  overwriteMode?: boolean;

  /**
   * The text that will be displayed in the GtkEntry when it is empty and unfocused.
   */
  placeholderText?: string;

  /**
   * Emitted when the entry is activated.
   */
  onActivate?: (self: GtkEntryImpl) => void;

  /**
   * Emitted when an activatable icon is clicked.
   */
  onIconPress?: (self: GtkEntryImpl, position: GtkEntryIconPosition) => void;

  /**
   * Emitted on the button release from a mouse click over an activatable icon.
   */
  onIconRelease?: (self: GtkEntryImpl, position: GtkEntryIconPosition) => void;

  /**
   * Emitted at the end of a single user-visible operation on the contents.
   */
  onChanged?: (self: GtkEntryImpl) => void;

  /**
   * This signal is a sign for the cell renderer to update its value from the cell_editable.
   */
  onEditingDone?: (self: GtkEntryImpl) => void;

  /**
   * This signal is meant to indicate that the cell is finished editing, and the cell_editable widget is being removed and may subsequently be destroyed.
   */
  onRemoveWidget?: (self: GtkEntryImpl) => void;

  /**
   * Emitted when text is inserted into the widget by the user.
   */
  onInsertText?: (
    self: GtkEntryImpl,
    text: string,
    length: number,
    position: number
  ) => void;

  /**
   * Emitted when text is deleted from the widget by the user.
   */
  onDeleteText?: (self: GtkEntryImpl, start: number, end: number) => void;
}

/**
 * @group Components
 */
export const GtkEntry = createReactComponent<GtkEntryImpl, GtkEntryProps>(
  GTK_ENTRY_TAG
);

/**
 * @group Native Implementations
 */
export class GtkEntryImpl extends GtkWidgetImpl {
  constructor(props: GtkEntryProps, rootInstance: any) {
    super(props, rootInstance);

    if (!this.nativeInstance.buffer) {
      this.nativeInstance.buffer = new Gtk.EntryBuffer();
    }
  }

  get nativeName() {
    return 'Entry';
  }

  get buffer(): GtkEntryBuffer {
    return this.nativeInstance.buffer;
  }

  get text(): string | null {
    return this.buffer.text;
  }

  set text(value: string | null) {
    this.buffer.text = value;
  }

  /**
   * @internal
   */
  updateProps(props: GtkEntryProps): void {
    if (props.attributes !== null && props.attributes instanceof Array) {
      const serializedAttrs = props.attributes
        .map(({ start, end, type, value }) => {
          return `${start} ${end} ${type} ${value}`;
        })
        .join(',');

      this.nativeInstance.attributes =
        Pango.AttrList.from_string(serializedAttrs);

      delete props.attributes;
    }

    super.updateProps(props);
  }
}
