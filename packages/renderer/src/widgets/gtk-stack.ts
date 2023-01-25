import { createElement, forwardRef } from 'react';
import { GtkWidgetImpl, GtkWidgetProps } from './gtk-widget';
import { GtkStackTransitionType } from '../enums/gtk-stack-transition-type';

export const GTK_STACK_TAG = 'gtk-stack';

export interface GtkStackProps extends GtkWidgetProps {
  transitionType: GtkStackTransitionType;
}

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

  setVisibleChild(child: GtkWidgetImpl) {
    this.nativeInstance.set_visible_child(child.nativeInstance);
  }
}
