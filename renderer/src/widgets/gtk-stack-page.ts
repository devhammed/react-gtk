import { GtkBoxImpl, GtkBoxProps } from './gtk-box';
import { createReactComponent } from '../utils/create-react-component';

export const GTK_STACK_PAGE_TAG = 'gtk-stack-page';

/**
 * @group Props
 */
export interface GtkStackPageProps extends GtkBoxProps {}

/**
 * @group Components
 */
export const GtkStackPage = createReactComponent<
  GtkStackPageImpl,
  GtkStackPageProps
>(GTK_STACK_PAGE_TAG);

/**
 * @group Native Widgets
 */
export class GtkStackPageImpl extends GtkBoxImpl {
  constructor(props: GtkStackPageProps, rootInstance: any) {
    super(props, rootInstance);
  }
}
