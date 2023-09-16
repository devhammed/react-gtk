import { ReactNode } from 'react';
import { GtkOrientation } from '@/enums/gtk-orientation';
import { GtkWidgetImpl, GtkWidgetProps } from '@/widgets/gtk-widget';
import { createReactComponent } from '@/utils/create-react-component';

export const GTK_BOX_TAG = 'gtk-box';

/**
 * @group Props
 */
export interface GtkBoxProps extends GtkWidgetProps {
  /**
   * The box’s orientation.
   */
  orientation?: GtkOrientation;

  /**
   * Whether the children should all be the same size.
   */
  homogeneous?: boolean;

  /**
   * The amount of space between children.
   */
  spacing?: number;

  /**
   * The children of the box.
   */
  children?: ReactNode;
}

/**
 * @group Components
 */
export const GtkBox = createReactComponent<GtkBoxImpl, GtkBoxProps>(
  GTK_BOX_TAG
);

/**
 * @group Native Implementations
 */
export class GtkBoxImpl extends GtkWidgetImpl {
  constructor(props: GtkBoxProps, rootInstance: any) {
    super(props, rootInstance);
  }

  get nativeName(): string {
    return 'Box';
  }

  /**
   * @internal
   */
  appendChild(child: GtkWidgetImpl): void {
    this.nativeInstance.append(child.nativeInstance);
  }

  /**
   * @internal
   */
  removeChild(child: GtkWidgetImpl): void {
    this.nativeInstance.remove(child.nativeInstance);
  }

  /**
   * @internal
   */
  insertBefore(child: GtkWidgetImpl, beforeChild: GtkWidgetImpl): void {
    const childNativeInstance = child.nativeInstance;
    const beforeChildNativeInstance = beforeChild.nativeInstance;

    this.nativeInstance.insert_child_after(
      childNativeInstance,
      beforeChildNativeInstance,
    );

    this.nativeInstance.reorder_child_after(
      beforeChildNativeInstance,
      childNativeInstance,
    );
  }
}
