import { createElement, forwardRef } from 'react';
import { GtkWidgetImpl, GtkWidgetProps } from './gtk-widget';

export const GTK_LABEL_TAG = 'gtk-label';

export interface GtkLabelProps extends GtkWidgetProps {
  label: string;
  useMarkup?: boolean;
}

export const GtkLabel = forwardRef<GtkLabelImpl, GtkLabelProps>((props, ref) =>
  createElement(GTK_LABEL_TAG, { ref, ...props })
);

export class GtkLabelImpl extends GtkWidgetImpl {
  constructor(props: GtkLabelProps, rootInstance: any) {
    super(props, rootInstance);
  }

  get nativeName() {
    return 'Label';
  }

  get label(): string {
    return this.nativeInstance.label;
  }

  set label(value: string) {
    this.nativeInstance.label = value;
  }
}
