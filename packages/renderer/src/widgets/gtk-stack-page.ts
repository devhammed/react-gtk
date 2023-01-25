import { createElement, forwardRef } from 'react';
import { GtkBoxImpl, GtkBoxProps } from './gtk-box';

export const GTK_STACK_PAGE_TAG = 'gtk-stack-page';

export interface GtkStackPageProps extends GtkBoxProps {}

export const GtkStackPage = forwardRef<GtkStackPageImpl, GtkStackPageProps>(
  (props, ref) => createElement(GTK_STACK_PAGE_TAG, { ref, ...props })
);

export class GtkStackPageImpl extends GtkBoxImpl {
  constructor(props: GtkStackPageProps, rootInstance: any) {
    super(props, rootInstance);
  }
}
