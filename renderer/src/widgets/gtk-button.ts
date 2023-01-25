import { ReactElement } from 'react';
import { GtkWidgetImpl, GtkWidgetProps } from './gtk-widget';
import { createReactComponent } from '../utils/create-react-component';

export const GTK_BUTTON_TAG = 'gtk-button';

/**
 * @group Props
 */
export interface GtkButtonProps extends GtkWidgetProps {
  label?: string;
  children?: ReactElement | string;
  onClicked?: (btn: GtkButtonImpl) => void;
}

/**
 * @group Components
 */
export const GtkButton = createReactComponent<GtkButtonImpl, GtkButtonProps>(
  GTK_BUTTON_TAG
);

/**
 * @group Native Widgets
 */
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

  removeChild(_child: GtkWidgetImpl): void {
    this.nativeInstance.child = null;
  }
}
