import { GtkBoxImpl, GtkBoxProps } from './gtk-box';
import { createReactComponent } from '../utils/create-react-component';

export const GTK_STACK_PAGE_TAG = 'gtk-stack-page';

export interface GtkStackPageProps extends GtkBoxProps {}

export const GtkStackPage = createReactComponent<
  GtkStackPageImpl,
  GtkStackPageProps
>(GTK_STACK_PAGE_TAG);

export class GtkStackPageImpl extends GtkBoxImpl {
  constructor(props: GtkStackPageProps, rootInstance: any) {
    super(props, rootInstance);
  }
}
