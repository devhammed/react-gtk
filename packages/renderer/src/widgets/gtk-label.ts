import { GtkWidgetImpl, GtkWidgetProps } from './gtk-widget';
import { createReactComponent } from '../utils/create-react-component';

export const GTK_LABEL_TAG = 'gtk-label';

export interface GtkLabelProps extends GtkWidgetProps {
  label: string;
  useMarkup?: boolean;
}

export const GtkLabel = createReactComponent<GtkLabelImpl, GtkLabelProps>(
  GTK_LABEL_TAG
);

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
