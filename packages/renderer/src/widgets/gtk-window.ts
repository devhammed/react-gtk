import { createReactComponent } from '../utils/create-react-component';
import { GtkWidgetImpl, GtkWidgetProps } from './gtk-widget';

export const GTK_WINDOW_TAG = 'gtk-window';

export interface GtkWindowProps extends GtkWidgetProps {}

export const GtkWindow = createReactComponent<GtkWindowImpl, GtkWindowProps>(
  GTK_WINDOW_TAG
);

export class GtkWindowImpl extends GtkWidgetImpl {
  constructor(props: GtkWindowProps, rootInstance: any) {
    super(props, rootInstance);

    if (!rootInstance.$windows) {
      rootInstance.$windows = [];
    }

    this.nativeInstance.connect('close-request', () => {
      this.nativeInstance.visible = false;

      const activeAppWindows = rootInstance.$windows.filter(
        (win: { visible: boolean }) => win.visible
      );

      if (activeAppWindows.length === 0) {
        rootInstance.loop.quit();
      }

      return true;
    });

    rootInstance.$windows.push(this.nativeInstance);
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
