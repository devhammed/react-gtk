import { createElement, forwardRef } from 'react';
import { GtkWidgetImpl, GtkWidgetProps } from './gtk-widget';

export const GTK_STACK_TAG = 'gtk-stack';

export interface GtkStackProps extends GtkWidgetProps {}

export const GtkStack = forwardRef<GtkStackImpl, GtkStackProps>((props, ref) =>
  createElement(GTK_STACK_TAG, { ref, ...props })
);

export class GtkStackImpl extends GtkWidgetImpl {
  constructor(props: GtkStackProps, rootInstance: any) {
    super(props, rootInstance);
  }

  get nativeName(): string {
    return 'Stack';
  }

  appendChild(child: GtkWidgetImpl): void {
    this.nativeInstance.add_child(child.nativeInstance);
  }

  removeChild(child: GtkWidgetImpl): void {
    this.nativeInstance.remove(child.nativeInstance);
  }
}
