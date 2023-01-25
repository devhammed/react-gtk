import { GtkOrientation } from '../enums/gtk-orientation';
import { GtkWidgetImpl, GtkWidgetProps } from './gtk-widget';
import { createReactComponent } from '../utils/create-react-component';

export const GTK_BOX_TAG = 'gtk-box';

export interface GtkBoxProps extends GtkWidgetProps {
  orientation?: GtkOrientation;
  spacing?: number;
}

export const GtkBox = createReactComponent<GtkBoxImpl, GtkBoxProps>(
  GTK_BOX_TAG
);

export class GtkBoxImpl extends GtkWidgetImpl {
  constructor(props: GtkBoxProps, rootInstance: any) {
    super(props, rootInstance);
  }

  get nativeName(): string {
    return 'Box';
  }

  appendChild(child: GtkWidgetImpl): void {
    this.nativeInstance.append(child.nativeInstance);
  }

  removeChild(child: GtkWidgetImpl): void {
    this.nativeInstance.remove(child.nativeInstance);
  }

  insertBefore(child: GtkWidgetImpl, beforeChild: GtkWidgetImpl): void {
    const childNativeInstance = child.nativeInstance;
    const beforeChildNativeInstance = beforeChild.nativeInstance;

    this.nativeInstance.insert_child_after(
      childNativeInstance,
      beforeChildNativeInstance
    );

    this.nativeInstance.reorder_child_after(
      beforeChildNativeInstance,
      childNativeInstance
    );
  }
}
