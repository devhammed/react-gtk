declare module 'react-gtk-renderer' {
  import type { ReactElement } from 'react';

  export const GtkBox: ReactElement;

  export const GtkLabel: ReactElement;

  export const GtkButton: ReactElement;

  export const GtkEntry: ReactElement;

  export const GtkTextView: ReactElement;

  export const GtkWindow: ReactElement;

  export const GtkStack: ReactElement;

  export const GtkStackPage: ReactElement;

  export interface RootAppInstance {
    render(element: ReactElement, argv?: string[]): void;
  }

  export interface ApplicationProps {
    id: string;
    flags: number;
  }

  export function createRoot(appProps: ApplicationProps): RootAppInstance;
}
