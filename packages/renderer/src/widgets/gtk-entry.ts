import { GtkWidgetImpl, GtkWidgetProps } from './gtk-widget';
import { createReactComponent } from '../utils/create-react-component';

export const GTK_ENTRY_TAG = 'gtk-entry';

export interface GtkEntryProps extends GtkWidgetProps {
  onChanged?: (entry: GtkEntryImpl) => void;
}

export const GtkEntry = createReactComponent<GtkEntryImpl, GtkEntryProps>(
  GTK_ENTRY_TAG
);

export class GtkEntryImpl extends GtkWidgetImpl {
  constructor(props: GtkEntryProps, rootInstance: any) {
    super(props, rootInstance);
  }

  get nativeName() {
    return 'Entry';
  }

  get text(): string | null {
    return this.nativeInstance.buffer.text;
  }

  set text(value: string | null) {
    this.nativeInstance.buffer.text = value;
  }
}
