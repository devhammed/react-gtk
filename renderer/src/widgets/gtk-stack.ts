import { ReactNode } from 'react';
import { GtkStackPageImpl } from '@/widgets/gtk-stack-page';
import { GtkWidgetImpl, GtkWidgetProps } from '@/widgets/gtk-widget';
import { createReactComponent } from '@/utils/create-react-component';
import { GtkStackTransitionType } from '@/enums/gtk-stack-transition-type';

export const GTK_STACK_TAG = 'gtk-stack';

/**
 * @group Props
 */
export interface GtkStackProps extends GtkWidgetProps {
  /**
   * The type of animation used to transition.
   */
  transitionType?: GtkStackTransitionType;

  /**
   * The animation duration, in milliseconds.
   */
  transitionDuration?: number;

  /**
   * TRUE if the stack allocates the same width for all children.
   */
  hhomogeneous?: boolean;

  /**
   * TRUE if the stack allocates the same height for all children.
   */
  vhomogeneous?: boolean;

  /**
   * Whether or not the size should smoothly change during the transition.
   */
  interpolateSize?: boolean;

  /**
   * The stack pages.
   */
  children?: ReactNode;
}

/**
 * @group Components
 */
export const GtkStack = createReactComponent<GtkStackImpl, GtkStackProps>(
  GTK_STACK_TAG
);

/**
 * @group Native Implementations
 */
export class GtkStackImpl extends GtkWidgetImpl {
  constructor(props: GtkStackProps, rootInstance: any) {
    super(props, rootInstance);
  }

  get nativeName(): string {
    return 'Stack';
  }

  /**
   * The widget currently visible in the stack.
   */
  get visibleChild(): GtkStackPageImpl {
    return this.nativeInstance.visibleChild.$impl;
  }

  set visibleChild(child: GtkStackPageImpl) {
    this.nativeInstance.set_visible_child(child.nativeInstance);
  }

  /**
   * The name of the widget currently visible in the stack.
   */
  get visibleChildName(): string | null {
    return this.nativeInstance.visibleChild.$impl.name;
  }

  set visibleChildName(name: string) {
    this.nativeInstance.set_visible_child_name(name);
  }

  appendChild(child: GtkStackPageImpl): void {
    if (child.name !== null) {
      this.nativeInstance.add_named(child.nativeInstance, child.name);
    } else {
      this.nativeInstance.add_child(child.nativeInstance);
    }
  }

  removeChild(child: GtkWidgetImpl): void {
    this.nativeInstance.remove(child.nativeInstance);
  }
}
