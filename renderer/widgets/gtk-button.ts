import { ReactElement } from 'react';
import { GtkWidgetImpl, GtkWidgetProps } from '@/widgets/gtk-widget';
import { createReactComponent } from '@/utils/create-react-component';

export const GTK_BUTTON_TAG = 'gtk-button';

/**
 * @group Props
 */
export interface GtkButtonProps extends GtkWidgetProps {
  /**
   * Text of the label inside the button, if the button contains a label widget.
   */
  label?: string;

  /**
   * The name of the icon used to automatically populate the button.
   */
  iconName?: string;

  /**
   * Whether the button has a frame.
   */
  hasFrame?: boolean;

  /**
   * If set, an underline in the text indicates that the following character is to be used as mnemonic.
   */
  useUnderline?: boolean;

  /**
   * The name of action to trigger when clicked.
   */
  actionName?: string;

  /**
   * The targeted action of this button.
   */
  actionTarget?: any;

  /**
   * The child widget.
   */
  children?: ReactElement | string;

  /**
   * Emitted to animate press then release.
   */
  onActivate?: (self: GtkButtonImpl) => void;

  /**
   * Emitted when the button has been activated (pressed and released).
   */
  onClicked?: (self: GtkButtonImpl) => void;
}

/**
 * @group Components
 */
export const GtkButton = createReactComponent<GtkButtonImpl, GtkButtonProps>(
  GTK_BUTTON_TAG
);

/**
 * @group Native Implementations
 */
export class GtkButtonImpl extends GtkWidgetImpl {
  constructor(props: GtkButtonProps, rootInstance: any) {
    super(props, rootInstance);
  }

  get nativeName() {
    return 'Button';
  }

  /**
   * @internal
   */
  appendChild(child: GtkWidgetImpl): void {
    this.nativeInstance.child = child.nativeInstance;
  }

  /**
   * @internal
   */
  removeChild(_child: GtkWidgetImpl): void {
    this.nativeInstance.child = null;
  }
}
