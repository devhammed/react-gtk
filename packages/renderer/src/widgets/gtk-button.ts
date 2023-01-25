import { createElement, forwardRef } from 'react';
import { GtkWidgetImpl, GtkWidgetProps } from './gtk-widget';

export const GTK_BUTTON_TAG = 'gtk-button';

export interface GtkButtonProps extends GtkWidgetProps {
  label?: string;
  onClicked?: (btn: GtkButtonImpl) => void;
}

export const GtkButton = forwardRef<GtkButtonImpl, GtkButtonProps>(
  (props, ref) => createElement(GTK_BUTTON_TAG, { ref, ...props })
);

export class GtkButtonImpl extends GtkWidgetImpl {
  constructor(props: GtkButtonProps, rootInstance: any) {
    super(props, rootInstance);
  }

  get nativeName() {
    return 'Button';
  }

  appendChild(child: GtkWidgetImpl): void {
    this.nativeInstance.child = child.nativeInstance;
  }
}
