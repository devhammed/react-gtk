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
 * @group Native Widgets
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
    return this.getVisibleChild();
  }

  set visibleChild(child: GtkStackPageImpl) {
    this.setVisibleChild(child);
  }

  /**
   * The name of the widget currently visible in the stack.
   */
  get visibleChildName(): string | null {
    return this.getVisibleChildName();
  }

  set visibleChildName(name: string) {
    this.setVisibleChildName(name);
  }

  /**
   * Gets the currently visible child of stack.
   */
  getVisibleChild(): GtkStackPageImpl {
    return this.nativeInstance.visibleChild.$impl;
  }

  /**
   * Returns the name of the currently visible child of stack.
   */
  getVisibleChildName(): string | null {
    return this.nativeInstance.visibleChild.$impl.name;
  }

  /**
   * Makes child the visible child of stack.
   */
  setVisibleChild(child: GtkStackPageImpl): void {
    this.nativeInstance.set_visible_child(child.nativeInstance);
  }

  /**
   * Makes the child with the given name visible.
   */
  setVisibleChildName(name: string): void {
    this.nativeInstance.set_visible_child_name(name);
  }

  /**
   * Makes the child with the given name visible with transition.
   */
  setVisibleChildFull(name: string, transition: GtkStackTransitionType): void {
    this.nativeInstance.set_visible_child_full(name, transition);
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
