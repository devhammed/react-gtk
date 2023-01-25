import { GtkWidgetImpl, GtkWidgetProps } from './gtk-widget';
import { createReactComponent } from '../utils/create-react-component';

export const GTK_LABEL_TAG = 'gtk-label';

/**
 * @group Props
 */
export interface GtkLabelProps extends GtkWidgetProps {
  /**
   * The contents of the label.
   */
  label: string;

  /**
   * TRUE if the text of the label includes Pango markup.
   *
   * @see [Pango Markup Docs](https://docs.gtk.org/Pango/pango_markup.html)
   */
  useMarkup?: boolean;
}

/**
 * @group Components
 */
export const GtkLabel = createReactComponent<GtkLabelImpl, GtkLabelProps>(
  GTK_LABEL_TAG
);

/**
 * @group Native Widgets
 */
export class GtkLabelImpl extends GtkWidgetImpl {
  constructor(props: GtkLabelProps, rootInstance: any) {
    super(props, rootInstance);
  }

  get nativeName() {
    return 'Label';
  }

  get label(): string {
    return this.nativeInstance.label;
  }

  set label(value: string) {
    this.nativeInstance.label = value;
  }
}
