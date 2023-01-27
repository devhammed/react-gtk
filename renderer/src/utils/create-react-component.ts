import { createElement, forwardRef } from 'react';
import { GtkWidgetImpl, GtkWidgetProps } from '@/widgets/gtk-widget';

/**
 * Create a React component from a widget tag.
 */
export const createReactComponent = <
  TImpl extends GtkWidgetImpl,
  TProps extends GtkWidgetProps
>(
  widgetTag: string
) =>
  forwardRef<TImpl, TProps>((props, ref) =>
    createElement(widgetTag, { ref, ...props })
  );
