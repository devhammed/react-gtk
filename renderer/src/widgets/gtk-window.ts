import { ReactElement } from 'react';
import { GtkWidgetImpl, GtkWidgetProps } from '@/widgets/gtk-widget';
import { createReactComponent } from '@/utils/create-react-component';

export const GTK_WINDOW_TAG = 'gtk-window';

/**
 * @group Props
 */
export interface GtkWindowProps extends GtkWidgetProps {
  /**
   * The default height of the window.
   */
  defaultHeight?: number;

  /**
   * The default width of the window.
   */
  defaultWidth?: number;

  /**
   * The title of the window.
   */
  title?: string;

  /**
   * If TRUE, the window is modal.
   */
  modal?: boolean;

  /**
   * The child widget.
   */
  children?: ReactElement | string;
}

/**
 * @group Components
 */
export const GtkWindow = createReactComponent<GtkWindowImpl, GtkWindowProps>(
  GTK_WINDOW_TAG
);

/**
 * @group Native Implementations
 */
export class GtkWindowImpl extends GtkWidgetImpl {
  constructor(props: GtkWindowProps, rootInstance: any) {
    super(props, rootInstance);

    if (!rootInstance.$windows) {
      rootInstance.$windows = [];
    }

    this.nativeInstance.connect('close-request', () => {
      this.nativeInstance.visible = false;

      const activeAppWindows = rootInstance.$windows.filter(
        (win: GtkWindowImpl) => win.visible
      );

      if (activeAppWindows.length === 0) {
        rootInstance.loop.quit();
      }

      return true;
    });

    rootInstance.$windows.push(this);
  }

  get nativeName() {
    return 'Window';
  }

  appendChild(child: GtkWidgetImpl): void {
    this.nativeInstance.child = child.nativeInstance;
  }

  insertBefore(child: GtkWidgetImpl, _beforeChild: GtkWidgetImpl): void {
    this.nativeInstance.child = child.nativeInstance;
  }

  removeChild(_child: GtkWidgetImpl): void {
    this.nativeInstance.child = null;
  }

  present(): void {
    this.nativeInstance.present();
  }

  close(): void {
    this.nativeInstance.close();
  }
}
