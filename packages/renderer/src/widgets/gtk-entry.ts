import { createElement, forwardRef } from 'react';
import { GtkWidgetImpl, GtkWidgetProps } from './gtk-widget';

export const GTK_ENTRY_TAG = 'gtk-entry';

export interface GtkEntryProps extends GtkWidgetProps {
  onChanged?: (entry: GtkEntryImpl) => void;
}

export const GtkEntry = forwardRef<GtkEntryImpl, GtkEntryProps>((props, ref) =>
  createElement(GTK_ENTRY_TAG, { ref, ...props })
);

export class GtkEntryImpl extends GtkWidgetImpl {
  constructor(props: GtkEntryProps, rootInstance: any) {
    super(props, rootInstance);
  }

  get nativeName() {
    return 'Entry';
  }

  get text(): string {
    return this.nativeInstance.buffer.text;
  }

  set text(value: string | null) {
    this.nativeInstance.buffer.text = value || '';
  }
}